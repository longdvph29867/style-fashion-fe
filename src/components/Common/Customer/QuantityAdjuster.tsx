import { ChangeEvent } from "react";

interface Props {
  handleChangeQuantity: (value: number) => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
}

const QuantityAdjuster = ({ handleChangeInput, handleChangeQuantity, quantity }: Props) => {
  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        onClick={() => handleChangeQuantity(-1)}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11"
      >
        <svg
          className="w-3 h-3 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="number"
        className="bg-gray-50 border-x-0 border-y border-gray-300 h-11 font-medium text-center text-gray-900 text-base block w-full outline-none"
        required
        value={quantity}
        onChange={handleChangeInput}
      />
      <button
        onClick={() => handleChangeQuantity(1)}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
      >
        <svg
          className="w-3 h-3 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantityAdjuster;
