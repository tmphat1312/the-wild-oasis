import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { tv } from "tailwind-variants";

interface BackButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: keyof (typeof backButtonVariants)["variants"]["variant"];
}

const backButtonVariants = tv({
  base: "font-medium px-4 py-3 text-center rounded-md text-sm disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      default: "bg-background hover:bg-gray-50 border",
      text: "text-brand-600 hover:bg-brand-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function BackButton({ variant = "default", ...props }: BackButtonProps) {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <button
      {...props}
      className={cn(backButtonVariants({ variant }), props.className)}
      aria-label="go back to previous page"
      onClick={goBack}
    >
      <span
        className={cn("text-xl font-bold", variant == "default" && "hidden")}
        role="presentation"
      >
        &larr;{" "}
      </span>
      Back
    </button>
  );
}