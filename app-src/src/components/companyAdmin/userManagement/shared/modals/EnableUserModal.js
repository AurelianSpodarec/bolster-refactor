import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const EnableUserModal = ({ user }) => {
    const isPosting = true;

    return (
        <ModalOuterContainer>
            <BlockHeading title="Enable User" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to enable the user '
                    {`${user.userFirstName} ${user.userLastName}`}'?
                </p>
                <BlockButtonWrapper>
                    <button
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        disabled={isPosting}
                    >
                        {isPosting && <i className="fa fa-spinner fa-spin"></i>}
                        Confirm
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );

    function handleSubmit() {
        console.log('submit...');
    }
};

export default EnableUserModal;
