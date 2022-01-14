import { useSelector, useDispatch } from 'react-redux';

const useFetchCompanyAlerts = () => {
    const isFetching = useSelector();
    const messages = useSelector();
    const error = useSelector();
};

export default useFetchCompanyAlerts;
