import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import ClientInvite from 'components_DEPRECATED/shared/clients/presentational/ClientInvite';

class SiteClientInviteContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <ClientInvite type="site" />
            </BlockContainer>
        );
    }
}
const mapStateToProps = ({ companyAdmin: { servicesReducer, subscriptionsReducer } }) => ({
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions || {},
});

export default connect(mapStateToProps)(SiteClientInviteContainer);
