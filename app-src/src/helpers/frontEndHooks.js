import { useRef, useEffect } from 'react';
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
        const bannerElement = document.querySelector('.banner');
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
