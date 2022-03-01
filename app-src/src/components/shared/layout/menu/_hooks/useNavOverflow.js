import { useWindowDimensions } from '../../../../../helpers/hooks';
import { useEffect, useRef, useState } from 'react';

const useNavOverflow = hover => {
    const subNavRef = useRef(null);
    const { height } = useWindowDimensions();

    const [isSubNavOverflowing, setIsSubNavOverflowing] = useState(false);

    useEffect(() => {
        if (subNavRef.current) {
            const rect = subNavRef.current.getBoundingClientRect();
            if (rect.bottom + rect.height > height) {
                setIsSubNavOverflowing(true);
            } else {
                setIsSubNavOverflowing(false);
            }
        }
    }, [subNavRef.current, height, hover]);

    return { subNavRef, isSubNavOverflowing };
};

export default useNavOverflow;
