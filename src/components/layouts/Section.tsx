import { LevelProvider, useLevelContext } from "@/contexts/LevelContext";

type SectionProps = React.ComponentProps<"section">;

export default function Section({ children, ...props }: SectionProps) {
  const level = useLevelContext();

  return (
    <section {...props}>
      <LevelProvider value={level + 1}>{children}</LevelProvider>
    </section>
  );
}
