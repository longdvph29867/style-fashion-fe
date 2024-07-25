import React from 'react';

const UserListSkeleton = () => (
    <div className="relative grid lg:grid-cols-10 sm:grid-cols-5 grid-cols-3 gap-2 border-b lg:border-transparent border-slate-300 animate-pulse">
        <div className="pl-4">
            <div className="px-2 py-1 min-w-[110px]">
                <div className="bg-gray-200 h-20 w-20 rounded"></div>
            </div>
        </div>
        <div className="p-2 sm:col-span-2">
            <div className="flex flex-col justify-center">
                <div className="bg-gray-200 h-6 w-32 rounded"></div>
            </div>
        </div>
        <div className="lg:block col-span-2 p-2">
            <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        </div>
        <div className="p-2">
            <div className="bg-gray-200 h-4 w-32 rounded"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded mt-2"></div>
        </div>
        <div className="p-2">
            <div className="bg-gray-200 h-4 w-32 rounded"></div>
        </div>
        <div className="p-2">
            <div className="bg-gray-200 h-4 w-32 rounded"></div>
        </div>
        <div className="lg:block hidden p-2">
            <div className="bg-gray-200 h-4 w-24 rounded"></div>
        </div>
        <div className="absolute right-0 top-4 lg:block p-2 space-x-2 lg:static lg:top-auto lg:right-auto">
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
        </div>
    </div>
);

export default UserListSkeleton;
