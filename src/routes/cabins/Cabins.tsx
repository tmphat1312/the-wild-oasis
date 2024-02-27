import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import CabinTable from "./CabinTable";
import { CreateCabin } from "./CreateCabin";
import CabinTableOperations from "./CabinTableOperations";

export default function Cabins() {
  return (
    <Section className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading>All cabins</Heading>
        <CabinTableOperations />
      </div>
      <CabinTable />
      <CreateCabin />
    </Section>
  );
}
