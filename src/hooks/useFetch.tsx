import { useState, useEffect } from 'react';

const BASIC_URL = "https://api.giphy.com/v1/gifs";
const LIMIT = 5;

export interface GifData {
    id: string;
    title: string;
    images: {
        downsized: {
            url: string;
        }
    }
}

function useFetch(page: number = 1, serachText?: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<GifData[]>([]);

    let url = `${BASIC_URL}/trending?api_key=z3TCxWMXI3poet0DNQBeC8RfYrprX7U1&q&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`

    if (serachText) {
        console.log("maciek", page * LIMIT)
        url = `${BASIC_URL}/search?api_key=z3TCxWMXI3poet0DNQBeC8RfYrprX7U1&q=${serachText}&limit=${LIMIT}&offset=${page * LIMIT}&rating=G&lang=en`
    }

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                url
            );
            const data = await response.json();
            const mappedData = Array.isArray(data.data) ? data.data : [data.data];
            console.log(page, data.data);
            setData((prev: GifData[]) => [...prev, ...mappedData]);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setData([]);
        getData();
    }, [serachText]);

    useEffect(() => {
        getData();
    }, [page]);

    return { loading, data };
}

export default useFetch;