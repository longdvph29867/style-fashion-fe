import logoIcon from "../../../assets/img/sf-logo.png";
import rightLargeImg from "../../../assets/img/rightLargeImg.webp";
type Props = {};

const BannerSecond = (props: Props) => {
  return (
    <div className="mt-24 w-full h-full relative flex flex-col lg:flex-row items-center">
      <div className="relative mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <a className=" inline-block text-slate-600" href="">
          <img
            height="46"
            className="block h-8 sm:h-10 w-auto"
            src={logoIcon}
            alt="logo"
          />
        </a>
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-4 sm:mt-6">
          Earn free money <br /> with Ciseco
        </h2>
        <span className="block mt-4 text-slate-500">
          With Ciseco you will get freeship &amp; savings combo...
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-4 sm:mt-8">
          <a
            href=""
            className="h-auto inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl"
          >
            Savings combo
          </a>
          <a
            href=""
            className="h-auto inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-white text-slate-700 hover:bg-gray-100 border border-slate-100"
          >
            Discover more
          </a>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <div className="block">
          <img
            width="1062"
            height="755"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={rightLargeImg}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSecond;
