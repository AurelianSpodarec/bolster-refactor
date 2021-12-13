import React from 'react';

import useHierarchyDrawingExpiry from '../hooks/useHierarchyDrawingExpiry';

import ModalOuterContainer from './ModalOuterContainer';

const DrawingExpiryModal = ({ hideModal, id }) => {
    const { drawings, isFetching, error } = useHierarchyDrawingExpiry(id);
    return <ModalOuterContainer handleClose={hideModal}></ModalOuterContainer>;
};

export default DrawingExpiryModal;
