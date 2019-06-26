import React from 'react';
import { withRouter } from 'react-router-dom';

const DrawingDataByDrawingListItem = ({ drawing, history }) => {
    return (
        <tr>
            <td>{drawing.name}</td>
            <td>{drawing.pinsUpdated}</td>
            <td>
                {/* <button className="button blue" onClick={generateReport}>
                    Generate Report
                </button> */}
            </td>
        </tr>
    );

    function generateReport() {
        //NEEDS TO BE UPDATED ONCE API IS
        history.push({
            pathname: '/company/tools/create-report',
            state: {
                siteID: 4,
                buildingID: 4,
                floorID: 4,
                drawingID: 3
            }
        });
    }
};

export default withRouter(DrawingDataByDrawingListItem);
