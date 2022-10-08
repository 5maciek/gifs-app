import useFetch from '../../hooks/useFetch';
import { GifItem } from '../GifList/GifItem/gifItem';
import { Logo } from '../Logo/logo';
import { Spinner } from '../Spinner/spinner';
import styles from './random.module.css';

export const Random = () => {
    const { loading, data, getData } = useFetch(1, "", true);

    return (
        <div>
            <Logo />
            <button className={styles.button} onClick={getData}>Random</button>
            <div className={styles.container}>
                {loading ? <Spinner /> : data[0] && <GifItem id={data[0]?.id} title={data[0]?.title} images={data[0]?.images} />}
            </div>
        </div>
    );
}

