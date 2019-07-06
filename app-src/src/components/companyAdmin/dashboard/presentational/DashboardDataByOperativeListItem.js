import React from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

const DrawingDataByOperativeListItem = ({
    operative,
    history,
    onMobile,
    headers
}) => {
    return (
        <tr>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {operative.name}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {operative.lastLogin
                    ? moment(operative.lastLogin).format('DD-MM-YYYY HH:mm')
                    : 'Not logged in'}
            </td>
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                {operative.lastSync
                    ? moment(operative.lastSync).format('DD-MM-YYYY HH:mm')
                    : 'Not synced'}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[3]}</span>
                )}
                {operative.pinsUpdated}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">Actions</span>
                )}
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
                operativeID: operative.id
            }
        });
    }
};

export default withRouter(DrawingDataByOperativeListItem);
