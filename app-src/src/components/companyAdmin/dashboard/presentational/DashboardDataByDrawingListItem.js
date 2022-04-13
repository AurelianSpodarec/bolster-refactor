import React from 'react';
import { useHistory } from 'react-router-dom';

const DrawingDataByDrawingListItem = ({ drawing }) => {
    const history = useHistory();
    return (
        <tr>
            <td>{drawing.name}</td>
            <td>{drawing.pinsUpdated}</td>
            <td>
                <button className="button blue" onClick={generateReport}>
                    Generate Report
                </button>
            </td>
        </tr>
    );

    function generateReport() {
        const statusID = localStorage.getItem('selectedStatus');

        history.push({
            pathname: '/company/tools/create-report',
            state: {
                siteID: drawing.siteID,
                buildingID: drawing.buildingID,
                floorID: drawing.floorID,
                drawingID: drawing.id,
                selectedService: localStorage.getItem('selectedService'),
                selectedStatus: statusID ? [statusID] : [],
                selectedStartDate: localStorage.getItem('selectedStartDate'),
                selectedEndDate: localStorage.getItem('selectedEndDate'),
            },
        });
    }
};

export default DrawingDataByDrawingListItem;
