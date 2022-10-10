import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import useLocalStorage from './useLocalStorage';

const BASIC_URL = "https://api.giphy.com/v1/gifs";
const LIMIT = 5;
const SINGLE_FETCH_ROUTES = ["/random", "/favorite"];
export interface GifData {
    id: string;
    title?: string;
    images: {
        downsized: {
            url: string;
        }
    }
}

const getUrl = (pathName: string, optionsQuery: string, searchText?: string, ids?: string[]) => {
    let url = `${BASIC_URL}/trending?api_key=${process.env.REACT_APP_API_KEY}${optionsQuery}`

    if (searchText) {
        url = `${BASIC_URL}/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchText}${optionsQuery}`
    } else if (pathName === "/random") {
        url = `${BASIC_URL}/random?api_key=${process.env.REACT_APP_API_KEY}`
    } else if (pathName === "/favorite" && ids && ids.length > 0) {
        url = `${BASIC_URL}?ids=${ids.join(",")}&api_key=${process.env.REACT_APP_API_KEY}`
    }

    return url;
}

function useFetch(page: number = 1, searchText?: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<GifData[]>([]);
    const [ids] = useLocalStorage("favorite", "");

    const location = useLocation();

    const OPTIONS_QUERY = `&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`;

    const url = getUrl(location.pathname, OPTIONS_QUERY, searchText, ids);

    const getData = async () => {
        if (ids.length === 0 && location.pathname === "/favorite") return;
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            const mappedData = Array.isArray(data.data) ? data.data : [data.data];
            if (SINGLE_FETCH_ROUTES.includes(location.pathname)) {
                setData(mappedData)
            } else {
                setData((prev: GifData[]) => [...prev, ...mappedData]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setData([]);
        if (searchText && searchText.length > 0) {
            getData();
        }
    }, [searchText]);

    useEffect(() => {
        !loading && getData();
    }, [page]);

    return { loading, data, getData };
}

export default useFetch;