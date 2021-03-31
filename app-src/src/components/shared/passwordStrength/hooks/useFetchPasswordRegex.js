import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPasswordRegex from 'actions/shared/auth/async/fetchPasswordRegex';
import { isEmpty } from 'helpers/generic';

const useFetchPasswordRegex = () => {
    const dispatch = useDispatch();
    const { passwordRegex, isFetching, error } = useSelector(mapStateToProps);

    useEffect(() => {
        if (isEmpty(passwordRegex) || isFetching) {
            dispatch(fetchPasswordRegex());
        }
    }, [dispatch]);

    return { isFetching, error };
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
