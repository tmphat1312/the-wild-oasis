import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import CabinTable from "@/features/cabins/CabinTable";

export default function Cabins() {
  return (
    <Section>
      <Heading>All cabins</Heading>
      <CabinTable />
    </Section>
  );
}
