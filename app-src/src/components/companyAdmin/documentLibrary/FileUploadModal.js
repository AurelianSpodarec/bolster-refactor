import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './FileUpload.scss';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FileUpload from './FileUpload';

const FileUploadModal = ({
    error,
    handleHideModal,
}) => {
    console.log('hihihihi');
    return (
        <ModalOuterContainer>
            <BlockHeading>Upload files</BlockHeading>
            <FileUpload />
            <BlockButtonWrapper>
                <button type="submit" className="button green">
                    <i className="fa fa-save" />
                    Upload
                </button>
                <ButtonContainer handleClick={handleHideModal}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default FileUploadModal;

// /documentlibrary/:companyid/
