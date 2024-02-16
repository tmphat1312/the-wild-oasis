export default function FormSkeleton() {
  return (
    <div>
      <div className="p-8 space-y-6 rounded-md shadow-sm bg-background animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex flex-col space-y-2" key={i}>
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
          </div>
        ))}

        <div className="space-x-4 text-end">
          <div className="inline-block w-32 h-10 bg-gray-200 rounded" />
          <div className="inline-block w-32 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
