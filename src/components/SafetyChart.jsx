// client/src/components/SafetyChart.jsx
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#28a745", "#fd7e14", "#dc3545"]; // High, Medium, Low

const SafetyChart = ({ destinations }) => {
  const data = [
    { name: "High", value: destinations.filter(d => d.safety === "High").length },
    { name: "Medium", value: destinations.filter(d => d.safety === "Medium").length },
    { name: "Low", value: destinations.filter(d => d.safety === "Low").length },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SafetyChart;
