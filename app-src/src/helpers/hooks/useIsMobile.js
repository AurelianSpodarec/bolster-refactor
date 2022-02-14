const { useSelector } = require('react-redux');

const useIsMobile = () => {
    const isMobile = useSelector(
        ({
            shared: {
                mobileReducer: { onMobile },
            },
        }) => onMobile,
    );

    return isMobile;
};
