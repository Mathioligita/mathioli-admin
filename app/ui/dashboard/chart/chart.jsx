// "use client"
// import React, { useState, useEffect } from 'react';
// import { Chart } from 'primereact/chart';
// export default function Charts() {

    
//     const [chartData, setChartData] = useState({});
//     const [chartOptions, setChartOptions] = useState({});

//     useEffect(() => {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--text-color');
//         const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
//         const data = {
//             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//             datasets: [
//                 {
//                     label: 'First Dataset',
//                     data: [65, 59, 80, 81, 56, 55, 40],
//                     fill: false,
//                     borderColor: documentStyle.getPropertyValue('--blue-500'),
//                     tension: 0.4
//                 },
//                 {
//                     label: 'Second Dataset',
//                     data: [28, 48, 40, 19, 86, 27, 90],
//                     fill: false,
//                     borderColor: documentStyle.getPropertyValue('--pink-500'),
//                     tension: 0.4
//                 }
//             ]
//         };
//         const options = {
//             maintainAspectRatio: false,
//             aspectRatio: 0.6,
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: textColor
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder
//                     }
//                 },
//                 y: {
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder
//                     }
//                 }
//             }
//         };

//         setChartData(data);
//         setChartOptions(options);
//     }, []);

//     return (
//         <div className="card">
//             <Chart type="line" data={chartData} options={chartOptions} />
//         </div>
   
//   )
// }
// src/app/ui/dashboard/chart/chart.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

// Register the chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Charts() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color').trim();
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary').trim();
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border').trim();

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500').trim(),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500').trim(),
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <Card className="card bg-white p-2">
            <Chart type="line" data={chartData} options={chartOptions} />
        </Card>
    );
}
