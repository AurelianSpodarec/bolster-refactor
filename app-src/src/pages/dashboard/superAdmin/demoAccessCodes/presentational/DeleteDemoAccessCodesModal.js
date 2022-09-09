import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import deleteDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/deleteDemoAccessCodes';
import { useDispatch } from 'react-redux';
import disableDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/disableDemoAccessCodes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import enableDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/enableDemoAccessCodes';

const DeleteDemoAccessCodesModal = ({ item, disable }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (disable) {
            if (item.isDisabled) {
                dispatch(enableDemoAccessCodes(item.id));
            } else {
                dispatch(disableDemoAccessCodes(item.id));
            }
        } else {
            dispatch(deleteDemoAccessCodes(item.id));
        }

        dispatch(hideModal());
    };

    return (
        <ModalOuterContainer extraClasses="demo-access-codes">
            <BlockHeading title="Access Code" />
            <p className="">Please confirm this action for this access code: {item.accessCode}.</p>
            <BlockButtonWrapper>
                {disable && (
                    <button
                        onClick={handleDelete}
                        className={`button ${!item.isDisabled ? 'red' : 'green'}`}
                    >
                        <i className={`far fa-${!item.isDisabled ? 'eye-slash' : 'eye'}`} />
                        {!item.isDisabled ? 'Disable' : 'Enable'}
                    </button>
                )}
                {!disable && (
                    <button onClick={handleDelete} className="button red">
                        <i className={'far fa-trash'} />
                        Delete
                    </button>
                )}
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DeleteDemoAccessCodesModal;
