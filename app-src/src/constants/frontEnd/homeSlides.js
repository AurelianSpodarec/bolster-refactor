import FirstSlide from '_content/videos/frontend/home1.mp4';
import SecondSlide from '_content/videos/frontend/home2.mp4';
import ThirdSlide from '_content/videos/frontend/home3.mp4';
import FourthSlide from '_content/videos/frontend/home4.mp4';
import FifthSlide from '_content/videos/frontend/home5.mp4';
import PromotionalVideo from '_content/videos/frontend/PromotionalVideo.mp4';

export const HomeSlidesList = [
    {
        title: 'The complete survey, installation & management system',
        description: '',
        buttonText: 'Contact',
        background: FirstSlide,
        backgroundLoop: false,
        fullVideo: PromotionalVideo,
        link: '/contact',
    },
    {
        title: 'Building compliance documentation made easy',
        description: '',
        buttonText: 'Our System',
        background: SecondSlide,
        backgroundLoop: false,
        fullVideo: null,
        link: '/our-system',
    },
    {
        title: 'Traceability, accountability and transparency between you and your client',
        description: '',
        buttonText: 'About us',
        background: ThirdSlide,
        backgroundLoop: false,
        fullVideo: null,
        link: '/about-us',
    },
    {
        title: 'Mobile app and secure cloud-based system',
        description: '',
        buttonText: 'Our System',
        background: FourthSlide,
        backgroundLoop: false,
        fullVideo: null,
        link: '/our-system',
    },
    {
        title: 'Cost effective solution for companies of all sizes',
        description: '',
        buttonText: 'Request a demo',
        background: FifthSlide,
        backgroundLoop: false,
        fullVideo: null,
        link: '/contact',
    },
];
