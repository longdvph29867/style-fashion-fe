import { useEffect, useState } from "react";
import { DatePicker, Select, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;
type PickerType = "week" | "month" | "year";
type Props = {
  onChange: (type: string, time: string) => void;
};
const PickerWithType = ({ onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [type, setType] = useState<PickerType>("week");

  const formatTime = (value: Dayjs) => {
    switch (type) {
      case "week":
        const startOfWeek = value.startOf("week").format("DD-MM-YYYY");
        const endOfWeek = value.endOf("week").format("DD-MM-YYYY");
        return `${startOfWeek} đến ${endOfWeek}`;
      case "month":
        return `${value.format("MM")}-${value.format("YYYY")}`;
      default:
        return `${value.format("YYYY")}`;
    }
  };

  useEffect(() => {
    if (type === "month") {
      setSelectedDate(dayjs().startOf("month"));
    } else if (type === "week") {
      setSelectedDate(dayjs().startOf("week"));
    } else if (type === "year") {
      setSelectedDate(dayjs().startOf("year"));
    }
  }, [type]);

  // const handleChange = (date: Dayjs | null, dateString: string) => {
  //   onChange(type, dateString);
  // };
  const handleChange = (date: Dayjs | null,) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (onChange && selectedDate) {
      onChange(type, selectedDate.format("DD-MM-YYYY"));
    }
  }, [type, selectedDate]);

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
        <Option value="year">Năm</Option>
      </Select>
      <DatePicker
        allowClear={false}
        // defaultValue={selectedDate}
        value={selectedDate}
        picker={type}
        onChange={handleChange}
        format={formatTime}
      />
    </Space>
  );
};

export default PickerWithType;
