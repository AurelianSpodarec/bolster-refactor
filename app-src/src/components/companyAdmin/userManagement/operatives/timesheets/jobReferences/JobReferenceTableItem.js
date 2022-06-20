import React from 'react';
import { useDispatch } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_JOB_REFERENCE, EDIT_JOB_REFERENCE } from 'constants/shared/modalTypes';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const JobReferenceTableItem = ({ jobReference }) => {
    const dispatch = useDispatch();

    return (
        <tr>
            <td>{jobReference.name}</td>
            <td>{jobReference.description}</td>
            <td>
                <ButtonWrapper alignment="right">
                    <ActionMenu>
                        <ActionMenuActionButton
                            text="Edit"
                            onClick={() =>
                                dispatch(showModal(EDIT_JOB_REFERENCE, { jobReference }))
                            }
                        />
                        <ActionMenuActionButton
                            text="Delete"
                            onClick={() =>
                                dispatch(showModal(DELETE_JOB_REFERENCE, { id: jobReference.id }))
                            }
                            isNegative
                        />
                    </ActionMenu>
                </ButtonWrapper>
            </td>
        </tr>
    );
};

export default JobReferenceTableItem;
