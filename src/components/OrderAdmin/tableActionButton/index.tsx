import { MoreOutlined } from "@ant-design/icons";
// import { useStyles } from "./styled";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

export const TableActionButton = ({ onClick }: Props) => {
  // const { styles } = useStyles();
  return (
    <MoreOutlined
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: "auto",
        // marginTop: -6,
        width: 32,
        height: 32,
        border: `1px solid gray`,
        borderRadius: 6,
        fontSize: 16,
      }}
      role="button"
      // className={styles.button}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    />
  );
};
