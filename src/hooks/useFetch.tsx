import { useState, useEffect } from 'react';

const BASIC_URL = "https://api.giphy.com/v1/gifs";
const LIMIT = 5;

export interface GifData {
    id: string;
    title?: string;
    images: {
        downsized: {
            url: string;
        }
    }
}

function useFetch(page: number = 1, serachText?: string, random?: boolean) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<GifData[]>([]);

    let url = `${BASIC_URL}/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`

    if (serachText) {
        url = `${BASIC_URL}/search?api_key=${process.env.REACT_APP_API_KEY}&q=${serachText}&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`
    }

    if (random) {
        url = `${BASIC_URL}/random?api_key=${process.env.REACT_APP_API_KEY}`
    }

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                url
            );
            const data = await response.json();
            const mappedData = Array.isArray(data.data) ? data.data : [data.data];
            if (random) {
                setData(mappedData)
            }
            setData((prev: GifData[]) => [...prev, ...mappedData]);
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