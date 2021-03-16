import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderTrustedByArr } from 'helpers/generic';
import fetchFrontendTrustedBy from 'actions/frontEnd/frontendSite/trustedBySettings/async/fetchAllTrustedBy';
import TrustedBy from '../presentational/TrustedBy';

const TrustedByContainer = () => {
    const dispatch = useDispatch();
    const { error, isFetching, trustedBy } = useSelector(
        ({ frontEnd: { frontendTrustedByReducer } }) => frontendTrustedByReducer,
    );

    useEffect(() => {
        dispatch(fetchFrontendTrustedBy());
    }, []);

    if (isFetching) return <i className="fas fa-loader" />;

    if (!trustedBy || !trustedBy.length) return null;

    if (error) return <div>Error fetching trusted by logos</div>;

    return <TrustedBy data={orderTrustedByArr(trustedBy)} />;
};

export default TrustedByContainer;
