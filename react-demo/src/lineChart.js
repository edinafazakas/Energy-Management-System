// LineChart.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
    // Extracting labels and data from the JSON
    const labels = data.map(entry => entry.timestamp);
    const energyValues = data.map(entry => entry.measurement_value);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Energy Consumption (kWh)',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: energyValues,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: labels,
            },
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
