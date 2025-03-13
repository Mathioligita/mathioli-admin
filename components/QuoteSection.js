import styles from '../styles/QuoteSection.module.css';

export default function QuoteSection() {
  return (
    <section className={styles.quoteSection}>
      <h2>Create Today's Quote</h2>
      <input type="text" placeholder="Quote" />
      <input type="text" placeholder="Author" />
      <button>Create Quote</button>
    </section>
  );
}
