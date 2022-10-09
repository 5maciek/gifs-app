import { Nav } from '../nav/nav';
import styles from './logo.module.css';

export const Logo = () => {
    return (
        <div className={styles.container}>
            <h1>
                GIFs
            </h1>
            <Nav />
        </div>
    );
}

