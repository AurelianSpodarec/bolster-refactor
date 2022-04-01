import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import dismissOperativeAlert from 'actions/companyAdmin/messageCentre/async/dismissOperativeAlert';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const OperativeAlertsListItem = ({
    message: { id, createdByUserFirstName, createdByUserLastName, createdOn, message, sentCount },
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{`${createdByUserFirstName} ${createdByUserLastName}`}</h3>

                <div className="date-wrapper">
                    <span className="date">
                        <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
                    </span>
                    <button
                        className="no-background-btn"
                        onClick={() => dispatch(dismissOperativeAlert(id))}
                    >
                        <i className="fas fa-times-circle close-icon" />
                    </button>
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
