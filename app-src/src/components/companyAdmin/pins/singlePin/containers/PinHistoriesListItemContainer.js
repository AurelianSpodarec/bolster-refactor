import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';
import PinHistoriesListItem from '../presentational/PinHistoriesListItem';

class PinHistoriesListItemContainer extends Component {
    render() {
        const {
            history,
            historyCount,
            version,
            users,
            services,
            allHistories
        } = this.props;

        const user = users[history.createdByCompanyUserID];

        const historyVersion =
            [...allHistories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === history.id) + 1;

        return (
            <PinHistoriesListItem
                history={history}
                historyCount={historyCount}
                version={historyVersion}
                selectHistory={this.selectHistory}
                createdBy={user}
                services={services}
            />
        );
    }

    selectHistory = e => {
        const { dispatch, history } = this.props;

        e.preventDefault();
        dispatch(selectPinHistory(history.id));
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users: users,
    services: services,
    allHistories: Object.values(histories)
});

export default connect(mapStateToProps)(PinHistoriesListItemContainer);
