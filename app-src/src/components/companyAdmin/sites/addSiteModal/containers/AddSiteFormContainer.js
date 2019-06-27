import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddSiteForm from '../presentational/AddSiteForm';
import createSite from 'actions/companyAdmin/sites/async/createSite';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class AddSiteFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        isAlertShowing: false,
        alertMessage: '',
        alertDate: null
    };

    render() {
        const { isUsingBolsterLabels } = this.props;
        return (
            <AddSiteForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                isUsingBolsterLabels={isUsingBolsterLabels}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedSiteID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({
            alertDate: date
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createSite } = this.props;
        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode
        } = this.state;

        const postBody = {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode
        };

        createSite(postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels }
        }
    }
}) => ({
    isUsingBolsterLabels,
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    updatedSiteID: sitesReducer.updatedSiteID
});

const mapDispatchToProps = dispatch => ({
    createSite: postBody => {
        dispatch(createSite(postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddSiteFormContainer)
);
