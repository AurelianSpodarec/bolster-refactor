import React, { useState } from 'react';
import { connect } from 'react-redux';

import createDrawingZone from 'actions/companyAdmin/zones/async/createDrawingZone';

import DrawingZoneFormModal from '../presentational/DrawingZoneFormModal';

const AddDrawingsZoneModalContainer = ({
    hideModal,
    coordinates,
    drawingID,
    createDrawingZone,
    handleCreateZoneFinish,
}) => {
    const [name, updateName] = useState('');
    const [colorHex, updateColorHex] = useState('#ff0000');

    return (
        <DrawingZoneFormModal
            action="Add"
            name={name}
            handleNameChange={handleNameChange}
            colorHex={colorHex}
            handleColorChange={handleColorChange}
            handleSubmit={handleSubmit}
            handleCancel={hideModal}
        />
    );

    function handleNameChange(_, value) {
        updateName(value);
    }

    function handleColorChange(e) {
        updateColorHex(e.hex);
    }

    function handleSubmit() {
        const postBody = {
            name,
            colorHex,
            coordinates: JSON.stringify(coordinates),
        };
        createDrawingZone(drawingID, postBody).then(_handleSubmitEnd);
    }

    function _handleSubmitEnd() {
        hideModal();
        handleCreateZoneFinish();
    }
};

const mapStateToProps = state => ({
    coordinates: state.companyAdmin.zonesReducer.zoneFormCoordinates,
});
const mapDispatchToProps = { createDrawingZone };

export default connect(mapStateToProps, mapDispatchToProps)(AddDrawingsZoneModalContainer);
