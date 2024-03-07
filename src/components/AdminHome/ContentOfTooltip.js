import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { convertDataContentOfTooltip, convertPrice } from "../../utils/utils";

const ContentOfTooltip = (props) => {
  const { dataOrder } = props;

  const data = [
    {
      name: "Tháng 1",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 1),
    },
    {
      name: "Tháng 2",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 2),
    },
    {
      name: "Tháng 3",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 3),
    },
    {
      name: "Tháng 4",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 4),
    },
    {
      name: "Tháng 5",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 5),
    },
    {
      name: "Tháng 6",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 6),
    },
    {
      name: "Tháng 7",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 7),
    },
    {
      name: "Tháng 8",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 8),
    },
    {
      name: "Tháng 9",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 9),
    },
    {
      name: "Tháng 10",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 10),
    },
    {
      name: "Tháng 11",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 11),
    },
    {
      name: "Tháng 12",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 12),
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${
            convertPrice(payload[0].value) || 0
          } VND`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="priceOfMonth" barSize={20} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ContentOfTooltip;
