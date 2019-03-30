import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteEditForm from '../presentational/SiteEditForm';
import editSite from 'actions/sites/async/editSite';

class SiteEditFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render() {
        return (
            <SiteEditForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
    componentDidUpdate = prevProps => {
        const { postSuccess, history, siteID, site } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/sites/${siteID}`);
        }
        if (!prevProps.site.id && !!site.id) {
            this._setFormDetails();
        }
    };

    componentDidMount = () => {
        const { site } = this.props;

        if (site.id > 0) {
            this._setFormDetails();
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const { site } = this.props;

        this.setState({
            name: site.name,
            client: site.client,
            addressLine1: site.addressLine1,
            addressLine2: site.addressLine2,
            postcode: site.postcode
        });
    };

    //write a "helper" function that will update state with site details.
    //if !site.id is empty/unidentified (!site.id is equal to unidentified, which is a falsey) and now no longer empty

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

        this.props.editSite(postBody);
    };
}

const mapStateToProps = ({ sitesReducer }, ownProps) => ({
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    siteID: ownProps.match.params.id,
    site: sitesReducer.sites[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    editSite: postBody => {
        dispatch(editSite(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteEditFormContainer)
);
