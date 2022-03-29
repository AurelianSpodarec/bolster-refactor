import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DrawingDataByDrawingListItem = ({ drawing }) => {
    const history = useHistory();
    return (
        <tr>
            <td>{drawing.name}</td>
            <td>{drawing.pinsUpdated}</td>
            <td>
                <ButtonWrapper alignment="right">
                    <ActionButton onClick={generateReport} text="Generate Report" size="small" />
                </ButtonWrapper>
            </td>
        </tr>
    );

    function generateReport() {
        history.push({
            pathname: '/company/tools/create-report',
            state: {
                siteID: drawing.siteID,
                buildingID: drawing.buildingID,
                floorID: drawing.floorID,
                drawingID: drawing.id,
                selectedService: localStorage.getItem('selectedService'),
                selectedStatus: localStorage.getItem('selectedStatus'),
                selectedStartDate: localStorage.getItem('selectedStartDate'),
                selectedEndDate: localStorage.getItem('selectedEndDate'),
            },
        });
    }
};

export default DrawingDataByDrawingListItem;
