import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';
import PinHistoriesListItem from '../presentational/PinHistoriesListItem';

class PinHistoriesListItemContainer extends Component {
    render() {
        const { history, historyCount, version, users, services } = this.props;

        const user = users[history.createdByCompanyUserID];

        return (
            <PinHistoriesListItem
                history={history}
                historyCount={historyCount}
                version={version}
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
        servicesReducer: { services }
    }
}) => ({
    users: users,
    services: services
});

export default connect(mapStateToProps)(PinHistoriesListItemContainer);
