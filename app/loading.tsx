export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7A916C] border-t-transparent mb-4" />
        <p className="text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
          Loading...
        </p>
      </div>
    </div>
  );
}
