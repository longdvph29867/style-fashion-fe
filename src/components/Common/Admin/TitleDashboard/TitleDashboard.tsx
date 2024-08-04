import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
};

const TitleDashboard = ({ title, subtitle }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-title">{title}</h2>
      <span className="text-content text-xs">{subtitle}</span>
    </div>
  );
};

export default TitleDashboard;
