import React from 'react';

import ActionMenu from 'components_DEPRECATED/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components_DEPRECATED/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
import CheckboxContainer from 'components_DEPRECATED/shared/generic/form/containers/CheckboxContainer';

const JobReferenceTableItem = ({
    jobReference,
    jobReference: { id, name, description, isDisabled },
    handleEditJobReference,
    handleEnableJobReference,
    handleDisableJobReference,
}) => (
    <tr>
        <td>
            <FlexWrapper justify="start" align="center">
                <CheckboxContainer
                    text={name}
                    name={`job-reference-checkbox-${id}`}
                    checked={!isDisabled}
                    handleChange={(_, value) => {
                        if (value) {
                            handleEnableJobReference(jobReference);
                        } else {
                            handleDisableJobReference(jobReference);
                        }
                    }}
                />
            </FlexWrapper>
        </td>
        <td>{description}</td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton
                        text="Edit"
                        onClick={() => handleEditJobReference(jobReference)}
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default JobReferenceTableItem;
