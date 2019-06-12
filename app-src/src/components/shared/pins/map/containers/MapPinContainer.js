import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

class MapPinContainer extends Component {
    state = {
        loadingHover: true
    };
    render() {
        const {
            pin,
            withLink,
            users,
            services,
            withTooltip = false,
            urlStart
        } = this.props;
        const { createdByCompanyUserID, latestServiceID } = pin;
        const user = users[createdByCompanyUserID];
        const service = services[latestServiceID];
        const { loadingHover } = this.state;

        return (
            <MapPin
                urlStart={urlStart}
                pin={pin}
                withLink={withLink}
                user={user}
                service={service}
                withTooltip={withTooltip}
                handleFetchPin={this.handleFetchPin}
                handleCancelFetchPin={this.handleCancelFetchPin}
                loadingHover={loadingHover}
            />
        );
    }

    componentWillUnmount = () => {
        clearTimeout(this._waitForHover);
    };

    handleFetchPin = id => {
        const { fetchSinglePin } = this.props;
        this._waitForHover = setTimeout(() => {
            fetchSinglePin(id);
        }, 500);
    };

    handleCancelFetchPin = () => {
        clearTimeout(this._waitForHover);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users,
    services,
    historyIDs: Object.keys(histories)
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        dispatch(fetchSinglePin(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPinContainer);
