import React from 'react';

import EditBuildingFormFieldsWithLabel from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingFormFieldsWithLabel';
import EditBuildingFormFieldsNoLabel from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingFormFieldsNoLabel';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const BuildingEditForm = ({
    handleSubmit,
    handleInputChange,
    handleDateChange,
    hideModal,
    name,
    location,
    isUsingBolsterLabels,
    isAlertShowing,
    alertMessage,
    alertDate
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        {isUsingBolsterLabels ? (
            <EditBuildingFormFieldsWithLabel
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                name={name}
                location={location}
                isAlertShowing={isAlertShowing}
                alertMessage={alertMessage}
                alertDate={alertDate}
            />
        ) : (
            <EditBuildingFormFieldsNoLabel
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                name={name}
                location={location}
                isAlertShowing={isAlertShowing}
                alertMessage={alertMessage}
                alertDate={alertDate}
            />
        )}
        <BlockButtonWrapper>
            <button className="button green">Confirm</button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default BuildingEditForm;
