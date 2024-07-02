// ChartComponent.jsx
import React from 'react';
import { LineChart, BarChart } from 'your-chart-library'; // Replace with your preferred chart library

const ChartComponent = ({ data }) => {
    return (
        <div>
            <LineChart data={data} />
            {/* or */}
            <BarChart data={data} />
        </div>
    );
};

export default ChartComponent;
