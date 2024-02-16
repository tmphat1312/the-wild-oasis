import { Alert, AlertDescription, AlertTitle } from "./Alert";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
