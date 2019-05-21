import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

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
            fetchSingleFloor,
            fetchSingleBuilding,
            fetchSingleSite
        } = this.props;

        fetchSingleFloor(drawing.floorID)
            .then(({ payload }) => fetchSingleBuilding(payload.buildingID))
            .then(({ payload }) => fetchSingleSite(payload.siteID));
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
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
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    },
    fetchSingleFloor: floorID => {
        return dispatch(fetchSingleFloor(floorID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingBreadcrumbContainer)
);
