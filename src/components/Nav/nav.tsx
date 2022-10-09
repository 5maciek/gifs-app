import styles from './nav.module.css';
import { Link } from "react-router-dom";
import { MdHome } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import { AiOutlineHeart } from "react-icons/ai";

export const Nav = () => {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.link}>
                <MdHome /> Home
            </Link>
            <Link to="/random" className={styles.link}>
                <FaRandom /> Random
            </Link>
            <Link to="/favorite" className={styles.link}>
                <AiOutlineHeart /> Favorite
            </Link>
        </div>
    )
}
