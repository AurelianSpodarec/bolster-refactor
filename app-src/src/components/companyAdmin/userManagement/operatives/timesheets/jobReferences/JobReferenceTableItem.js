import React from 'react';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const JobReferenceTableItem = ({
    jobReference,
    jobReference: { id, name, description, isDisabled },
    handleEditJobReference,
    handleEnableJobReference,
    handleDisableJobReference,
    isJobRefDropdownEnabled,
}) => (
    <tr>
        <td>
            <FlexWrapper justify="start" align="center">
                {isJobRefDropdownEnabled ? (
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
                ) : (
                    name
                )}
            </FlexWrapper>
        </td>
        <td>{description}</td>
        <td>
            {isJobRefDropdownEnabled && (
                <ButtonWrapper alignment="right">
                    <ActionMenu>
                        <ActionMenuActionButton
                            text="Edit"
                            onClick={() => handleEditJobReference(jobReference)}
                        />
                    </ActionMenu>
                </ButtonWrapper>
            )}
        </td>
    </tr>
);

export default JobReferenceTableItem;
