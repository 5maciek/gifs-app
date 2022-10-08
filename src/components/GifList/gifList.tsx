import { useState } from 'react';
import styles from './gifList.module.css';
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch, { GifData } from '../../hooks/useFetch';
import { Spinner } from '../Spinner/spinner';

export const GifList = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputValueToFetch, setInputValueToFetch] = useState<string>("");
    const { loadMoreRef, page } = useInfiniteScroll();
    const { loading, data } = useFetch(page, inputValueToFetch);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.code === "Enter") {
            setInputValueToFetch(inputValue)
        }
    }

    const handleSearch = () => {
        setInputValueToFetch(inputValue)
    };

    return (
        <div className={styles.container}>
            <div className={styles["input-container"]}>
                <input
                    name="search"
                    autoComplete="off"
                    type="text"
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyPress}
                    placeholder={"search a gif"}
                />
                <button onClick={handleSearch}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" />
                </button>
            </div>
            <ul className={styles.box}>
                {data.map((gif: GifData) => {
                    return (
                        <li key={gif.id} className={styles.card}>
                            <img alt={gif.title} src={`${gif.images.downsized.url}`} />
                        </li>
                    )
                })}
                <div ref={loadMoreRef}>{loading ? <Spinner /> : null}</div>
            </ul>
        </div>
    );
}

