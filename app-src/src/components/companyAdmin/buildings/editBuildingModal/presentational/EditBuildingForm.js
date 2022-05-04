import React from 'react';

import EditBuildingFormFieldsNoLabel from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingFormFieldsNoLabel';
import Form from 'components/shared/generic/form/containers/Form';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const BuildingEditForm = ({ handleSubmit, handleInputChange, hideModal, name, location }) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <EditBuildingFormFieldsNoLabel
            handleInputChange={handleInputChange}
            name={name}
            location={location}
        />

        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text="Confirm" type="submit" icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </Form>
);

export default BuildingEditForm;
