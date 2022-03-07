import React from 'react';
import { useHistory } from 'react-router-dom';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { NUMBER_OF_HISTORIES_OPTIONS } from '../../../../constants/companyAdmin/enums';

const DrawingDataByOperativeListItem = ({ operative, onMobile, headers }) => {
    const history = useHistory();
    return (
        <tr>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {operative.name}
            </td>
            <td>
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
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {operative.pinsUpdated}
            </td>
            <td>
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
        const statusID = localStorage.getItem('selectedStatus');

        history.push({
            pathname: '/company/tools/create-report',
            state: {
                operativeID: operative.id,
                selectedService: localStorage.getItem('selectedService'),
                selectedStatus: statusID ? [statusID] : [],
                selectedStartDate: localStorage.getItem('selectedStartDate'),
                selectedEndDate: localStorage.getItem('selectedEndDate'),
                reportHistories: NUMBER_OF_HISTORIES_OPTIONS.ALLWHERELATESTINDATERANGE,
            },
        });
    }
};

export default DrawingDataByOperativeListItem;
