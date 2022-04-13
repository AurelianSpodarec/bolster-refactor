import React, { useEffect, useRef, useState } from 'react';

const offsetFromButton = 10;

const useButtonDropdownPosition = () => {
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [isRight, setIsRight] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

    const buttonRef = useRef(null);
    const buttonPositions = buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;

    useEffect(() => {
        if (buttonPositions) {
            setPositions(buttonPositions);
        }
    }, [buttonPositions]);

    const setPositions = buttonPositions => {
        const { innerWidth, innerHeight } = window;
        const { top, bottom, left, right, height } = buttonPositions;

        setTop(top + height + offsetFromButton);
        setBottom(innerHeight - bottom + height + offsetFromButton);
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

    return { buttonRef, positionStyles };
};

export default useButtonDropdownPosition;
