import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import { z } from "zod";

import { Section } from "@/components/layouts/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { toast } from "@/lib/toast";
import { subtractDates } from "@/lib/utils";
import { SettingSchema } from "@/schemas/SettingSchema";
import { APIClient } from "@/services/APIClient";
import { useQueryClient } from "@tanstack/react-query";
import { bookings } from "./bookings";
import { cabins } from "./cabins";

async function deleteResource(resourceName: string) {
  await APIClient.from(resourceName).delete().gt("id", 0).throwOnError();
}

async function createCabins() {
  await APIClient.from("cabins").insert(cabins).throwOnError();
}

async function createBookings() {
  const idSchema = z.array(
    z.object({
      id: z.number().positive(),
    }),
  );

  try {
    const [{ data: cabinsData }, { data: settingsData }] = await Promise.all([
      APIClient.from("cabins").select("id").order("id").throwOnError(),
      APIClient.from("settings").select().throwOnError(),
    ]);

    const cabinsIds = idSchema.parse(cabinsData).map((c) => c.id);
    const settings = SettingSchema.parse(settingsData![0]);

    const finalBookings = bookings.map((booking) => {
      const cabin = cabins.at(booking.cabin_id - 1)!;
      const noNights = subtractDates(booking.end_date, booking.start_date);
      const cabinPrice = noNights * (cabin.regular_price - cabin.discount);
      const extraPrice = booking.has_breakfast
        ? noNights * settings.breakfast_price * booking.no_guests
        : 0;
      const totalPrice = cabinPrice + extraPrice;

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
        extra_price: extraPrice,
        total_due: totalPrice,
        cabin_id: cabinsIds[booking.cabin_id - 1],
        status,
      };
    });
    await APIClient.from("bookings").insert(finalBookings).throwOnError();
  } catch (error) {
    throw Error("Error creating bookings");
  }
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function uploadAll() {
    setIsLoading(true);

    const upload = Promise.resolve()
      .then(() => deleteResource("bookings"))
      .then(() => deleteResource("cabins"))
      .then(() => createCabins())
      .then(() => createBookings())
      .finally(() => setIsLoading(false));

    toast.promise(upload, {
      loading: "Uploading data...",
      success: "Data uploaded",
      error: "Error uploading data",
    });

    queryClient.resetQueries();
  }

  function uploadBookings() {
    setIsLoading(true);

    const upload = Promise.resolve()
      .then(() => deleteResource("bookings"))
      .then(createBookings)
      .finally(() => setIsLoading(false));

    toast.promise(upload, {
      loading: "Uploading bookings...",
      success: "Bookings uploaded",
      error: "Error uploading bookings",
    });

    queryClient.resetQueries();
  }

  return (
    <Section className="flex flex-col gap-4 rounded bg-gray-100 p-5 text-center shadow">
      <Heading className="mb-0 text-xl">SAMPLE DATA</Heading>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings
      </Button>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload All
      </Button>
    </Section>
  );
}
