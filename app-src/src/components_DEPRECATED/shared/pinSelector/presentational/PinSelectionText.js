import { useSelector } from 'react-redux';

const PinSelectionText = ({ pinID, pinCode }) => {
    const { drawingID, drawings, pins } = useSelector(mapStateToProps);
    const fullPin = pins[pinID] || {};
    const drawing = drawings[fullPin.drawingID];
    const showDrawingName = Array.isArray(drawingID) && drawing && drawingID.length > 1;

    return `${showDrawingName ? `${drawing.name} / ` : ''}${pinCode}`;
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

export default PinSelectionText;
