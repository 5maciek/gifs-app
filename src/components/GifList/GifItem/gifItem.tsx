import styles from './gifItem.module.css';
import { GifData } from '../../../hooks/useFetch';
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useLocalStorage from '../../../hooks/useLocalStorage';

export const GifItem = (props: GifData) => {
    const { id, title, images } = props;
    const [ids, SetIds] = useLocalStorage("favorite", "");
    const isFavorites = ids.includes(id);

    const handleFavorite = () => {
        if (!isFavorites) {
            const newIds = [...ids, id];
            SetIds(newIds)
        } else {
            const newIds = ids.filter((item: string) => item !== id);
            SetIds(newIds)
        }
    }

    return (
        <li className={styles.card}>
            <img alt={title} src={`${images.downsized.url}`} />
            <div className={styles.icons}>
                <a onClick={() => { navigator.clipboard.writeText(images.downsized.url); alert("You have copied url to clipboard"); }}>
                    <AiOutlineLink />
                </a>
                <a onClick={handleFavorite} >
                    {isFavorites ? <AiFillHeart /> : <AiOutlineHeart />}
                </a>
            </div>
        </li>
    );
}

