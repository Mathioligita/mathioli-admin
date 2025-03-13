import { Line } from 'react-chartjs-2';
import styles from '../styles/TotalRevenueChart.module.css';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: '2020',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 60, 70, 75],
      fill: false,
      borderColor: '#FF6384',
    },
    {
      label: '2021',
      data: [75, 69, 90, 91, 66, 65, 50, 55, 60, 70, 80, 85],
      fill: false,
      borderColor: '#36A2EB',
    },
  ],
};

export default function TotalRevenueChart() {
  return (
    <div className={styles.totalRevenueChart}>
      <Line data={data} />
    </div>
  );
}
