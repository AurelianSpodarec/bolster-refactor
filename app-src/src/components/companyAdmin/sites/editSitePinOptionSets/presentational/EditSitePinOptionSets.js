import React from 'react';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import CheckboxContainer from '../../../../shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from '../../../../shared/generic/form/containers/CheckboxListContainer';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const EditSitePinOptionSets = ({
    handlePinOptionSetChange,
    handlePinOptionTypeChange,
    selectedPinOptionSets,
    selectedPinOptionTypes,
    types,
    isFetching,
    typeSets,
    hideModal,
    handleSubmit,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container size-lg-12">
                {types.map(type => {
                    const sets = typeSets[type.id] ?? [];
                    const options = sets.map(set => ({
                        text: set.name,
                        value: set.id,
                    }));
                    const isSelected = selectedPinOptionTypes[type.id];
                    return (
                        <React.Fragment key={type.id}>
                            <Field
                                labelClasses="no-capitalise"
                                name={`Set ${type.namePlural} for site?`}
                                key={type.id}
                            >
                                <CheckboxContainer
                                    name={type.id}
                                    checked={selectedPinOptionTypes[type.id]}
                                    handleChange={handlePinOptionTypeChange}
                                    label={`Set ${type.namePlural} for site?`}
                                    labelClasses="no-capitalise"
                                />
                            </Field>
                            {isSelected && (
                                <Field name={type.namePlural}>
                                    <CheckboxListContainer
                                        name={type.id}
                                        isNumberValues
                                        text=""
                                        handleChange={handlePinOptionSetChange}
                                        options={options}
                                        selectedOptions={selectedPinOptionSets[type.id] ?? []}
                                    />
                                </Field>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton source="secondary" text="Cancel" onClick={hideModal} />
            <ActionButton
                type="submit"
                text={isFetching ? 'Please wait...' : 'Confirm'}
                icon={isFetching ? 'spinner' : 'check'}
                disabled={isFetching}
                iconSpin={isFetching}
            />
        </ButtonWrapper>
    </Form>
);

export default EditSitePinOptionSets;
