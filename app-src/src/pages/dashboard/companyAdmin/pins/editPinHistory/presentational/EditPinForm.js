import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import EditPinVersionsContainer from '../containers/EditPinVersionsContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditPinForm = ({
    location,
    handleSubmit,
    filesUploading,
    confirmLeave,
    selectedHistory,
    pinOptions,
    drawingID,
}) => {
    const [showFixError, setShowFixError] = useState(false);

    return (
        <Form
            onSubmit={handleSubmit}
            onSubmitError={() => setShowFixError(true)}
            className="generic-form size-lg-12"
        >
            <EditPinVersionsContainer
                templateVersionID={selectedHistory.templateVersionID}
                pinOptions={pinOptions}
                drawingID={drawingID}
            />

            {showFixError && (
                <div className="form-field" style={{ float: 'right', minHeight: 0 }}>
                    <p className="error red-text text-accent-4">
                        Please correct the field errors and try again
                    </p>
                </div>
            )}
            <BlockButtonWrapper>
                <Prompt
                    when={confirmLeave}
                    message={
                        'You will lose any added information, are you sure you would like to leave the page?'
                    }
                />
                <button className="button green" disabled={filesUploading}>
                    {filesUploading ? (
                        'Please wait...'
                    ) : (
                        <>
                            <i className="far fa-pencil fa-fw" />
                            Edit pin
                        </>
                    )}
                </button>
                <ButtonContainer
                    to={location.pathname.replace(`/edit-history/${selectedHistory.id}`, '')}
                >
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    );
};

export default EditPinForm;
