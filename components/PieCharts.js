import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import styles from '../styles/PieCharts.module.css';

// Register the ArcElement
ChartJS.register(ArcElement);

const data = {
  labels: ['Total Order', 'Customer Growth', 'Total Revenue'],
  datasets: [
    {
      data: [81, 22, 62],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

export default function PieCharts() {
  return (
    <div className={styles.pieCharts}>
      <Pie data={data} />
    </div>
  );
}
