import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const CreditProgressChart = ({ credits }) => {
    const totalCredits = 240;
    const data = [
        { name: "Completed", value: credits },
        { name: "Remaining", value: totalCredits - credits },
    ];

    const COLORS = ["#465f9f", "#e5e5e5"]; // Green for completed, gray for remaining

    return (
        <div className="relative w-50 h-50 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={91}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
                <p className="text-2xl font-bold text-dark">{credits}</p>
                <p className="text-sm text-gray-600">Δ. Μονάδες</p>
            </div>
        </div>
    );
};

CreditProgressChart.propTypes = {
    credits: PropTypes.number.isRequired,
}

export default CreditProgressChart;
