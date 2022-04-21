import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionsDocuments from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocuments';

import {
    selectPinOptionDocumentsArr,
    selectPinOptionDocumentsFetchError,
    selectPinOptionDocumentsIsFetching,
} from 'selectors/companyAdmin/pinOptionsDocuments';
import { selectPinOptionDocumentsVersions } from 'selectors/companyAdmin/pinOptionsDocumentsVersions';
import fetchPinOptionsDocumentsVersions from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocumentsVersions';

const useFetchPinOptionDocuments = optionID => {
    const dispatch = useDispatch();
    const allDocuments = useSelector(selectPinOptionDocumentsArr);
    const isFetchingDocuments = useSelector(selectPinOptionDocumentsIsFetching);
    const documentsError = useSelector(selectPinOptionDocumentsFetchError);
    const documentsVersions = useSelector(selectPinOptionDocumentsVersions);

    useEffect(() => {
        dispatch(fetchPinOptionsDocuments(optionID));
        dispatch(fetchPinOptionsDocumentsVersions(optionID));
    }, [dispatch]);

    return { allDocuments, documentsVersions, documentsError, isFetchingDocuments };
};

export default useFetchPinOptionDocuments;
