import { ChangeEvent } from "react";
import "./checkbox.css";

interface Props {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  isChecked: boolean;
}

const Checkbox = ({
  value,
  name,
  onChange,
  label,
  isChecked,
  disabled,
}: Props) => {
  return (
    <label className="checkbox grow-0">
      <input
        type="checkbox"
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        checked={isChecked}
      />
      <span className={`label-tick ${disabled ? "disabled" : ""}`} />
      {label && <span className="content">{label}</span>}
    </label>
  );
};

export default Checkbox;
