import styles from './gifItem.module.css';
import { GifData } from '../../../hooks/useFetch';
import { AiOutlineLink } from "react-icons/ai";

export const GifItem = (props: GifData) => {
    const { id, title, images } = props;

    return (
        <li key={id} className={styles.card}>
            <img alt={title} src={`${images.downsized.url}`} />
            <button onClick={() => { alert("You have copied url to clipboard"); navigator.clipboard.writeText(images.downsized.url) }}><AiOutlineLink /></button>
        </li>
    );
}

