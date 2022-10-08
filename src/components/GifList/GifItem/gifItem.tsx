import styles from './gifItem.module.css';
import { GifData } from '../../../hooks/useFetch';

export const GifItem = (props: GifData) => {
    const { id, title, images } = props;

    return (
        <li key={id} className={styles.card}>
            <img alt={title} src={`${images.downsized.url}`} />
        </li>
    );
}

