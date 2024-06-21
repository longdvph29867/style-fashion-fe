import React from "react";

interface SmallThumbnailProps {
  gallery: string[] | undefined;
  onThumbnailClick: (image: string) => void;
}

export const SmallThumbnail: React.FC<SmallThumbnailProps> = ({
  gallery,
  onThumbnailClick,
}) => {
  if (!gallery) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {gallery.map((image, index) => (
        <div
          key={index}
          className="cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 border-transparent"
        >
          <img
            onClick={() => onThumbnailClick(image)}
            src={image}
            alt=""
            className="absolute object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
