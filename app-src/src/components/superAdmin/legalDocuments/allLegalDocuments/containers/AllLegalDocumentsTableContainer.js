import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import fetchAllLegalDocuments from 'actions/superAdmin/legalDocuments/async/fetchAllLegalDocuments';

import AllLegalDocumentsTable from '../presentational/AllLegalDocumentsTable';

const AllLegalDocumentsTableContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { legalDocuments, isFetching } = useSelector(
        ({ superAdmin: { legalDocumentsReducer } }) => legalDocumentsReducer,
    );

    const goToNewLegalDocument = () => history.push('/admin/legal-documents/new');

    useEffect(() => {
        dispatch(fetchAllLegalDocuments());
    }, []);

    return (
        <AllLegalDocumentsTable
            documents={Object.values(legalDocuments)}
            isFetching={isFetching}
            createDocument={goToNewLegalDocument}
        />
    );
};

export default AllLegalDocumentsTableContainer;
