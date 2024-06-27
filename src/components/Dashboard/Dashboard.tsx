
const Dashboard = () => {
  return (
    <>
      <main className="bg-slate-100">
        <div className="mx-auto max-w-screen-2xl p-4 md:p-5 xl:p-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-8">
            {/* View */}
            <div className="rounded-sm border border-stroke bg-white p-7 py-6 shadow-default">
              <div className="flex h-10 w-10 sm:w-12 sm:h-12  border items-center justify-center rounded-full bg-slate-200">
                <svg className="fill-blue-700 sm:w-7 sm:h-14" width={20} height={18} viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" />
                  <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-xl font-semibold text-black">
                    $3.456K
                  </h4>
                  <span className="text-sm sm:text-sx font-normal text-slate-500">Total views</span>
                </div>
                <span className="flex items-center gap-1 text-sm sm:text-sx font-normal text-green-600">
                  0.43%
                  <svg className="fill-green-600" width={10} height={11} viewBox="0 0 10 11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" />
                  </svg>
                </span>
              </div>
            </div>
            {/* Cart */}
            <div className="rounded-sm border border-stroke bg-white p-7 py-6 shadow-default">
              <div className="flex h-10 w-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-slate-200">
                <svg className="fill-blue-700 sm:w-7 sm:h-14" width={20} height={18} viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" />
                  <path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" />
                  <path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z" />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-xl font-semibold  text-black ">
                    $45,2K
                  </h4>
                  <span className="text-sm sm:text-sx font-normal text-slate-500">Total Profit</span>
                </div>
                <span className="flex items-center gap-1 text-sm sm:text-sx font-normal text-green-600">
                  4.35%
                  <svg className="fill-green-600" width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" />
                  </svg>
                </span>
              </div>
            </div>
            {/*Menu  */}
            <div className="rounded-sm border border-stroke bg-white p-7 py-6 shadow-default ">
              <div className="flex h-10 w-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-slate-200">
                <svg className="fill-blue-700 sm:w-7 sm:h-14" width={20} height={18} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z" />
                  <path d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z" />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-xl font-semibold  text-black ">
                    2.450
                  </h4>
                  <span className="text-sm sm:text-sx font-normal text-slate-500">Total Product</span>
                </div>
                <span className="flex items-center gap-1 text-sm sm:text-sx font-normal text-green-600">
                  2.59%
                  <svg className="fill-green-600" width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" />
                  </svg>
                </span>
              </div>
            </div>
            {/* User */}
            <div className="rounded-sm border border-stroke bg-white p-7 py-6 shadow-default ">
              <div className="flex h-10 w-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-slate-200">
                <svg className="fill-blue-700 sm:w-7 sm:h-14" width={20} height={18} viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z" />
                  <path d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z" />
                  <path d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z" />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-xl font-semibold  text-black ">
                    3.456
                  </h4>
                  <span className="text-sm sm:text-sx font-normal text-slate-500">Total Users</span>
                </div>
                <span className="flex items-center gap-1 text-sm sm:text-sx font-normal text-blue-600">
                  0.95%
                  <svg className="fill-blue-600" width={10} height={11} viewBox="0 0 10 11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 xl:mt-8 xl:gap-8">
            {/* Chart one start */}
            <div className="grid col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-8 shadow-default sm:px-8 xl:col-span-8">
              {/* Totoal */}
              <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5 ">
                  <div className="flex min-w-47">
                    <span className="mr-2 mt-1 flex h-3 w-3 sm:h-4 sm:w-4 max-w-4 items-center justify-center rounded-full border border-blue-600">
                      <span className="block h-2 w-2 sm:h-2.5 sm:w-2.5 max-w-3 rounded-full bg-blue-600" />
                    </span>
                    <div className="w-full">
                      <p className="font-normal text-blue-700 text-base sm:text-xl">Total Revenue</p>
                      <p className="font-sm text-xs sm:text-base text-slate-500 ">12.04.2022 - 12.05.2022</p>
                    </div>
                  </div>
                  <div className="flex min-w-47">
                    <span className="mr-2 mt-1 flex h-3 w-3 sm:h-4 sm:w-4 max-w-4 items-center justify-center rounded-full border border-blue-400">
                      <span className="block h-2 w-2 sm:h-2.5 sm:w-2.5 max-w-3 rounded-full bg-blue-400" />
                    </span>
                    <div className="w-full">
                      <p className="font-normal  text-blue-400 text-base sm:text-xl">Total Sales</p>
                      <p className=" font-sm text-xs sm:text-base text-slate-500">12.04.2022 - 12.05.2022</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full max-w-45 justify-start sm:justify-end">
                  <div className="inline-flex items-center rounded-md bg-slate-200 p-2">
                    <button className="rounded bg-white px-3 py-1 text-xs font-normal  text-black shadow-slate-900 hover:bg-white hover:shadow-slate-300">
                      Day
                    </button>
                    <button className="rounded px-3 py-1 text-xs font-normal  text-black hover:bg-white hover:shadow-slate-300">
                      Week
                    </button>
                    <button className="rounded px-3 py-1 text-xs font-normal  text-black hover:bg-white hover:shadow-slate-300">
                      Month
                    </button>
                  </div>
                </div>
              </div>
              {/* Biểu đồ  */}
              <div />
            </div>
            {/* Chart two Start */}
            <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 shadow-default xl:col-span-4">
              <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                  <h4 className="text-xl w-42 font-semibold text-black">
                    Profit this week
                  </h4>
                </div>
                <div>
                  <div className="relative z-20 inline-block">
                    <select name="#" id="#" className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-normal text-baxe text-slate-500 outline-none">
                      <option>This Week</option>
                      <option>Last Week</option>
                    </select>
                    <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z" fill="#637381" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z" fill="#637381" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div />
            </div>
            {/* Chart three Start */}
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-8 shadow-default sm:px-8 xl:col-span-5">
              <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                  <h4 className="text-xl font-semibold text-black">
                    Visitors Analytics
                  </h4>
                </div>
                <div>
                  <div className="relative z-20 inline-block">
                    <select className="relative text-base text-slate-500 font-normal z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 outline-none">
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                    <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z" fill="#637381" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z" fill="#637381" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div />
              {/*  */}
              <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-2.5 w-3 max-w-3 rounded-full bg-blue-600" />
                    <p className="flex w-full justify-between text-base font-normal text-black">
                      <span> Desktop </span>
                      <span> 65% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-2.5 w-3 max-w-3 rounded-full bg-[#6577F3]" />
                    <p className="flex w-full justify-between text-base font-normal text-black">
                      <span> Tablet </span>
                      <span> 34% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-2.5 w-3 max-w-3 rounded-full bg-[#8FD0EF]" />
                    <p className="flex w-full justify-between text-base font-normal text-black">
                      <span> Mobile </span>
                      <span> 45% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-2.5 w-3 max-w-3 rounded-full bg-[#0FADCF]" />
                    <p className="flex w-full justify-between text-base font-normal text-black">
                      <span> Unknown </span>
                      <span> 12% </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 py-6 shadow-default xl:col-span-7">
              <h4 className="mb-2 text-xl font-semibold text-black">
                Region labels
              </h4>
              {/* Map */}
              <div />
            </div>
            {/* Table one start */}
            <div className="col-span-12 xl:col-span-8">
              <div className="rounded-sm border border-stroke bg-white px-5 pb-3 pt-6 shadow-default sm:px-8 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black">
                  Top Channels
                </h4>
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5">
                    <div className="p-3 xl:p-5">
                      <h5 className="text-xs font-normal text-slate-500 uppercase sm:text-base">Source</h5>
                    </div>
                    <div className="p-3 text-center xl:p-5">
                      <h5 className="text-xs font-normal text-slate-500 uppercase sm:text-base">Visitors</h5>
                    </div>
                    <div className="p-3 text-center xl:p-5">
                      <h5 className="text-xs font-normal text-slate-500 uppercase sm:text-base">Revenues</h5>
                    </div>
                    <div className="hidden p-3 text-center sm:block xl:p-5">
                      <h5 className="text-xs font-normal text-slate-500 uppercase sm:text-base">Sales</h5>
                    </div>
                    <div className="hidden p-3 text-center sm:block xl:p-5">
                      <h5 className="text-xs font-normal text-slate-500 uppercase sm:text-base">Conversion</h5>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-9 sm:h-9">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png" alt="Brand" />
                      </div>
                      <p className="hidden font-normal text-base text-black sm:block">
                        Google
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-black">3.5K</p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-green-600">$5,768</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-black">590</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-blue-500">4.8%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-stroke sm:grid-cols-5">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-9 sm:h-9">
                        <img className="rounded-full" src="https://store-images.s-microsoft.com/image/apps.60673.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.5d82b7eb-9734-4b51-b65d-a0383348ab1b?h=464" alt="Brand" />
                      </div>
                      <p className="hidden font-normal text-base text-black sm:block">
                        Twitter
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-black">2.2K</p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-green-600">$4,635</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-black">467</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-blue-500">4.3%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-9 sm:h-9">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="Brand" />
                      </div>
                      <p className="hidden font-normal text-base text-black sm:block">
                        Github
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-black">2.1K</p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-green-600">$4,290</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-black">420</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-blue-500">3.7%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-9 sm:h-9">
                        <img className="rounded-full" src="https://avatars.githubusercontent.com/u/317769?s=280&v=4" alt="Brand" />
                      </div>
                      <p className="hidden font-normal text-base text-black sm:block">
                        Vimeo
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-black">1.5K</p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-green-600">$3,580</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-black">389</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-blue-500">2.5%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-9 sm:h-9">
                        <img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="Brand" />
                      </div>
                      <p className="hidden font-normal text-base text-black sm:block">
                        Facebook
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-black">1.2K</p>
                    </div>
                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="font-normal text-xs sm:text-base text-green-600">$2,740</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-black">230</p>
                    </div>
                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="font-normal text-base text-blue-500">1.9%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Chats */}
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default xl:col-span-4">
              <h4 className="mb-6 px-8 text-xl font-semibold text-black">
                Chats
              </h4>
              <div>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h5 className="font-medium text-base text-black">
                        Devid Heilo
                      </h5>
                      <p>
                        <span className="text-sm font-medium text-black">Hello, how are you?</span>
                        <span className="text-xs"> . 12 min</span>
                      </p>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-white">3</span>
                    </div>
                  </div>
                </a>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between text-slate-600">
                    <div>
                      <h5 className="font-medium text-base">Henry Fisher</h5>
                      <p>
                        <span className="text-sm font-medium">I am waiting for you</span>
                        <span className="text-xs"> . 5:54 PM</span>
                      </p>
                    </div>
                  </div>
                </a>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between text-slate-600">
                    <div>
                      <h5 className="font-medium text-base">Wilium Smith</h5>
                      <p>
                        <span className="text-sm font-medium">Where are you now?</span>
                        <span className="text-xs"> . 10:12 PM</span>
                      </p>
                    </div>
                  </div>
                </a>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between text-slate-600">
                    <div className="text-slate-600">
                      <h5 className="font-medium text-black text-base">
                        Henry Deco
                      </h5>
                      <p>
                        <span className="text-sm font-medium text-black">Thank you so much!</span>
                        <span className="text-xs"> . Sun</span>
                      </p>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-white">2</span>
                    </div>
                  </div>
                </a>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between text-slate-600">
                    <div>
                      <h5 className="font-medium text-base">Jubin Jack</h5>
                      <p>
                        <span className="text-sm font-medium">I really love that!</span>
                        <span className="text-xs"> . Oct 23</span>
                      </p>
                    </div>
                  </div>
                </a>
                <a href="messages.html" className="flex items-center gap-5 px-8 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                  <div className="relative">
                    <img className="rounded-full h-12 w-12 sm:h-14 sm:w-14" src="https://media.vneconomy.vn/images/upload/2024/03/05/bill-gates-business-2.jpg" alt="User" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between text-slate-600">
                    <div>
                      <h5 className="font-medium text-base">Wilium Smith</h5>
                      <p>
                        <span className="text-sm font-medium">Where are you now?</span>
                        <span className="text-xs"> . Sep 20</span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default Dashboard