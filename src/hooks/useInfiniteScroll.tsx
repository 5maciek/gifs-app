import { useState, useRef, useEffect } from "react";

function useInfiniteScroll() {
    const [page, setPage] = useState(1);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            const [target] = entries;
            if (target.isIntersecting) {
                setPage((prev) => prev + 1);
            }
        }, option);

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return (() => observer.disconnect())
    }, []);

    return { loadMoreRef, page };
}

export default useInfiniteScroll;
