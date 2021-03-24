import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
                    <ButtonContainer type="submit">Submit</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );

    function handleSubmit() {
        console.log(`recover user id: ${id}`);
    }
};

export default RecoverUserModal;
