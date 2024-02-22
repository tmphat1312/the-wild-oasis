import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import CabinTable from "./CabinTable";
import { CreateCabin } from "./CreateCabin";

export default function Cabins() {
  return (
    <Section className="space-y-4">
      <Heading>All cabins</Heading>
      <CabinTable />
      <CreateCabin />
    </Section>
  );
}
