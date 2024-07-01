type Props = {};

const CategoryNavigation = (props: Props) => {
  return (
    <nav className="relative flex w-full overflow-x-auto text-sm md:text-base scroll-m-0 scrollbar-hide">
      <ul className="flex sm:space-x-2">
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-slate-900 text-slate-100">
            All items
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/75">
            Women
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/75">
            Mans
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/75">
            Kids
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/75">
            Jewels
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
