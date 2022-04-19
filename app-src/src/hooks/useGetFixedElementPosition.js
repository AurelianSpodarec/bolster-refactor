import React, { useEffect, useState } from 'react';

const useGetFixedElementPosition = (
    parentRef,
    offsetFromParent = 0,
    isShowing,
    scrollElementID,
) => {
    const [isPositioned, setIsPositioned] = useState(false);
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [isRight, setIsRight] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const scrollElement = document.getElementById(scrollElementID);

        const scrollListener = () => {
            setPositions();
        };

        if (isShowing) {
            setPositions();

            setTimeout(() => {
                setIsPositioned(true);
            }, 10);

            if (scrollElement) scrollElement.addEventListener('scroll', scrollListener);
        } else {
            if (isPositioned) setIsPositioned(false);
            if (scrollElement) scrollElement.removeEventListener('scroll', scrollListener);
        }

        return () => {
            if (scrollElement) scrollElement.removeEventListener('scroll', scrollListener);
        };
    }, [isShowing]);

    const setPositions = () => {
        const parentPositions = parentRef.current
            ? parentRef.current.getBoundingClientRect()
            : null;

        if (!parentPositions) return;

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

    return { positionStyles, isPositioned, isRight, isBottom };
};

export default useGetFixedElementPosition;
