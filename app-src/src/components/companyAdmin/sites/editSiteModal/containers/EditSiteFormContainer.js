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
        const { isUsingBolsterLabels, error } = this.props;
        const { areOptionsLoaded } = this.state;

        return (
            <BlockContainer
                isEmpty={!areOptionsLoaded}
                isFetching={!areOptionsLoaded}
                error={error}
                contentClass="no-padding"
            >
                <EditSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    siteID={this.props.siteID}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { site } = this.props;
        if (!prevProps.site.id && !!site.id) {
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

    //write a "helper" function that will update state with site details.
    //if !site.id is empty/unidentified (!site.id is equal to unidentified, which is a falsey) and now no longer empty

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
