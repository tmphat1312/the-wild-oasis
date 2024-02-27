import { useLevelContext } from "@/contexts/LevelContext";
import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
import { z } from "zod";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const headingVariants = tv({
  base: "font-semibold tracking-wider first-letter:capitalize",
  variants: {
    level: {
      h1: "text-3xl mb-6",
      h2: "text-xl mb-4",
      h3: "text-lg mb-4",
      h4: "text-lg mb-3",
      h5: "mb-2",
      h6: "text-sm mb-1",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

const HeadingVariant = z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]);

export default function Heading({ className, ...props }: HeadingProps) {
  const level = useLevelContext();

  if (level === undefined) {
    throw Error("Heading must be used within a Section component");
  }

  const headingLevel = HeadingVariant.parse(`h${level}`);
  const styles = cn(headingVariants({ level: headingLevel }), className);

  switch (level) {
    case 0:
      throw Error("Heading must be used within a Section component");
    case 1:
      return <h1 {...props} className={styles} />;
    case 2:
      return <h2 {...props} className={styles} />;
    case 3:
      return <h3 {...props} className={styles} />;
    case 4:
      return <h4 {...props} className={styles} />;
    case 5:
      return <h5 {...props} className={styles} />;
    case 6:
      return <h6 {...props} className={styles} />;
    default:
      throw Error("Heading level must be between 1 and 6");
  }
}
