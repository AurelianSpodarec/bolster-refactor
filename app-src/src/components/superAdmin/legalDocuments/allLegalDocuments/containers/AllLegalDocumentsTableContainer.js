import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchAllLegalDocuments from 'actions/superAdmin/legalDocuments/async/fetchAllLegalDocuments';

import AllLegalDocumentsTable from '../presentational/AllLegalDocumentsTable';

const AllLegalDocumentsTableContainer = () => {
    const dispatch = useDispatch();
    const { legalDocuments, isFetching } = useSelector(
        ({ superAdmin: { legalDocumentsReducer } }) => legalDocumentsReducer,
    );

    useEffect(() => {
        dispatch(fetchAllLegalDocuments());
    }, []);

    return (
        <AllLegalDocumentsTable documents={Object.values(legalDocuments)} isFetching={isFetching} />
    );
};

export default AllLegalDocumentsTableContainer;
