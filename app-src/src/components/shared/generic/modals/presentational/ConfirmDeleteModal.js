import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

export default function ConfirmDeleteModal() {
    return (
        <ModalOuterContainer>
            <BlockHeadingWControls title="Confirm delete" />
            <BlockButtonWrapper>
                <button className="button">Save</button>
                <button className="button">
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
}
