import React from 'react';
import { FiCamera } from "react-icons/fi";
type Prop = {
  image?: string;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>)=> Promise<void>
}

const ChangeImage = ({image,handleUpload}: Prop) => {


  return (
<div className="flex-shrink-0 flex items-start sm:justify-start justify-center ">
  <div className="overflow-hidden relative">
    <div className='sm:w-40 sm:h-40 w-32 h-32 relative rounded-full overflow-hidden mb-2'>
      <img
      className="w-full h-full rounded-full object-cover z-0"
        src={image}
      />
    </div>
    <label htmlFor="upload-input" className="cursor-pointer absolute bottom-2 right-2">
      <div className="flex justify-center items-center rounded-full gap-1 w-10 h-10 border-stone-400 bg-slate-50">
        <FiCamera className='text-lg text-slate-500'/> 
      </div>
      <input
        id="upload-input"
        type="file"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
    </label>
  </div>
</div>

  );
};


export default ChangeImage;
