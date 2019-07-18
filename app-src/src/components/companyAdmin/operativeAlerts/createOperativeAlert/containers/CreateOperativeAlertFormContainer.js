import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { convertArrToObj } from 'helpers/generic';
import CreateOperativeAlertForm from '../presentational/CreateOperativeAlertForm';
import createOperativeAlert from 'actions/companyAdmin/operativeAlerts/async/createOperativeAlert';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class CreateOperativeAlertContainer extends Component {
    state = {
        message: '',
        operativeIDs: [],
        siteID: 0,
        filterOptionsVal: 0
    };

    render() {
        const { sites } = this.props;

        const allSites = sites.map(site => ({
            value: site.id,
            label: site.name
        }));

        const usersOptions = this._getUserOptions();

        const filterOptions = [
            { value: 0, label: 'All operatives' },
            { value: 1, label: 'Operatives within a site' },
            { value: 2, label: 'Selected operatives' }
        ];

        return (
            <CreateOperativeAlertForm
                {...this.state}
                filterOptions={filterOptions}
                allSites={allSites}
                users={Object.values(usersOptions)}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const { fetchAll } = this.props;

        fetchAll();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/message-centre');
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        const { message, operativeIDs, siteID, filterOptionsVal } = this.state;

        e.preventDefault();

        let postBody = {};
        if (filterOptionsVal === 0) {
            //'All operatives'
            postBody = {
                message: message
            };
        } else if (filterOptionsVal === 1) {
            //'Operatives within a site'

            postBody = {
                message: message,
                siteID: siteID
            };
        } else {
            //'Selected operatives'
            postBody = {
                message: message,
                operativeIDs: operativeIDs
            };
        }

        this.props.createOperativeAlert(postBody, filterOptionsVal);
    };

    _getUserOptions = () => {
        const { users } = this.props;
        const options = users.map(
            ({ id, userFirstName, userLastName, userEmail }) => ({
                value: id,
                text: `${userFirstName} ${userLastName} <${userEmail}>`,
                label: `${userFirstName} ${userLastName} <${userEmail}>`
            })
        );
        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        operativeAlertsReducer: { postSuccess },
        sitesReducer: { sites },
        companyUsersReducer: { users }
    }
}) => ({
    postSuccess,
    sites: Object.values(sites) || {},
    users: Object.values(users)
});

const mapDispatchToProps = dispatch => ({
    createOperativeAlert: (postBody, filterOptionsVal) => {
        dispatch(createOperativeAlert(postBody, filterOptionsVal));
    },
    fetchAll: () => {
        dispatch(fetchAllSites());
        dispatch(fetchCompanyUsers());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateOperativeAlertContainer)
);
