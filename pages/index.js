"use client"

import Head from 'next/head';
import Header from '../components/Header';
import MetricsSection from '../components/MetricsSection';
import PieCharts from '../components/PieCharts';
import LineChartOrders from '../components/LineChartOrders';
import TotalRevenueChart from '../components/TotalRevenueChart';
import QuoteSection from '../components/QuoteSection';
import CustomerReviewSection from '../components/CustomerReviewSection';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <MetricsSection />
      <div className={styles.chartsContainer}>
        <PieCharts />
        <LineChartOrders />
      </div>
      <TotalRevenueChart />
      <QuoteSection />
      <CustomerReviewSection />
    </div>
  );
}
