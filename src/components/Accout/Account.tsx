import Navbar from "./Navbar/Navbar";
const Account = () => {
  return (
    <>
      <div className="mt-14 sm:mt-20 container">
        <div className="">
          {/* Title */}
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Tài khoản</h2>
            {/* <span className="block mt-4 text-neutral-500 text-base sm:text-lg">
              <span className="text-slate-900 font-semibold">Enrico Cole,</span>
              ciseco@gmail.com · Los Angeles, CA
            </span> */}
          </div>
          {/* Navbar //*/}
          <Navbar />
        </div>
      </div>
      {/* Account infomation */}
    </>
  );
};

export default Account;
