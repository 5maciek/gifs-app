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

function useFetch(page: number = 1, serachText?: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<GifData[]>([]);
    const [ids] = useLocalStorage("favorite", "");

    const location = useLocation();

    const OPTIONS_QUERY = `&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`;

    let url = `${BASIC_URL}/trending?api_key=${process.env.REACT_APP_API_KEY}${OPTIONS_QUERY}`

    if (serachText) {
        url = `${BASIC_URL}/search?api_key=${process.env.REACT_APP_API_KEY}&q=${serachText}${OPTIONS_QUERY}`
    } else if (location.pathname === "/random") {
        url = `${BASIC_URL}/random?api_key=${process.env.REACT_APP_API_KEY}`
    } else if (location.pathname === "/favorite") {
        url = `${BASIC_URL}?ids=${ids.join(",")}&api_key=${process.env.REACT_APP_API_KEY}`
    }
    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                url
            );
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
        if (serachText && serachText.length > 0) {
            setData([]);
            getData();
        }
        setData([]);
    }, [serachText]);

    useEffect(() => {
        getData();
    }, [page]);

    return { loading, data, getData };
}

export default useFetch;