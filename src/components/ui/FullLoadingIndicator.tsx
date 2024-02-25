export function FullLoadingIndicator() {
  return (
    <div
      className="flex h-full animate-pulse items-center justify-center  rounded-md bg-gray-50"
      role="status"
    >
      <div className="relative" role="presentation">
        <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200" />
        <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-brand-500" />
      </div>
      <span className="sr-only" aria-live="polite">
        Content is loading
      </span>
    </div>
  );
}
