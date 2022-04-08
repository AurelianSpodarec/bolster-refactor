import { useEffect, useRef, useState } from 'react';

import { useWindowDimensions } from 'helpers/hooks';

const useActionMenuOverflow = () => {
    const ref = useRef(null);
    const { height } = useWindowDimensions();

    const [isOverflowChecked, setIsOverflowChecked] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            if (rect.bottom + rect.height > height) {
                setIsOverflowing(true);
            } else {
                setIsOverflowing(false);
            }

            setIsOverflowChecked(true);
        }
    }, [ref.current, height]);

    return { ref, isOverflowing, isOverflowChecked };
};

export default useActionMenuOverflow;
