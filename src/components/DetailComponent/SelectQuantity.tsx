type Props = {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};
const SelectQuantity = ({
  quantity,
  handleIncrement,
  handleDecrement,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-center bg-slate-100 px-2 py-3 sm:p-3.5 rounded-full">
        <div className="flex items-center justify-between w-full space-x-5 ">
          <div className=" flex items-center justify-between w-[104px] sm:w-28">
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="flex-1 block leading-none text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-8 h-8 bg-white border rounded-full outline-none border-neutral-400 hover:border-neutral-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectQuantity;
