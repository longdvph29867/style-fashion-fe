
const CategoriesListSkeleton = () => (
  <div className="grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-2 gap-2 border-b sm:border-transparent border-slate-300 animate-pulse">
    <div className="p-2">
      <div className="px-2 py-1 min-w-[110px]">
        <div className="bg-gray-200 h-6 w-12 rounded"></div>
      </div>
    </div>
    <div className="p-2 sm:col-span-2">
      <div className="flex flex-col justify-center">
        <div className="bg-gray-200 h-6 w-32 rounded"></div>
      </div>
    </div>
    <div className="p-2 space-x-2 flex items-center">
      <div className="bg-gray-200 h-4 w-16 rounded"></div>
    </div>
  </div>
);

export default CategoriesListSkeleton;
