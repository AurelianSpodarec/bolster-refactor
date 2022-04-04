import { useEffect, useRef, useState } from 'react';

import { useWindowDimensions } from 'helpers/hooks';

const useActionMenuOverflow = () => {
    const ref = useRef(null);
    const { height } = useWindowDimensions();

    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            if (rect.bottom + rect.height > height) {
                setIsOverflowing(true);
            } else {
                setIsOverflowing(false);
            }
        }
    }, [ref.current, height]);

    return { ref, isOverflowing };
};

export default useActionMenuOverflow;
