import React from 'react';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import CheckboxContainer from '../../../../shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from '../../../../shared/generic/form/containers/CheckboxListContainer';
import ButtonContainer from '../../../../shared/generic/button/containers/ButtonContainer';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
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
        <BlockButtonWrapper>
            {isFetching ? (
                <button className="button green disabled" disabled>
                    <i className="fa fa-spinner fa-spin"></i> Please wait...
                </button>
            ) : (
                <button type="submit" className="button green">
                    Submit
                </button>
            )}
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default EditSitePinOptionSets;
