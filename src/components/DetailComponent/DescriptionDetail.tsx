type DescriptionDetailProps = {
  product: Product | null;
};

const DescriptionDetail = ({ product }: DescriptionDetailProps) => {
  return (
    <div className="container mx-auto mt-12">
      <h2 className="text-2xl font-semibold">Product Details</h2>
      <div className="mt-7 max-w-[56rem]">
        <p className="text-lg font-normal text-slate-600">
          {product?.description}
        </p>  
        <div className="p-4 pt-3 text-sm leading-6 text-slate-600">
          <ul className="text-lg font-normal leading-7 list-disc list-inside">
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescriptionDetail;
