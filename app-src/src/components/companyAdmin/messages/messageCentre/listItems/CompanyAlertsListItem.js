import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { HIERARCHY_LINK_VALUES } from 'constants/companyAdmin/enums';

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
    const hierarchyLink = `/company/${HIERARCHY_LINK_VALUES[hierarchyType]}/${hierarchyID}`;

    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{createdByUserName}</h3>

                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - hh:mm')}</span>
                    <i className="fas fa-times-circle close-icon" />
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
