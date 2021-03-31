import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPasswordRegex from 'actions/shared/auth/async/fetchPasswordRegex';

const useFetchPasswordRegex = () => {
    const dispatch = useDispatch();
    const { passwordRegex, isFetching, error } = useSelector(mapStateToProps);

    useEffect(() => {
        dispatch(fetchPasswordRegex());
    }, [dispatch]);

    return { passwordRegex, isFetching, error };
};

const mapStateToProps = ({
    shared: {
        passwordRegexReducer: { passwordRegex, isFetching, error },
    },
}) => ({
    passwordRegex,
    isFetching,
    error,
});

export default useFetchPasswordRegex;
