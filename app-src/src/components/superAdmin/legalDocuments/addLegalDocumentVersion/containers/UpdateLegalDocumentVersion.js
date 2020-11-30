import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import fetchAllLegalDocuments from 'actions/superAdmin/legalDocuments/async/fetchAllLegalDocuments';
import { isEmpty } from 'helpers/generic';

import AddLegalDocumentVersionContainer from './AddLegalDocumentVersionContainer';
import EditLegalDocumentVersionContainer from './EditLegalDocumentVersionContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const UpdateLegalDocumentVersionContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const { legalDocuments, isFetching, error } = useSelector(
        ({ superAdmin: { legalDocumentsReducer } }) => legalDocumentsReducer,
    );

    useEffect(() => {
        if (isEmpty(legalDocuments) && !isFetching) dispatch(fetchAllLegalDocuments());
    }, []);

    if (isFetching || isEmpty(legalDocuments)) return <BlockContainer isFetching={isFetching} />;

    if (error) return <BlockContainer isFetching={isFetching}>{error}</BlockContainer>;

    if (isEmpty(legalDocuments))
        return <BlockContainer isFetching={isFetching}>No Legal Documents</BlockContainer>;

    return location.pathname.includes('edit') ? (
        <EditLegalDocumentVersionContainer data={legalDocuments[id]} id={id} />
    ) : (
        <AddLegalDocumentVersionContainer data={legalDocuments[id]} />
    );
};

export default UpdateLegalDocumentVersionContainer;
