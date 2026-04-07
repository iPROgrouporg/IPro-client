export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};