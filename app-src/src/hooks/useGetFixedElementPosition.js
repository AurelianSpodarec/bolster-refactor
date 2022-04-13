import React, { useEffect, useState } from 'react';

const useGetFixedElementPosition = (parentRef, offsetFromParent = 0) => {
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [isRight, setIsRight] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

    const parentPositions = parentRef.current ? parentRef.current.getBoundingClientRect() : null;

    useEffect(() => {
        if (parentPositions) {
            setPositions(parentPositions);
        }
    }, [parentPositions]);

    const setPositions = parentPositions => {
        const { innerWidth, innerHeight } = window;
        const { top, bottom, left, right, height } = parentPositions;

        setTop(top + height + offsetFromParent);
        setBottom(innerHeight - bottom + height + offsetFromParent);
        setLeft(left);
        setRight(innerWidth - right);

        if (left > innerWidth / 2) {
            setIsRight(true);
        } else {
            setIsRight(false);
        }

        if (top > innerHeight / 2) {
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
    };

    const positionStyles = {
        top: isBottom ? 'auto' : top,
        bottom: isBottom ? bottom : 'auto',
        left: isRight ? 'auto' : left,
        right: isRight ? right : 'auto',
    };

    return positionStyles;
};

export default useGetFixedElementPosition;
