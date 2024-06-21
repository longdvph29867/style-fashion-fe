import React, { useEffect, useState } from "react";
import BigThumbnail from "../../components/DetailComponent/BigThumbnail";

type Props = {
  images: string[] | undefined;
};

const ImgDetail: React.FC<Props> = ({ images }) => {
  const [image, setImage] = useState<string | undefined>("");
  useEffect(() => {
    setImage(images?.[0]);
  }, [images]);

  const handleImage = (url: string) => {
    setImage(url);
  };
  return (
    <div>
      {/* <BigThumbnail /> */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {images?.map((img, index) => (
          <div
            onClick={() => handleImage(img)}
            key={index}
            className={`cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 ${
              image === img ? "border-slate-400" : "border-transparent"
            }`}
          >
            <img
              alt=""
              className="absolute object-cover w-full h-full"
              src={img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgDetail;
