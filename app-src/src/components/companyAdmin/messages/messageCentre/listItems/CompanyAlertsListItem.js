import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { DATE_TIME_IDS, HIERARCHY_LINK_VALUES } from 'constants/companyAdmin/enums';

import dismissCompanyAlert from 'actions/companyAdmin/messageCentre/async/dismissCompanyAlert';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const CompanyAlertsListItem = ({
    message: {
        id,
        name,
        createdOn,
        description,
        hierarchyType,
        hierarchyID,
        hierarchyName,
        createdByUserName,
    },
}) => {
    const dispatch = useDispatch();
    const hierarchyLink = `/company/${HIERARCHY_LINK_VALUES[hierarchyType]}/${hierarchyID}`;

    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{createdByUserName}</h3>

                <div className="date-wrapper">
                    <span className="date">
                        <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
                    </span>
                    <button
                        className="no-background-btn"
                        onClick={() => dispatch(dismissCompanyAlert(id))}
                    >
                        <i className="fas fa-times-circle close-icon" />
                    </button>
                </div>
            </div>

            <div className="content-wrapper">
                <h4>{name}</h4>
                <Link to={hierarchyLink}>{hierarchyName}</Link>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CompanyAlertsListItem;
