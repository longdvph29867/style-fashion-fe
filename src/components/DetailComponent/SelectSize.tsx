const SelectSize = () => {
  return (
    <>
      <div className="my-8 ">
        <div>
          <div>
            Size: <span className="ml-1 font-semibold">XS</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-3 sm:grid-cols-7">
            <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
              S
            </div>
            <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
              M
            </div>
            <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
              L
            </div>
            <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
              XL
            </div>
            <div className="relative flex items-center justify-center h-10 text-sm font-semibold uppercase border cursor-pointer rounded-2xl sm:text-base border-slate-300 text-slate-900 hover:bg-neutral-50">
              2XL
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectSize;
