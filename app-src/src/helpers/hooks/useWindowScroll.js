import { useEffect, useState } from 'react';

const useWindowScroll = () => {
    const [scroll, setScroll] = useState({
        x: window.scrollX,
        y: window.scrollY,
    });

    const onScroll = () => {
        setScroll({
            x: window.scrollX,
            y: window.scrollY,
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [window]);

    return scroll;
};

export default useWindowScroll;
