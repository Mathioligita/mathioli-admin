import styles from '../styles/MetricsSection.module.css';

export default function MetricsSection() {
  return (
    <section className={styles.metricsSection}>
      <div className={styles.metric}>
        <h2>75</h2>
        <p>Total Orders</p>
      </div>
      <div className={styles.metric}>
        <h2>357</h2>
        <p>Total Delivered</p>
      </div>
      <div className={styles.metric}>
        <h2>65</h2>
        <p>Total Canceled</p>
      </div>
      <div className={styles.metric}>
        <h2>$128</h2>
        <p>Total Revenue</p>
      </div>
    </section>
  );
}
