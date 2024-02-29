import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { DashboardFilter } from "./DashboardFilter";
import { DashboardLayout } from "./DashboardLayout";

export default function Dashboard() {
  return (
    <Section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <Heading className="mb-0">Dashboard</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </Section>
  );
}
