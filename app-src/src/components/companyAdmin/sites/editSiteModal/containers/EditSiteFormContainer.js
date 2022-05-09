import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import editSite from 'actions/companyAdmin/sites/async/editSite';
import EditSiteForm from '../presentational/EditSiteForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class EditSiteFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
    };

    render() {
        const { isUsingBolsterLabels, error, siteID, hideModal } = this.props;

        return (
            <BlockContainer error={error} contentClass="no-padding">
                <EditSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    siteID={siteID}
                    hideModal={hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.site.id && !!this.props.site.id) {
            this._setFormDetails();
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({
            dateToSend: date,
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const {
            site: { name, client, addressLine1, addressLine2, postcode },
        } = this.props;

        this.setState({
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            site: { id },
            editSite,
            hideModal,
        } = this.props;

        const { name, client, addressLine1, addressLine2, postcode } = this.state;

        const postBody = {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
        };
        editSite(id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels },
        },
        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    updatedSiteID: sitesReducer.updatedSiteID,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    editSite,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteFormContainer);
