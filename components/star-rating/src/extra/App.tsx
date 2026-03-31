import { useState } from "react";
import StarRating from "./StarRating";
import styles from "./App.module.css";

interface DemoItem {
  label: string;
  maxStars: number;
  initial: number;
  size?: number;
  color?: string;
}

const DEMOS: DemoItem[] = [
  { label: "Product Quality",    maxStars: 5,  initial: 4 },
  { label: "Customer Support",   maxStars: 5,  initial: 2 },
  { label: "Value for Money",    maxStars: 10, initial: 7, size: 24, color: "#10B981" },
  { label: "Overall Experience", maxStars: 5,  initial: 0 },
];

type Ratings = Record<string, number>;

export default function App() {
  const [ratings, setRatings] = useState<Ratings>(
    Object.fromEntries(DEMOS.map((d) => [d.label, d.initial]))
  );

  const handleChange = (label: string, newValue: number): void => {
    setRatings((prev) => ({ ...prev, [label]: newValue }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Rate Your Experience</h1>
        <p className={styles.subtitle}>Your feedback helps us improve</p>

        <div className={styles.list}>
          {DEMOS.map((demo) => (
            <div key={demo.label} className={styles.row}>
              <div className={styles.labelWrap}>
                <span className={styles.label}>{demo.label}</span>
                <span className={styles.badge}>
                  {ratings[demo.label]}/{demo.maxStars}
                </span>
              </div>
              <StarRating
                maxStars={demo.maxStars}
                value={ratings[demo.label]}
                onChange={(v) => handleChange(demo.label, v)}
                size={demo.size ?? 32}
                color={demo.color ?? "#F59E0B"}
              />
            </div>
          ))}
        </div>

        <button
          className={styles.button}
          onClick={() => alert(JSON.stringify(ratings, null, 2))}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
