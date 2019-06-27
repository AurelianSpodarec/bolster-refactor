import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditSiteForm from '../presentational/EditSiteForm';
import editSite from 'actions/companyAdmin/sites/async/editSite';

class EditSiteFormContainer extends Component {
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
            <EditSiteForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                handleSubmit={this.handleSubmit}
                siteID={this.props.siteID}
                hideModal={this.props.hideModal}
                isUsingBolsterLabels={isUsingBolsterLabels}
            />
        );
    }
    componentDidUpdate = prevProps => {
        const { site } = this.props;

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

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({
            alertDate: date
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const {
            site: { name, client, addressLine1, addressLine2, postcode }
        } = this.props;

        this.setState({
            name,
            client,
            addressLine1,
            addressLine2,
            postcode
        });
    };

    //write a "helper" function that will update state with site details.
    //if !site.id is empty/unidentified (!site.id is equal to unidentified, which is a falsey) and now no longer empty

    handleSubmit = e => {
        e.preventDefault();
        const {
            site: { id },
            editSite,
            hideModal
        } = this.props;

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
        editSite(id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels }
        }
    }
}) => ({
    isUsingBolsterLabels
});

const mapDispatchToProps = dispatch => ({
    editSite: (siteID, postBody) => {
        dispatch(editSite(siteID, postBody));
    },
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSiteFormContainer);
