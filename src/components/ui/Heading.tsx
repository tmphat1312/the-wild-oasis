import { useLevelContext } from "@/contexts/LevelContext";
import { cva, cx } from "class-variance-authority";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const headingVariants = cva("font-bold tracking-wider", {
  variants: {
    variant: {
      h1: "text-5xl mb-6",
      h2: "text-4xl mb-5",
      h3: "text-3xl mb-4",
      h4: "text-2xl mb-3",
      h5: "text-xl mb-2",
      h6: "text-lg mb-1",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export default function Heading({ className, ...props }: HeadingProps) {
  const level = useLevelContext();
  const styles = cx(headingVariants({ variant: "h1" }), className);

  switch (level) {
    case 0:
      throw Error("Heading level must be inside a Section component");
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
