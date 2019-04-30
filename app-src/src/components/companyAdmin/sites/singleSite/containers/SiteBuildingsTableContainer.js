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
                        onClick={this.handleAddBuildingModal}
                    >
                        <i className="fa fa-plus" /> Add building
                    </button>
                </BlockHeading>
                <BuildingsTableContainer ids={site.buildingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedBuildingID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/buildings/${updatedBuildingID}`);
        }
    };

    handleAddBuildingModal = () => {
        const { showModal, siteID } = this.props;
        showModal(ADD_BUILDING, { siteID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer,
            buildingsReducer: { postSuccess, updatedBuildingID }
        }
    },
    { match }
) => ({
    postSuccess,
    updatedBuildingID,
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    siteID: match.params.id
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
