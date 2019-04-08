import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PinHistoriesList from '../presentational/PinHistoriesList';
import PinHistoriesActions from '../presentational/PinHistoriesActions';

class PinHistoriesListContainer extends Component {
    render() {
        return (
            <>
                <PinHistoriesActions location={this.props.location} />
                <PinHistoriesList
                    histories={this.props.histories.filter(
                        hist => hist.id !== this.props.selectedHistoryId
                    )}
                    historyCount={this.props.histories.length}
                />
            </>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { pinsReducer } }, { match }) => {
    const pin = pinsReducer.pins[match.params.id];

    return {
        isFetching: pinsReducer.isFetching,
        error: pinsReducer.error,
        histories: Object.values(pin.histories),
        selectedHistoryId: pin.pin.latestHistoryID
    };
};

export default withRouter(connect(mapStateToProps)(PinHistoriesListContainer));
