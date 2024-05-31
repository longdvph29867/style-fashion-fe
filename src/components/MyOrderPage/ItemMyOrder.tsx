import React from "react";

type Props = {};

const ItemMyOrder = (props: Props) => {
  return (
    <div className="sm:p-8 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div>
            <img
              className="bg-gray-50 rounded-lg"
              src="https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=128&q=75"
              alt=""
            />
          </div>
          <div>
            <span className="text-base font-medium line-clamp-1">
              Rey Nylon Backpack
            </span>
            <p className="mt-1 text-sm text-slate-500">
              <span>Natural</span>
              <span className="mx-2 border-[1px] border-slate-200 dark:border-slate-50 h-4"></span>
              <span>XL</span>
            </p>
            <p className="mt-10 text-gray-500 flex items-center">
              <span>x</span>
              <span className="ml-2">1</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-10">
          <button className="w-[50px] h-[30px] border-2 border-green-500 text-green-500 rounded-lg">
            $33
          </button>
          <span className="font-medium text-indigo-600 hover:cursor-pointer">
            Leave review
          </span>
        </div>
      </div>
      <hr className="sm:mt-10 mt-4 m-auto border border-slate-200" />
    </div>
  );
};

export default ItemMyOrder;
