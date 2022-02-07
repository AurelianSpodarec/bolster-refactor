import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import useViewTaskNote from './hooks/useViewTaskNote';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ViewPinTaskModal = ({ id }) => {
    const { closeModal, isFetching, isPosting, error, pinTask } = useViewTaskNote(id);

    return (
        <ModalOuterContainer extraClasses="view-pin-task-modal">
            <BlockHeading title="Task note" />
            <BlockContainer isFetching={isFetching} isEmpty={!pinTask}>
                <p>{pinTask.note}</p>

                {error && <p className="error">{error}</p>}
                <BlockButtonWrapper>
                    <button
                        type="button"
                        className="button green"
                        onClick={closeModal}
                        disabled={isPosting}
                    >
                        Okay
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </ModalOuterContainer>
    );
};

export default ViewPinTaskModal;
