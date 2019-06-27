import React from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

const DrawingDataByOperativeListItem = ({ operative, history }) => {
    return (
        <tr>
            <td>{operative.name}</td>
            <td>
                {operative.lastLogin
                    ? moment(operative.lastLogin).format('DD-MM-YYYY HH:mm')
                    : 'Not logged in'}
            </td>
            <td>
                {operative.lastSync
                    ? moment(operative.lastSync).format('DD-MM-YYYY HH:mm')
                    : 'Not synced'}
            </td>
            <td>{operative.pinsUpdated}</td>
            <td>
                {/* <button className="button blue" onClick={generateReport}>
                    Generate Report
                </button> */}
            </td>
        </tr>
    );

    // function generateReport() {
    //     //NEEDS TO BE UPDATED ONCE API IS
    //     history.push({
    //         pathname: '/company/tools/create-report',
    //         state: {
    //             operativeID: 6
    //         }
    //     });
    // }
};

export default withRouter(DrawingDataByOperativeListItem);
