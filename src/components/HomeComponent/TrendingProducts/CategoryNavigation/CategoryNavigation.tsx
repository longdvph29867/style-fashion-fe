type Props = {};

const CategoryNavigation = (props: Props) => {
  return (
    <nav className="relative flex w-full overflow-x-auto text-sm md:text-base scroll-m-0 scrollbar-hide">
      <ul className="flex sm:space-x-2">
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-[#fe385c] text-white">
            All items
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-[#6a6a6a] hover:text-[#222] hover:bg-[#ebebeb]">
            Women
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-[#6a6a6a] hover:text-[#222] hover:bg-[#ebebeb]">
            Mans
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-[#6a6a6a] hover:text-[#222] hover:bg-[#ebebeb]">
            Kids
          </button>
        </li>
        <li>
          <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-[#6a6a6a] hover:text-[#222] hover:bg-[#ebebeb]">
            Jewels
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
