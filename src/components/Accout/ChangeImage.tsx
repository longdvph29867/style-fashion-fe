import React from 'react';
import {Image } from 'antd';
import { UploadOutlined  } from '@ant-design/icons';

type Prop = {
  image?: string;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>)=> Promise<void>
}

const ChangeImage = ({image,handleUpload}: Prop) => {


  return (
<div className="flex-shrink-0 flex items-start sm:justify-start justify-center ">
  <div className="overflow-hidden relative">
    <div className='sm:w-40 sm:h-40 w-32 h-32 relative rounded-full overflow-hidden mb-2'>
      <Image
        src={image}
      />
    </div>
    <label htmlFor="upload-input" className="cursor-pointer sm:absolute sm:bottom-0 sm:left-0 flex justify-center">
      <div className="flex justify-center items-center gap-1 border sm:w-16 sm:h-8 w-14 h-6 border-stone-400 rounded bg-slate-50">
        <UploadOutlined className='sm:text-base  text-sx'/> 
        <p className='sm:text-base text-sm'>Edit</p>
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
