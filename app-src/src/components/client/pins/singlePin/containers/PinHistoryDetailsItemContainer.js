import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            historyCount,
            users,
            services,
            allHistories,
            drawingID
        } = this.props;

        const historyVersion =
            [...allHistories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === history.id) + 1;

        const user = users[history.createdByCompanyUserID] || {};

        return (
            <PinHistoryDetailsItem
                history={history}
                historyCount={historyCount}
                version={historyVersion}
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
