type Props = {
  title: string;
  content: string;
  className?: string;
};

const Title = ({ title, content, className }: Props) => {
  return (
    <div>
      <h2 className={`text-2xl font-semibold md:text-3xl ${className}`}>
        <span className="uppercase text-[#222]">{title}</span>
        <span>. </span>
        <span className="text-[#6a6a6a] text-xl">
          {/* REY backpacks &amp; bags */}
          {content}
        </span>
      </h2>
    </div>
  );
};

export default Title;
