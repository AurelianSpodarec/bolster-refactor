import { useState, useRef, useEffect } from 'react';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import debounce from 'lodash/debounce';

export const useBannerScroll = width => {
    const lastScrollTopRef = useRef(window.pageYOffset || document.documentElement.scrollTop);

    useEffect(() => {
        window.addEventListener('scroll', scrollToArea);

        Events.scrollEvent.register('begin', function () {
            window.removeEventListener('scroll', scrollToArea);
        });

        Events.scrollEvent.register('end', function () {
            window.addEventListener('scroll', scrollToArea);
            setLastScrollTop(window.pageYOffset || document.documentElement.scrollTop);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
            window.removeEventListener('scroll', scrollToArea);
        };
    }, []);

    function scrollToArea() {
        if (width && width < 1024) {
            return;
        }

        const windowHeight = window.innerHeight;
        const headerHeight = document.querySelector('.frontend-header').offsetHeight;
        const bannerElement = document.querySelector('.frontend-banner');
        const { bottom } = bannerElement.getBoundingClientRect();
        const duration = 350;

        const newScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollOptions = {
            duration,
            ignoreCancelEvents: true,
        };

        // if scrolling down and banner in view
        if (newScrollTop > lastScrollTopRef.current && bottom > headerHeight) {
            scroll.scrollTo(windowHeight - headerHeight, scrollOptions);
        }

        // if scrolling up and banner in view
        if (newScrollTop < lastScrollTopRef.current && bottom > headerHeight) {
            scroll.scrollToTop(scrollOptions);
        }

        setLastScrollTop(newScrollTop <= 0 ? 0 : newScrollTop); // For Mobile or negative scrolling
    }

    function setLastScrollTop(value) {
        lastScrollTopRef.current = value;
    }
};

export const useOnScreen = (ref, threshold) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // setIntersecting(entry.isIntersecting);
                setIntersecting(entry.boundingClientRect.y < 76);
            },
            {
                threshold,
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
};

export const useFullPageCarousel = (ref, max = 4) => {
    const currentPage = useRef(0);
    const lastAnimation = useRef(0);
    const quietPeriod = 500;
    const animationTime = 800;

    const handlePrevSlide = () => (currentPage.current = currentPage.current - 1);
    const handleNextSlide = () => (currentPage.current = currentPage.current + 1);

    const handleScroll = event => {
        const delta = Math.sign(event.deltaY);
        const currentTime = new Date().getTime();

        if (Number(currentTime) - Number(lastAnimation.current) < quietPeriod + animationTime) {
            event.preventDefault();
            return;
        }

        if (delta < 0) {
            moveUp();
        } else {
            moveDown();
        }

        lastAnimation.current = currentTime;
    };

    const transformPage = position => {
        const el = ref.current;
        const transformCSS = `transform: translate3d(0, ${position}%, 0); transition: transform ${animationTime}ms ease-in-out;`;
        el.style.cssText = transformCSS;
    };

    const moveUp = (page = currentPage.current) => {
        if (page === 0) return;
        const position = (page - 1) * 100 * -1;
        handlePrevSlide();
        transformPage(position);
    };

    const moveDown = (page = currentPage.current) => {
        if (page === max) return;
        const position = Number((page + 1) * 100 * -1);
        handleNextSlide();
        transformPage(position);
    };

    useEffect(() => {
        const debounced = debounce(handleScroll, 200, {
            leading: true,
            trailing: false,
            maxWait: quietPeriod,
        });

        document.addEventListener('wheel', debounced, { passive: false });

        return () => {
            document.removeEventListener('wheel', debounced, { passive: false });
        };
    }, []);

    return {
        currentPage,
    };
};

export const useEventListener = (eventName, handler, options = {}, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = event => savedHandler.current(event);

        element.addEventListener(eventName, eventListener, options);

        return () => {
            element.removeEventListener(eventName, eventListener, options);
        };
    }, [eventName, element]);
};
