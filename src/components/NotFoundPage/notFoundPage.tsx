import styles from './notFoundPage.module.css';
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1>
                404
            </h1>
            <Link to="/" className={styles.link}>
                Back home
            </Link>
        </div>
    );
}

