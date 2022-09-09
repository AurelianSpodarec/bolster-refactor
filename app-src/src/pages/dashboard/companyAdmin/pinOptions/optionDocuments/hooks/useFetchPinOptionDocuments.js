import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionsDocuments from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocuments';

import {
    selectPinOptionDocumentsArr,
    selectPinOptionDocumentsFetchError,
    selectPinOptionDocumentsIsFetching,
} from 'selectors/companyAdmin/pinOptionsDocuments';
import { selectPinOptionDocumentsVersionsArr } from 'selectors/companyAdmin/pinOptionsDocumentsVersions';
import fetchPinOptionsDocumentsVersions from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocumentsVersions';

const useFetchPinOptionDocuments = () => {
    const dispatch = useDispatch();
    const allDocuments = useSelector(selectPinOptionDocumentsArr);
    const isFetchingDocuments = useSelector(selectPinOptionDocumentsIsFetching);
    const documentsError = useSelector(selectPinOptionDocumentsFetchError);
    const allDocumentsVersions = useSelector(selectPinOptionDocumentsVersionsArr);

    useEffect(() => {
        dispatch(fetchPinOptionsDocuments());
        dispatch(fetchPinOptionsDocumentsVersions());
    }, [dispatch]);

    return {
        allDocumentsVersions,
        allDocuments,
        documentsError,
        isFetchingDocuments,
    };
};

export default useFetchPinOptionDocuments;
