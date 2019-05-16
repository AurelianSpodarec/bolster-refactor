import React from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';

const MapPinContainer = ({
    pin,
    isReport,
    users,
    services,
    withTooltip = false
}) => {
    const { createdByCompanyUserID, latestServiceID } = pin;
    const user = users[createdByCompanyUserID];
    const service = services[latestServiceID];
    return (
        <MapPin
            pin={pin}
            isReport={isReport}
            user={user}
            service={service}
            withTooltip={withTooltip}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services }
    }
}) => ({ users, services });

export default connect(mapStateToProps)(MapPinContainer);
