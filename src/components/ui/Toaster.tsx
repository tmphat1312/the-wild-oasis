import { Toaster as RHTToaster } from "react-hot-toast";

const THREE_SECONDS = 3 * 1_000;
const FIVE_SECONDS = 5 * 1_000;

export function Toaster() {
  return (
    <RHTToaster
      containerClassName="m-2"
      gutter={12}
      toastOptions={{
        className: "px-6 py-3",
        success: {
          duration: THREE_SECONDS,
        },
        error: {
          duration: FIVE_SECONDS,
        },
      }}
    />
  );
}
