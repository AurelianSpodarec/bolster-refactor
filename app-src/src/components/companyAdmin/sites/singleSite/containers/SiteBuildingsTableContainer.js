import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_BUILDING } from 'constants/shared/modalTypes';

import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class SiteBuildingsTableContainer extends Component {
    render() {
        const { site } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Buildings" classes="w-table">
                    <button
                        className="button green"
                        to={`/company/buildings/create/${site.id}`}
                    >
                        <i className="fa fa-plus" /> Add building
                    </button>
                </BlockHeading>
                <BuildingsTableContainer ids={site.buildingIDs || []} />
            </BlockContainer>
        );
    }

    handleAddBuildingModal = () => {
        const {
            showModal,
            site: { id }
        } = this.props;
        showModal(ADD_BUILDING, { id });
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }, { match }) => ({
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteBuildingsTableContainer)
);
