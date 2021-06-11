import React from 'react';
import { useSelector } from 'react-redux';

const SelectorPinItem = ({
    pin,
    handlePinClick,
    active,
    handleMouseDown,
    handleMouseUp,
    clicking,
    pinsList,
}) => {
    const { drawingID, drawings, pins } = useSelector(mapStateToProps);
    const fullPin = pins[pin.value] || {};
    const drawing = drawings[fullPin.drawingID];
    const showDrawingName = Array.isArray(drawingID) && drawingID.length > 1;

    return (
        <div
            // onClick={e => handlePinClick(e, pin.value)}
            className={`selector-pin ${active ? 'active' : ''}`}
            onMouseDown={e => {
                handlePinClick(e, pin.value, pinsList);
                handleMouseDown();
            }}
            onMouseUp={handleMouseUp}
            onMouseOver={clicking ? e => handlePinClick(e, pin.value) : null}
        >
            {showDrawingName ? `${drawing.name} / ` : ''}
            {pin.text}
        </div>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { drawings },
        pinsReducer: { pins },
        reportsReducer: {
            filters: { drawingID },
        },
    },
}) => ({
    drawingID,
    drawings,
    pins,
});

export default SelectorPinItem;
