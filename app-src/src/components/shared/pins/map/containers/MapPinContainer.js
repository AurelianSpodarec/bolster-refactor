import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapPin from '../presentational/MapPin';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

class MapPinContainer extends Component {
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
        // const { loadingHover } = this.state;
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
                // loadingHover={loadingHover}
                pinImages={pinImages}
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
        const { fetchSinglePin, historyIDs, pin } = this.props;
        this._waitForHover = setTimeout(() => {
            if (!historyIDs.includes(pin.latestHistoryID + '')) {
                fetchSinglePin(id, true);
            } else {
                // this.setState({ loadingHover: false });
            }
        }, 500);
    };

    handleCancelFetchPin = () => {
        clearTimeout(this._waitForHover);
        // this.setState({ loadingHover: true });
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

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        pinsReducer: { isFetching },
        servicesReducer: { services },
        pinHistoriesReducer: { histories },
        pinAnswersReducer: { answers }
    }
}) => ({
    isFetching,
    users,
    services,
    historyIDs: Object.keys(histories),
    answers: Object.values(answers)
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: (id, isForDrawing) => {
        dispatch(fetchSinglePin(id, isForDrawing));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPinContainer);
