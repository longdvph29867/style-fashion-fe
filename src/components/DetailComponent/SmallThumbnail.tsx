const SmallThumbnail = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 border-slate-400">
          <img
            alt=""
            className="absolute object-cover w-full h-full"
            src="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/460324/item/vngoods_05_460324.jpg?width=750"
          />
        </div>
        <div className="cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 border-transparent">
          <img
            alt=""
            className="absolute object-cover w-full h-full"
            src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450189/sub/goods_450189_sub14.jpg?width=750"
          />
        </div>
        <div className="cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 border-transparent">
          <img
            alt=""
            className="absolute object-cover w-full h-full"
            src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450189/sub/goods_450189_sub20.jpg?width=750"
          />
        </div>
        <div className="cursor-pointer relative pb-[100%] rounded-2xl overflow-hidden border-2 border-transparent">
          <img
            alt=""
            className="absolute object-cover w-full h-full"
            src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450189/sub/goods_450189_sub26.jpg?width=750"
          />
        </div>
      </div>
    </>
  );
};

export default SmallThumbnail;
