import ChangeImage from "./ChangeImage";
import { GoMail } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineAddHome } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
const AccountInfomation = () => {
  return (
    <div
      id="infomation"
      className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32"
    >
      <div>
        <div className="space-y-10 sm:space-y-12">
          <h2 className="text-2xl sm:text-3xl font-semibold sm:text-left text-center">
            Account infomation
          </h2>
          <div className="flex flex-col md:flex-row">
            {/* Change Image */}
            <ChangeImage />
            {/* Form */}
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

              <div>
                <label className="nc-Label text-base font-medium text-neutral-900">
                  Full name
                </label>
                <input
                  className="block border outline-none w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                  type="text"
                  defaultValue="Enrico Cole"
                />
              </div>
              <div>
                <label className="text-base font-medium text-neutral-900">
                  Email
                </label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                    {/* icon */}
                    <GoMail className="text-2xl las la-envelope" />
                  </span>
                  <input
                    className="block border outline-none w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    placeholder="example@email.com"
                    type="text"
                  />
                </div>
              </div>
              <div className="max-w-lg">
                <label className="text-base font-medium text-neutral-900">
                  Date of birth
                </label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                    {/* icon */}
                    <MdOutlineDateRange className="text-2xl las la-calendar" />
                  </span>
                  <input
                    className="block border outline-none w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    type="date"
                    defaultValue="1990-07-22"
                  />
                </div>
              </div>
              <div>
                <label className="text-base font-medium text-neutral-900">
                  Address
                </label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                    {/* icon */}
                    <MdOutlineAddHome className="text-2xl las la-map-signs" />
                  </span>
                  <input
                    className="block border outline-none w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    type="text"
                    defaultValue="New york, USA"
                  />
                </div>
              </div>
              <div>
                <label className=" text-base font-medium text-neutral-900">
                  Gender
                </label>
                <select className="border outline-none p-2 h-11 mt-1.5 block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className=" text-base font-medium text-neutral-900 ">
                  Phone number
                </label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                    {/* icon */}
                    <LuPhoneCall className="text-2xl las la-phone-volume" />
                  </span>
                  <input
                    className="block border outline-none w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white disabled:bg-neutral-200 rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    type="text"
                    defaultValue="003 888 232"
                  />
                </div>
              </div>
              <div>
                <label className="text-base font-medium text-neutral-900">
                  About you
                </label>
                <textarea
                  className="block border outline-none p-2 w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white mt-1.5"
                  rows={4}
                  defaultValue={"..."}
                />
              </div>
              <div className="pt-2">
                <button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                  Update account
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfomation;
