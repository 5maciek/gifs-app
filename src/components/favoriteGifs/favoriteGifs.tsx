import useFetch, { GifData } from "../../hooks/useFetch";
import { GifItem } from "../gifList/gifItem/gifItem";
import { Spinner } from "../spinner/spinner";
import { AiOutlineDatabase } from "react-icons/ai";
import styles from "./favoriteGifs.module.css";


export const FavoriteGifs = () => {
    const { loading, data } = useFetch();

    return (
        <div className={styles.container}>
            {loading ? <Spinner /> :
                data.length === 0 ?
                    <div className={styles["no-favorites"]}>
                        <AiOutlineDatabase />
                        <p>You don't have any favorite Gifs yet</p>
                    </div>
                    :
                    <ul>
                        {data.map((gif: GifData) => {
                            return (
                                <GifItem id={gif.id} title={gif.title} images={gif.images} />
                            )
                        }
                        )}
                    </ul>}
        </div>
    );
}

