import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import fetchPinOptionsDocuments from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocuments';

import {
    selectPinOptionDocumentsArr,
    selectPinOptionDocumentsFetchError,
    selectPinOptionDocumentsIsFetching,
} from 'selectors/companyAdmin/pinOptionsDocuments';
import { selectPinOptionDocumentsVersionsArr } from 'selectors/companyAdmin/pinOptionsDocumentsVersions';
import fetchPinOptionsDocumentsVersions from 'actions/companyAdmin/pinOptionsDocuments/async/fetchPinOptionsDocumentsVersions';

const useFetchPinOptionDocuments = optionID => {
    const dispatch = useDispatch();
    const allDocuments = useSelector(selectPinOptionDocumentsArr);
    const isFetchingDocuments = useSelector(selectPinOptionDocumentsIsFetching);
    const documentsError = useSelector(selectPinOptionDocumentsFetchError);
    const allDocumentsVersions = useSelector(selectPinOptionDocumentsVersionsArr);
    const documents = allDocuments.filter(
        document => document.pinOptionID === parseInt(optionID) && document.isDeleted === false,
    );
    const filteredDocumentsVersions = allDocumentsVersions.filter(docVersion =>
        documents
            ?.sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
            .map(({ id }) => id)
            .includes(docVersion.pinOptionDocumentID),
    );

    const documentsVersions = filteredDocumentsVersions;

    useEffect(() => {
        dispatch(fetchPinOptionsDocuments());
        dispatch(fetchPinOptionsDocumentsVersions());
    }, [dispatch]);

    return {
        documentsVersions,
        documents,
        documentsError,
        isFetchingDocuments,
    };
};

export default useFetchPinOptionDocuments;
