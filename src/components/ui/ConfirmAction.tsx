import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

interface ConfirmActionProps {
  Opener: JSX.Element;
  title: string;
  description: string;
  disabled?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmAction({
  Opener,
  title,
  description,
  disabled = false,
  onConfirm: handleConfirm = () => {},
  onCancel: handleCancel = () => {},
}: ConfirmActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disabled} className="group/button" asChild>
        {Opener}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
