import React from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';

const MapPinContainer = ({
    pin,
    withLink,
    users,
    services,
    withTooltip = false,
    urlStart
}) => {
    const { createdByCompanyUserID, latestServiceID } = pin;
    const user = users[createdByCompanyUserID];
    const service = services[latestServiceID];
    return (
        <MapPin
            urlStart={urlStart}
            pin={pin}
            withLink={withLink}
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
