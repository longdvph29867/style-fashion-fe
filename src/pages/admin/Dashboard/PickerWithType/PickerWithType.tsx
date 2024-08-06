import React, { useState } from "react";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, Space, TimePicker } from "antd";
import moment from "moment";

const { Option } = Select;
type PickerType = "week" | "month" | "year";
type Props = {
  onChange: DatePickerProps["onChange"];
};
const PickerWithType = ({ onChange }: Props) => {
  const [type, setType] = useState<PickerType>("year");
  const formatWeek = (value) => {
    if (!value) return "";
    const startOfWeek = moment(value).startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment(value).endOf("week").format("YYYY-MM-DD");
    return `${startOfWeek} đến ${endOfWeek}`;
  };

  return (
    <div>
      <Space>
        <Select value={type} onChange={setType}>
          <Option value="week">Tuần</Option>
          <Option value="month">Tháng</Option>
          <Option value="year">Năm</Option>
        </Select>
        <DatePicker
          value={moment()}
          picker={type}
          onChange={onChange}
          //   format={formatWeek}
        />
      </Space>
    </div>
  );
};

export default PickerWithType;
