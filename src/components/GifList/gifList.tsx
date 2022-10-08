import { useState } from 'react';
import styles from './gifList.module.css';
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch, { GifData } from '../../hooks/useFetch';
import { Spinner } from '../Spinner/spinner';
import { GifItem } from './GifItem/gifItem';
import { GoSearch } from "react-icons/go";

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
                    <GoSearch style={{ fontSize: "20px:" }} />
                </button>
            </div>
            <ul className={styles.box}>
                {data.map((gif: GifData) => {
                    return (
                        <GifItem id={gif.id} title={gif.title} images={gif.images} />
                    )
                })}
                <div ref={loadMoreRef}>{loading ? <Spinner /> : null}</div>
            </ul>
        </div>
    );
}

