import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay, immediate = false) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (immediate) {
            savedCallback.current?.();
        }
        
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current?.(), delay);
            return () => clearInterval(id);
        }
    }, [delay, immediate]);
};