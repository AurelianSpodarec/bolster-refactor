import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import { set } from 'lodash';

const SuperAdminConfirmRestoreInvoiceModal = ({
    handleDelete,
    hideModal,
    message = 'Are you sure you want to restore this?',
    isDeleting,
    deleteButtonText = 'Delete',
    icon = 'trash-alt',
    deleteSuccess,
}) => {
    const [commentValue, setCommentValue] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Confirm Restore Invoice'} />
            {isDeleting || deleteSuccess ? (
                <div className="size-lg-12">
                    <Loading message="Restoring invoice..." />
                </div>
            ) : (
                <>
                    <p className="generic-text intro-text size-lg-12">{message}</p>
                    <div className="size-lg-12">
                        <FieldOutput
                            title="Comments"
                            fieldClass="comments"
                            description="Please add reason for deleting invoice."
                            sizeClass="size-md-12"
                        >
                            <TextAreaContainer
                                name={commentValue}
                                value={commentValue}
                                handleChange={(name, value) => setCommentValue(value)}
                            />
                            {error && <p className="error-text">{error}</p>}
                        </FieldOutput>
                    </div>

                    <BlockButtonWrapper>
                        <button
                            className="button red"
                            onClick={() => {
                                if (commentValue === '') {
                                    setError('Please fill out comments before deleting invoice.');
                                } else {
                                    handleDelete(commentValue);
                                }
                            }}
                        >
                            <i className={`far fa-${icon} fa-fw`} />
                            {deleteButtonText}
                        </button>
                        <button className="button" onClick={hideModal}>
                            Cancel
                        </button>
                    </BlockButtonWrapper>
                </>
            )}
        </ModalOuterContainer>
    );
};

export default SuperAdminConfirmRestoreInvoiceModal;
