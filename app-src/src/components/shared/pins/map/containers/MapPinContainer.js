import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import updateIsPinExcluded from 'actions/companyAdmin/reports/sync/updateIsPinExcluded';
import clientUpdateIsPinExcluded from 'actions/client/reports/create/sync/clientUpdateIsPinExcluded';

class MapPinContainer extends Component {
    render() {
        const {
            pin,
            withLink,
            users,
            services,
            withTooltip = false,
            urlStart,
            isExcluding,
            updateIsPinExcluded,
            clientUpdateIsPinExcluded,
            excludedPinIDs,
            isClient
        } = this.props;
        const { createdByCompanyUserID, latestServiceID } = pin;
        const user = users[createdByCompanyUserID];
        const service = services[latestServiceID];
        const pinImages = this._getPinImages();

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
                pinImages={pinImages}
                isExcluding={isExcluding}
                updateIsPinExcluded={
                    isClient ? clientUpdateIsPinExcluded : updateIsPinExcluded
                }
                excludedPinIDs={excludedPinIDs}
            />
        );
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isFetching && !this.props.isFetching) {
            this.setState({ loadingHover: false });
        }
    };
    componentWillUnmount = () => {
        clearTimeout(this._waitForHover);
    };

    handleFetchPin = id => {
        const { fetchSinglePin, historyIDs, pin, urlStart } = this.props;
        this._waitForHover = setTimeout(() => {
            if (!historyIDs.includes(pin.latestHistoryID + '')) {
                if (urlStart !== 'client') fetchSinglePin(id, true);
            }
        }, 200);
    };

    handleCancelFetchPin = () => {
        clearTimeout(this._waitForHover);
    };

    _getPinImages = () => {
        const {
            pin: { latestHistoryID },
            answers
        } = this.props;
        return answers.reduce((acc, answer) => {
            if (
                answer.pinHistoryID === latestHistoryID &&
                /(.jpg|.png)$/.test(answer.answer)
            ) {
                return acc.concat(answer.answer);
            }
            return acc;
        }, []);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            companyUsersReducer: { users },
            pinsReducer: { isFetching },
            servicesReducer: { services },
            pinHistoriesReducer: { histories },
            pinAnswersReducer: { answers }
        },
        companyAdmin,
        client
    },
    { isClient }
) => {
    const reducer = isClient ? client : companyAdmin;
    return {
        isFetching,
        users,
        services,
        historyIDs: Object.keys(histories),
        answers: Object.values(answers),
        excludedPinIDs: Object.values(reducer.reportsReducer.excludedPinIDs)
    };
};

const mapDispatchToProps = {
    fetchSinglePin,
    updateIsPinExcluded,
    clientUpdateIsPinExcluded
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPinContainer);
