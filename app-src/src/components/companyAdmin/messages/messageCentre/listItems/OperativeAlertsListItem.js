import React from 'react';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const OperativeAlertsListItem = ({
    message: { id, createdByUserFirstName, createdByUserLastName, createdOn, message, sentCount },
}) => {
    const history = useHistory();
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{`${createdByUserFirstName} ${createdByUserLastName}`}</h3>

                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - hh:mm')}</span>
                    <i className="fas fa-times-circle close-icon" />
                </div>
            </div>

            <div className="content-wrapper">
                <div className="metrics-wrapper">
                    <h4>Sent To: {sentCount}</h4>

                    <button
                        className="button rounded"
                        onClick={() =>
                            history.push(`/company/message-centre/operative-alerts/${id}/metrics`)
                        }
                    >
                        Show Metrics
                    </button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default OperativeAlertsListItem;
