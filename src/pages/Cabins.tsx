import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import CreateCabinModal from "@/features/cabins/CreateCabinModal";

export default function Cabins() {
  return (
    <Section>
      <Heading>All cabins</Heading>
      <CabinTable />
      {/* <CreateCabinModal /> */}
      <CreateCabinForm />
    </Section>
  );
}
