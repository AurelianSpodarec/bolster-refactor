import React from 'react';
import { withRouter } from 'react-router-dom';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingDataByOperativeListItem = ({ operative, history, onMobile, headers }) => {
    return (
        <tr>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {operative.name}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {operative.lastLogin ? (
                    <DateTimeContainer format="DD-MM-YYYY HH:mm" date={operative.lastLogin} />
                ) : (
                    'Not logged in'
                )}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {operative.lastSync ? (
                    <DateTimeContainer format="DD-MM-YYYY HH:mm" date={operative.lastSync} />
                ) : (
                    'Not synced'
                )}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {operative.pinsUpdated}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">Actions</span>}
                <button
                    className={`button blue ${operative.isInvited ? 'disabled' : ''}`}
                    onClick={generateReport}
                    disabled={operative.isInvited}
                >
                    Generate Report
                </button>
            </td>
        </tr>
    );

    function generateReport() {
        history.push({
            pathname: '/company/tools/create-report',
            state: {
                operativeID: operative.id,
                selectedService: localStorage.getItem('selectedService'),
                selectedStatus: localStorage.getItem('selectedStatus'),
                selectedStartDate: localStorage.getItem('selectedStartDate'),
                selectedEndDate: localStorage.getItem('selectedEndDate'),
            },
        });
    }
};

export default withRouter(DrawingDataByOperativeListItem);
