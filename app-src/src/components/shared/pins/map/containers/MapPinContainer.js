import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';
import _ from 'lodash';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import updateIsPinExcluded from 'actions/companyAdmin/reports/sync/updateIsPinExcluded';
import clientUpdateIsPinExcluded from 'actions/client/reports/create/sync/clientUpdateIsPinExcluded';

class MapPinContainer extends Component {
    state = {
        showPinInfo: false
    };

    render() {
        const { showPinInfo } = this.state;
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
            isClient,
            tooltipVisible
        } = this.props;
        const { createdByCompanyUserID, latestServiceID } = pin;
        const user = users[createdByCompanyUserID];
        const service = services[latestServiceID];
        const pinImages = this._getPinImages();

        return (
            <MapPin
                tooltipVisible={tooltipVisible}
                urlStart={urlStart}
                pin={pin}
                withLink={withLink}
                user={user}
                service={service}
                withTooltip={withTooltip}
                handleOpenPin={this.handleOpenPin}
                handleCancelPin={this.handleCancelPin}
                pinImages={pinImages}
                isExcluding={isExcluding}
                updateIsPinExcluded={
                    isClient ? clientUpdateIsPinExcluded : updateIsPinExcluded
                }
                excludedPinIDs={excludedPinIDs}
                showPinInfo={showPinInfo}
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
        this.setState({
            showPinInfo: false
        });
    };

    handleOpenPin = id => {
        if (this.props.tooltipVisible) return;

        const { fetchSinglePin, historyIDs, pin, urlStart } = this.props;
        this._waitForHover = setTimeout(() => {
            if (!historyIDs.includes(pin.latestHistoryID + '')) {
                if (urlStart !== 'client') fetchSinglePin(id, true);
            }
            this.props.updateCurTooltip(id);
        }, 150);
    };

    handleCancelPin = () => {
        clearTimeout(this._waitForHover);
        this.props.updateCurTooltip(null);
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
