import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const RecoverUserModal = ({ id, userFirstName, userLastName }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Recover User" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to recover the user '
                    {`${userFirstName} ${userLastName}`}'?
                </p>
                <BlockButtonWrapper>
                    <button className="button green">Confirm</button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );

    function handleSubmit() {
        console.log(`recover user id: ${id}`);
    }
};

export default RecoverUserModal;
