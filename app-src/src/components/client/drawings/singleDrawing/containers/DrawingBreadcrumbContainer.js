import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleClientSite from 'actions/client/sites/async/clientFetchSingleSite';
import fetchSingleClientBuilding from 'actions/client/buildings/async/clientFetchSingleBuilding';
import fetchSingleClientFloor from 'actions/client/floors/async/clientFetchSingleFloor';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import { getSelectedCompanyForClient } from 'helpers/generic';

class DrawingBreadcrumbContainer extends Component {
    render() {
        const { site, building, floor, drawing, isFetching } = this.props;
        const breadcrumbsArray = [
            {
                text: 'Sites',
                link: '/client/sites/'
            },
            {
                text: site.name,
                link: `/client/sites/${site.id}`
            },
            {
                text: building.name,
                link: `/client/buildings/${building.id}`
            },
            {
                text: floor.name,
                link: `/client/floors/${floor.id}`
            },
            { text: drawing.name }
        ];
        return (
            <Breadcrumb
                breadcrumbs={
                    !isFetching ? breadcrumbsArray : [{ text: 'Loading...' }]
                }
            >
                {this.props.children}
            </Breadcrumb>
        );
    }

    componentDidMount() {
        const { drawing } = this.props;
        if (drawing.floorID) this.fetchData();
    }
    componentDidUpdate(prevProps) {
        const { drawing } = this.props;
        if (drawing.floorID && !prevProps.drawing.floorID) this.fetchData();
    }

    fetchData = () => {
        const {
            drawing,
            fetchSingleClientFloor,
            fetchSingleClientBuilding,
            fetchSingleClientSite
        } = this.props;

        const selectedCompanyID = getSelectedCompanyForClient();

        fetchSingleClientFloor(selectedCompanyID, drawing.floorID)
            .then(({ payload }) =>
                fetchSingleClientBuilding(selectedCompanyID, payload.buildingID)
            )
            .then(({ payload }) =>
                fetchSingleClientSite(selectedCompanyID, payload.siteID)
            );
    };
}

const mapStateToProps = (
    {
        client: {
            drawingsReducer: { drawings, isFetching: fetchingDrawings },
            floorsReducer: { floors, isFetching: fetchingFloors },
            buildingsReducer: { buildings, isFetching: fetchingBuildings },
            sitesReducer: { sites, isFetching: fetchingSites }
        }
    },
    { match }
) => {
    const drawing = drawings[match.params.id] || {};
    const floor = floors[drawing.floorID] || {};
    const building = buildings[floor.buildingID] || {};
    const site = sites[building.siteID] || {};
    return {
        drawing,
        floor,
        building,
        site,
        isFetching:
            fetchingDrawings ||
            fetchingFloors ||
            fetchingBuildings ||
            fetchingSites
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSingleClientBuilding: (companyID, buildingID) => {
        return dispatch(fetchSingleClientBuilding(companyID, buildingID));
    },
    fetchSingleClientSite: (companyID, siteID) => {
        return dispatch(fetchSingleClientSite(companyID, siteID));
    },
    fetchSingleClientFloor: (companyID, floorID) => {
        return dispatch(fetchSingleClientFloor(companyID, floorID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingBreadcrumbContainer)
);
