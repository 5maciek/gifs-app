import useFetch from '../../hooks/useFetch';
import { GifItem } from '../gifList/gifItem/gifItem';
import { Spinner } from '../spinner/spinner';
import styles from './random.module.css';

export const Random = () => {
    const { loading, data, getData } = useFetch();

    return (
        <div>
            <button className={styles.button} onClick={getData}>Random</button>
            <div className={styles.container}>
                {loading ? <Spinner /> : data[0] && <GifItem id={data[0]?.id} title={data[0]?.title} images={data[0]?.images} />}
            </div>
        </div>
    );
}

