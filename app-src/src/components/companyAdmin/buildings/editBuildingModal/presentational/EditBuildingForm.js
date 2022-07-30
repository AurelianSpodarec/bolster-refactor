import React from 'react';

import EditBuildingFormFieldsNoLabel from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingFormFieldsNoLabel';
import Form from 'components/shared/generic/form/containers/Form';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const BuildingEditForm = ({ handleSubmit, handleInputChange, hideModal, name, location }) => (
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container size-lg-12">
                <EditBuildingFormFieldsNoLabel
                    handleInputChange={handleInputChange}
                    name={name}
                    location={location}
                />
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
            <ActionButton text="Confirm" type="submit" icon="check" size="small" />
        </ButtonWrapper>
    </Form>
);

export default BuildingEditForm;
