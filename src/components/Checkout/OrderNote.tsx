import React from "react";
import { TbMessageExclamation } from "react-icons/tb";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const OrderNote = ({ onChange, value }: Props) => {
  return (
    <div className="scroll-mt-24">
      {/*  */}
      <div className="border border-slate-200 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <TbMessageExclamation fontSize={24} color="#334155" />
          </span>
          <div className="sm:ml-8">
            <h3 className="text-slate-700 flex">
              <span className="uppercase tracking-tight">Lời nhắn</span>
            </h3>
          </div>
        </div>
        <div className="px-6 pb-6">
          <textarea
            name="note"
            id=""
            onChange={onChange}
            rows={3}
            value={value}
            className="w-full resize-none rounded-md block p-2.5 text-gray-900 bg-gray-50 border border-gray-300"
            placeholder="Lời nhắn cho chúng tôi..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default OrderNote;
