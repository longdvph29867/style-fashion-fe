import { Skeleton } from "antd";

type Props = {
  value: number;
  // rows: number;
  height: number;
};

const SkeletionList = ({ value, height }: Props) => {
  const array = new Array(value).fill(0);
  return array.map((item, index) => (
    <div key={item + index} className="flex flex-col w-full">
      <Skeleton.Button block={true} active style={{ height: height }} />
      <div className="flex flex-col border border-[#cccccc3b] border-t-0 p-4 bg-white">
        {/* <Skeleton active paragraph={{ rows: rows }} /> */}
      </div>
    </div>
  ));
};

export default SkeletionList;
