import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import PageHeading from '../../pageHeading/presentational/PageHeading';

const PostingErrorModal = ({ message, title }) => {
    return (
        <ModalOuterContainer>
            <PageHeading title={title} />
            <p>{message}</p>
        </ModalOuterContainer>
    );
};

export default PostingErrorModal;
