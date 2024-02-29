import { LevelProvider, useLevelContext } from "@/contexts/LevelContext";

type SectionProps = React.ComponentProps<"section">;

export function Section(props: SectionProps) {
  const level = useLevelContext();

  return (
    <LevelProvider value={level + 1}>
      <section {...props} />
    </LevelProvider>
  );
}
