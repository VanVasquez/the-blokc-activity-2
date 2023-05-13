import ManualHeader from "@/components/ManualHeader";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <ManualHeader />
      <div className={styles.main}></div>
    </>
  );
}
