import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const { history, users, services, drawingID } = this.props;

        const user = users[history.createdByCompanyUserID] || {};

        return (
            <PinHistoryDetailsItem
                history={history}
                createdBy={user}
                services={services}
                drawingID={drawingID}
            />
        );
    }
}

const mapStateToProps = ({
    client: {
        pinOperativesReducer: { users },
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users,
    services,
    allHistories: Object.values(histories)
});

export default connect(mapStateToProps)(PinHistoryDetailsItemContainer);
