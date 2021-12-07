import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableCompanyUser from 'actions/companyAdmin/userManagement/async/disableCompanyUser';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const DisableUserModal = ({ user }) => {
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
            <BlockHeading title="Disable User" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to disable the user '
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
        dispatch(disableCompanyUser(user.id, user));
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

export default DisableUserModal;
