import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import { useForm, usePrevious } from 'helpers/hooks';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import editDocumentLibraryFolder from 'actions/companyAdmin/documentLibrary/async/editDocumentLibraryFolder';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const EditDocumentItemsModal = ({ ids }) => {
    const dispatch = useDispatch();
    const [{ 
        isAttachPins, 
        isViewApp 
    }, handleChange] = useForm({ isAttachPins: false, isViewApp: false });

    const isPosting = useSelector(selectIsPosting);
    const error = useSelector(selectError);
    const success = useSelector(selectIsSuccess);

    const handleSubmit = () => {
        const postBody = {
            isAttachPins,
            isViewApp,
            ids,
        };
        dispatch(editDocumentLibraryFolder(postBody));
    };

    const handleCancel = () => {
        dispatch(hideModal());
    };

    const prevSuccess = usePrevious(success);
    useEffect(() => {
        if (!prevSuccess && success) dispatch(showModal(SUCCESS_MODAL, { message: 'Successfully updated library items' }));
    }, [success, prevSuccess]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit items" />
            <Form onSubmit={handleSubmit}>
                <div >
                    <p>Document Use:</p>
                    <div className="checkbox-items">
                        <CheckboxContainer
                            name="isViewApp"
                            checked={isViewApp}
                            text="View in app"
                            handleChange={handleChange}
                        />
                        <CheckboxContainer 
                            name="isAttachPins"
                            checked={isAttachPins}
                            text="Attach to pins"
                            handleChange={handleChange}
                        />
                    </div>
                <p>(if none selected, document is only viewable on desktop)</p>
            </div>
                <BlockButtonWrapper>
                    <button onClick={handleSubmit} 
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        type={isPosting ? 'button' : 'submit'}
                        disabled={isPosting}
                    >
                        {isPosting ? <LoadingIcon /> : 'Submit'}
                    </button>
                    <ButtonContainer handleClick={handleCancel}>Cancel</ButtonContainer>
                </BlockButtonWrapper>
                {!!error && <p className="error">{error}</p>}
            </Form>
        </ModalOuterContainer>
    );
};

const selectIsPosting = state => state.companyAdmin.documentLibraryReducer.isPosting;
const selectError = state => state.companyAdmin.documentLibraryReducer.postError;
const selectIsSuccess = state => state.companyAdmin.documentLibraryReducer.postSuccess;

export default EditDocumentItemsModal;