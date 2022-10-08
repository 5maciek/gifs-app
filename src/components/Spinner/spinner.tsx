import styles from './spinner.module.css';

export const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.bounce1}></div>
            <div className={styles.bounce2}></div>
            <div></div>
        </div>
    )
}
