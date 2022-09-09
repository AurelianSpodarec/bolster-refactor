import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import enableCompanyUser from 'actions/companyAdmin/userManagement/async/enableCompanyUser';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const EnableUserModal = ({ user }) => {
    const dispatch = useDispatch();
    const { isPosting, postError, postSuccess } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ isPosting });

    useEffect(() => {
        if (prevProps.isPosting && !isPosting && postSuccess) {
            dispatch(hideModal());
        }

        if (prevProps.isPosting && !isPosting && postError) {
            dispatch(showModal(ERROR_MODAL));
        }
    }, [isPosting]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Enable User" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to enable the user '
                    {`${user.userFirstName} ${user.userLastName}`}'?
                </p>
                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            size="small"
                            source="secondary"
                            onClick={() => dispatch(hideModal())}
                        />
                        <ActionButton
                            text="Confirm"
                            size="small"
                            icon={isPosting ? 'spinner' : 'check'}
                            iconSpin={isPosting}
                            type="submit"
                            disabled={isPosting}
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );

    function handleSubmit() {
        dispatch(enableCompanyUser(user.id, user));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { isPosting, postError, postSuccess },
    },
}) => ({
    isPosting,
    postError,
    postSuccess,
});

export default EnableUserModal;
