import { Toaster } from "@/components/ui/Toaster";
import QueryProvider from "./QueryProvider";
import Routes from "./routes";

export default function App() {
  return (
    <QueryProvider>
      <Routes />
      <Toaster />
    </QueryProvider>
  );
}
