import styles from './gifItem.module.css';
import { GifData } from '../../../hooks/useFetch';
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LocalStorageContext } from '../../../context/localStorageContext';
import { useContext } from 'react';

export const GifItem = (props: GifData) => {
    const { id, title, images } = props;
    const { ids, setIds } = useContext(LocalStorageContext);
    const isFavorites = ids.includes(id);

    const handleFavorite = () => {
        if (!isFavorites) {
            const newIds = [...ids, id];
            setIds(newIds)
        } else {
            const newIds = ids.filter((item: string) => item !== id);
            setIds(newIds)
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

