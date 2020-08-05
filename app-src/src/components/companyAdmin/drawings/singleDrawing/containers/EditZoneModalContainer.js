import React from 'react';
import { connect } from 'react-redux';

import editDrawingZone from 'actions/companyAdmin/zones/async/editDrawingZone';

import DrawingZoneFormModal from '../../addDrawingZoneModal/presentational/DrawingZoneFormModal';
import { useForm } from 'helpers/hooks';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { VIEW_ZONES, ERROR_MODAL } from 'constants/shared/modalTypes';

const EditDrawingsZoneModalContainer = ({
    zone: { id, drawingID, name, colorHex },
    editDrawingZone,
    showModal,
}) => {
    const [formData, handleChange] = useForm({ name, colorHex });

    return (
        <DrawingZoneFormModal
            action="Edit"
            {...formData}
            handleNameChange={handleChange}
            handleColorChange={handleColorChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
        />
    );

    function handleColorChange(e) {
        handleChange('colorHex', e.hex);
    }

    async function handleSubmit() {
        const { success } = await editDrawingZone(drawingID, id, formData);
        console.log({ success });
        if (success) showModal(VIEW_ZONES);
        else showModal(ERROR_MODAL);
    }

    function handleCancel() {
        showModal(VIEW_ZONES);
    }
};

const mapStateToProps = (state) => ({
    coordinates: state.companyAdmin.zonesReducer.zoneFormCoordinates,
});
const mapDispatchToProps = { editDrawingZone, showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDrawingsZoneModalContainer);
