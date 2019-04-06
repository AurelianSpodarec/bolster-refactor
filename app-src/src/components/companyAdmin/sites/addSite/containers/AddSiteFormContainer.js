import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddSiteForm from '../presentational/AddSiteForm';
import createSite from 'actions/companyAdmin/sites/async/createSite';

class AddSiteFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render() {
        return (
            <AddSiteForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedSiteID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode
        } = this.state;

        const postBody = {
            name: name,
            client: client,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            postcode: postcode
        };

        this.props.createSite(postBody);
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }) => ({
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    updatedSiteID: sitesReducer.updatedSiteID
});

const mapDispatchToProps = dispatch => ({
    createSite: postBody => {
        dispatch(createSite(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddSiteFormContainer)
);
