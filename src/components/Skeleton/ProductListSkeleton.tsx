const ProductListSkeleton = () => {
    return (
        <div className="relative px-2 animate-pulse grid lg:grid-cols-8 sm:grid-cols-5 grid-cols-2 gap-2 border-t border-slate-100 animate-pulse">
            <div className="p-4">
                <div className="px-4 py-1 w-[100px] bg-gray-200 h-[100px] rounded"></div>
            </div>
            <div className="p-2 sm:col-span-2">
                <div className="flex flex-col justify-center">
                    <div className="bg-gray-200 h-6 w-32 rounded"></div>
                </div>
            </div>
            <div className="lg:block p-2 col-span-3">
                <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
            </div>
            <div className="p-2 space-x-2">
                <div className="bg-gray-200 h-4 w-28 rounded"></div>
            </div>
            <div className="p-2 space-x-2">
                <div className="bg-gray-200 h-4 w-28 rounded"></div>
            </div>
        </div>
    )
}

export default ProductListSkeleton