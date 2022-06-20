import React from 'react';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const JobReferenceTableItem = ({
    jobReference,
    handleEditJobReference,
    handleDeleteJobReference,
}) => (
    <tr>
        <td>{jobReference.name}</td>
        <td>{jobReference.description}</td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton
                        text="Edit"
                        onClick={() => handleEditJobReference(jobReference)}
                    />
                    <ActionMenuActionButton
                        text="Delete"
                        onClick={() => handleDeleteJobReference(jobReference)}
                        isNegative
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default JobReferenceTableItem;
