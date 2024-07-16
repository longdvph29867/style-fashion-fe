const ShippingAddress = () => {
  return (
    <div className="scroll-mt-24">
      <div className="border border-slate-200 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className="text-slate-700 flex">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="sm:w-full sm:text-xs">
                St. Paul's Road, Norris, SD 57560, Dakota, USA
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 block">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                First name
              </label>
              <input
                className="block w-full outline-none border border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="Cole"
              />
            </div>
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                Last name
              </label>
              <input
                className="block w-full outline-none border border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="Enrico "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                Address
              </label>
              <input
                className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="123, Dream Avenue, USA"
              />
            </div>
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                Apt, Suite *
              </label>
              <input
                className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="55U - DD5 "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                City
              </label>
              <input
                className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="Norris"
              />
            </div>
            <div>
              <label className=" font-medium text-neutral-900 text-sm">
                Country
              </label>
              <select className="h-11 mt-1.5 block w-full border outline-none text-sm rounded-2xl border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white">
                <option value="United States">United States</option>
                <option value="United States">Canada</option>
                <option value="United States">Mexico</option>
                <option value="United States">Israel</option>
                <option value="United States">France</option>
                <option value="United States">England</option>
                <option value="United States">Laos</option>
                <option value="United States">China</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <label className="font-medium text-neutral-900 text-sm">
                State/Province
              </label>
              <input
                className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue="Texas"
              />
            </div>
            <div>
              <label className="font-medium text-neutral-900 text-sm">
                Postal code
              </label>
              <input
                className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                type="text"
                defaultValue={2500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
