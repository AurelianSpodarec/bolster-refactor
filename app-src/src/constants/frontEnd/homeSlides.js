import FirstSlide from 'assets/videos/frontend/home1.mp4';
import SecondSlide from 'assets/videos/frontend/home2.mp4';
import ThirdSlide from 'assets/videos/frontend/home3.mp4';
import FourthSlide from 'assets/videos/frontend/home4.mp4';
import FifthSlide from 'assets/videos/frontend/home5.mp4';
import FirstPoster from 'assets/videos/frontend/posters/home1.jpg';
import SecondPoster from 'assets/videos/frontend/posters/home2.jpg';
import ThirdPoster from 'assets/videos/frontend/posters/home3.jpg';
import FourthPoster from 'assets/videos/frontend/posters/home4.jpg';
import FifthPoster from 'assets/videos/frontend/posters/home5.jpg';
import PromotionalVideo from 'assets/videos/frontend/PromotionalVideo.mp4';

export const HomeSlidesList = [
    {
        title: 'The complete survey, installation & management system',
        description: '',
        buttonText: 'Contact',
        background: FirstSlide,
        poster: FirstPoster,
        desktopBackgroundLoop: false,
        mobileBackgroundLoop: false,
        fullVideo: PromotionalVideo,
        link: '/contact',
    },
    {
        title: 'Building compliance documentation made easy',
        description: '',
        buttonText: 'About us',
        background: SecondSlide,
        poster: SecondPoster,
        desktopBackgroundLoop: false,
        mobileBackgroundLoop: true,
        fullVideo: null,
        link: '/about-us',
    },
    {
        title: 'Traceability, accountability and transparency between you and your client',
        description: '',
        buttonText: 'Our system',
        background: ThirdSlide,
        poster: ThirdPoster,
        desktopBackgroundLoop: false,
        mobileBackgroundLoop: true,
        fullVideo: null,
        link: '/our-system',
    },
    {
        title: 'Mobile app and secure cloud-based system',
        description: '',
        buttonText: 'How it works',
        background: FourthSlide,
        poster: FourthPoster,
        desktopBackgroundLoop: false,
        mobileBackgroundLoop: true,
        fullVideo: null,
        link: '/how-it-works',
    },
    {
        title: 'Cost effective solution for companies of all sizes',
        description: '',
        buttonText: 'Contact',
        background: FifthSlide,
        poster: FifthPoster,
        desktopBackgroundLoop: false,
        mobileBackgroundLoop: true,
        fullVideo: null,
        link: '/contact',
    },
];
