import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

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

export const useOnScreen = ref => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.boundingClientRect.y < 76);
        });

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
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

export const useFullPageCarousel = (ref, lastRef, isMobile, max = 4) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPage = useRef(0);
    const lastAnimation = useRef(0);
    const disableScroll = useRef(false);
    const prevScroll = useRef(0);
    const quietPeriod = 500;
    const animationTime = 800;
    const isLast = currentIndex === max;

    const handlePrevSlide = () => {
        setCurrentIndex(prevState => prevState - 1);
        currentPage.current = currentPage.current - 1;
    };
    const handleNextSlide = () => {
        setCurrentIndex(prevState => prevState + 1);
        currentPage.current = currentPage.current + 1;
    };
    const handleJumpToSlide = index => {
        setCurrentIndex(index);
        currentPage.current = index;
    };

    const handleScroll = event => {
        if (disableScroll.current || isMobile) return;

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

    const handleClick = index => moveTo(index);

    const transformPage = position => {
        disableScroll.current = true;
        const el = ref.current;
        const transformCSS = `transform: translate3d(0, ${position}%, 0); transition: transform ${animationTime}ms ease-in-out; -webkit-backface-visibility: hidden; backface-visibility: hidden;`;
        el.style.cssText = transformCSS;
        setTimeout(() => {
            disableScroll.current = false;
        }, 1500);
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

    const moveTo = index => {
        const position = Number(index * 100 * -1);
        handleJumpToSlide(index);
        transformPage(position);
    };

    const handleLastSlideScroll = event => {
        if (disableScroll.current) return;

        if (prevScroll.current === 0) {
            const delta = Math.sign(event.deltaY);
            if (delta < 0 && lastRef.current.scrollTop === 0) {
                disableScroll.current = true;
                moveUp();
                setTimeout(() => {
                    disableScroll.current = false;
                }, 2000);
            }
        }
        setTimeout(() => {
            if (lastRef.current) {
                prevScroll.current = lastRef.current.scrollTop;
            }
        }, 200);
    };

    useEffect(() => {
        if (isMobile !== undefined && !isMobile) {
            document.removeEventListener('wheel', handleLastSlideScroll, { passive: false });
            document.addEventListener('wheel', handleScroll, { passive: false });
            document.getElementById('carouselControls').style.display = 'flex';
            document.getElementById('carouselControlsLast').style.display = 'none';

            if (isLast) {
                document.removeEventListener('wheel', handleScroll, { passive: false });
                document.addEventListener('wheel', handleLastSlideScroll, { passive: false });
                setTimeout(() => {
                    if (document) {
                        document.getElementById('carouselControls').style.display = 'none';
                        document.getElementById('carouselControlsLast').style.display = 'flex';
                    }
                }, 800);
            }
        }

        return () => {
            document.removeEventListener('wheel', handleScroll, { passive: false });
            document.removeEventListener('wheel', handleLastSlideScroll, { passive: false });
        };
    }, [isMobile, isLast]);

    return {
        currentIndex,
        max,
        handleClick,
    };
};

export const useLockOnModal = () => {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = originalStyle);
    }, []);
};
