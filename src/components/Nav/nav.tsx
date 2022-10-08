import styles from './nav.module.css';
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.link}>
                Home
            </Link>
            <Link to="/random" className={styles.link}>
                Random
            </Link>
        </div>
    )
}
