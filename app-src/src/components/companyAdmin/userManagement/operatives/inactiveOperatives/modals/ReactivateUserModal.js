import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import reactivateCompanyUser from 'actions/companyAdmin/userManagement/async/reactivateCompanyUser';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { usePrevious } from 'helpers/hooks';

const ReactivateUserModal = ({ user, user: { id, userFirstName, userLastName } }) => {
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
            <BlockHeading title="Request Reactivation" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to request reactivation of the user '
                    {`${userFirstName} ${userLastName}`}'?
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
        dispatch(reactivateCompanyUser(id, user));
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

export default ReactivateUserModal;
