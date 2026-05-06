import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BarChat = ({ dataSource, type }) => {
    let data = [];

    if (type === "department") {
        data = Object.entries(dataSource || {}).map(([dept, count]) => ({
            name: dept,
            value: count,
        }));
    }

    if (type === "activity") {
        data = (dataSource || []).map((item, index) => ({
            name: item.message,
            value: index + 1,
        }));
    }
    const barColor =
        type === "department" ? "#ff4b2b" : "#00b09b";
    return (
        <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={barColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChat;