import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinOptionDocuments,
    selectPinOptionDocumentsFetchError,
    selectPinOptionDocumentsIsFetching,
} from 'selectors/companyAdmin/pinOptionsDocuments';
import fetchPinOptionsDocuments from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocuments';

const useFetchDocuments = optionID => {
    const dispatch = useDispatch();
    const documents = useSelector(selectPinOptionDocuments);
    const isFetchingDocuments = useSelector(selectPinOptionDocumentsIsFetching);
    const documentsError = useSelector(selectPinOptionDocumentsFetchError);

    useEffect(() => {
        dispatch(fetchPinOptionsDocuments(optionID));
    }, [dispatch]);

    return { documents, isFetchingDocuments, documentsError };
};

export default useFetchDocuments;
