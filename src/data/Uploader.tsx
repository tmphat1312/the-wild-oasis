import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import { z } from "zod";

import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import { toast } from "@/lib/toast";
import { subtractDates } from "@/lib/utils";
import { settingSchema } from "@/schemas/settingSchema";
import { buildAPIClient } from "@/services/APIClient";
import { TableRowNames } from "@/types/table-row";
import { bookings } from "./bookings";
import { cabins } from "./cabins";
import { guests } from "./guests";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

async function deleteResources(resourceName: TableRowNames) {
  await buildAPIClient(resourceName).delete().gt("id", 0).throwOnError();
}

async function createGuests() {
  await buildAPIClient("guests").insert(guests).throwOnError();
}

async function createCabins() {
  await buildAPIClient("cabins").insert(cabins).throwOnError();
}

async function createBookings() {
  const idSchema = z.array(
    z.object({
      id: z.number().positive(),
    }),
  );

  try {
    const [{ data: guestsData }, { data: cabinsData }, { data: settingsData }] =
      await Promise.all([
        buildAPIClient("guests").select("id").order("id").throwOnError(),
        buildAPIClient("cabins").select("id").order("id").throwOnError(),
        buildAPIClient("settings").select().throwOnError(),
      ]);

    const guestsIds = idSchema.parse(guestsData).map((g) => g.id);
    const cabinsIds = idSchema.parse(cabinsData).map((c) => c.id);
    const settings = settingSchema.parse(settingsData![0]);

    const finalBookings = bookings.map((booking) => {
      const cabin = cabins.at(booking.cabin_id - 1)!;
      const noNights = subtractDates(booking.end_date, booking.start_date);
      const cabinPrice = noNights * (cabin.regular_price - cabin.discount);
      const extrasPrice = booking.has_breakfast
        ? noNights * settings.breakfast_price * booking.no_guests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;

      let status: string = "unconfirmed";
      const endDate = new Date(booking.end_date);
      const startDate = new Date(booking.start_date);

      if (isPast(endDate) && !isToday(endDate)) {
        status = "checked out";
      } else if (isFuture(startDate) || isToday(startDate)) {
        status = "unconfirmed";
      } else if (
        (isFuture(endDate) || isToday(endDate)) &&
        isPast(startDate) &&
        !isToday(startDate)
      ) {
        status = "checked in";
      }

      return {
        ...booking,
        no_nights: noNights,
        cabin_price: cabinPrice,
        extra_price: extrasPrice,
        total_due: totalPrice,
        guest_id: guestsIds.at(booking.guest_id - 1),
        cabin_id: cabinsIds.at(booking.cabin_id - 1),
        status,
      };
    });
    await buildAPIClient("bookings").insert(finalBookings).throwOnError();
  } catch (error) {
    throw Error("Error creating bookings");
  }
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function uploadAll() {
    setIsLoading(true);

    // // Bookings need to be deleted FIRST
    // await deleteResources("bookings");
    // await Promise.all([deleteResources("guests"), deleteResources("cabins")]);

    // // Bookings need to be created LAST
    // await Promise.all([createGuests(), createCabins()]);
    // await createBookings();

    const upload = Promise.resolve()
      .then(() => deleteResources("bookings"))
      .then(() => {
        return Promise.all([
          deleteResources("guests"),
          deleteResources("cabins"),
        ]);
      })
      .then(() => {
        return Promise.all([createGuests(), createCabins()]);
      })
      .then(() => {
        return createBookings();
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => setIsLoading(false));

    toast.promise(upload, {
      loading: "Uploading data...",
      success: "Data uploaded",
      error: "Error uploading data",
    });

    queryClient.invalidateQueries();
  }

  function uploadBookings() {
    setIsLoading(true);

    const upload = Promise.resolve()
      .then(() => deleteResources("bookings"))
      .then(createBookings)
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => setIsLoading(false));

    toast.promise(upload, {
      loading: "Uploading bookings...",
      success: "Bookings uploaded",
      error: "Error uploading bookings",
    });

    queryClient.invalidateQueries();
  }

  return (
    <Section className="flex flex-col gap-4 rounded bg-brand-50 p-8 text-center shadow">
      <Heading>SAMPLE DATA</Heading>

      <button
        className="cursor-pointer rounded bg-brand-500 px-3 py-2 text-lg text-brand-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:grayscale [&:not(:active)]:hover:bg-brand-600"
        onClick={uploadAll}
        disabled={isLoading}
      >
        Upload ALL
      </button>

      <button
        className="cursor-pointer rounded bg-brand-500 px-3 py-2 text-lg text-brand-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:grayscale [&:not(:active)]:hover:bg-brand-600"
        onClick={uploadBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </button>
    </Section>
  );
}
