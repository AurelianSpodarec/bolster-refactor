import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import {
    selectPinOptionDocumentsArr,
    selectPinOptionDocumentsFetchError,
    selectPinOptionDocumentsIsFetching,
} from '../../../../../../selectors/superAdmin/pinOptionsDocuments';
import { selectPinOptionDocumentsVersionsArr } from '../../../../../../selectors/superAdmin/pinOptionsDocumentsVersions';

import fetchPinOptionsDocuments from '../../../../../../actions/superAdmin/pinOptionsDocuments/async/fetchPinOptionsDocuments';
import fetchPinOptionsDocumentsVersions from '../../../../../../actions/superAdmin/pinOptionsDocuments/async/fetchPinOptionsDocumentsVersions';

const useFetchPinOptionDocuments = () => {
    const dispatch = useDispatch();
    const allDocuments = useSelector(selectPinOptionDocumentsArr);
    const isFetchingDocuments = useSelector(selectPinOptionDocumentsIsFetching);
    const documentsError = useSelector(selectPinOptionDocumentsFetchError);
    const allDocumentsVersions = useSelector(selectPinOptionDocumentsVersionsArr);

    useEffect(() => {
        batch(() => {
            dispatch(fetchPinOptionsDocuments());
            dispatch(fetchPinOptionsDocumentsVersions());
        });
    }, [dispatch]);

    return {
        allDocumentsVersions,
        allDocuments,
        documentsError,
        isFetchingDocuments,
    };
};

export default useFetchPinOptionDocuments;
