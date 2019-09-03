import React from 'react';
import { withRouter } from 'react-router-dom';

const DrawingDataByDrawingListItem = ({ drawing, history }) => {
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
                selectedEndDate: localStorage.getItem('selectedEndDate')
            }
        });
    }
};

export default withRouter(DrawingDataByDrawingListItem);
