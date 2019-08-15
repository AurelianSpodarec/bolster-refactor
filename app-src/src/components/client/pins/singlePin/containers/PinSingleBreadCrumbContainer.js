import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import clientFetchSingleSite from 'actions/client/sites/async/clientFetchSingleSite';
import clientFetchSingleBuilding from 'actions/client/buildings/async/clientFetchSingleBuilding';
import clientFetchSingleFloor from 'actions/client/floors/async/clientFetchSingleFloor';
import clientFetchSingleDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import { getSelectedCompanyForClient } from 'helpers/generic';

class PinSingleBreadCrumbContainer extends Component {
    render() {
        const { site, building, floor, drawing, pin, isFetching } = this.props;
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
            { text: drawing.name, link: `/client/drawings/${pin.drawingID}` },
            { text: `Pin ${pin.pinCode}` }
        ];
        return (
            <Breadcrumb breadcrumbs={!isFetching ? breadcrumbsArray : [{ text: 'Loading...' }]}>
                {this.props.children}
            </Breadcrumb>
        );
    }

    componentDidMount() {
        const { pin } = this.props;
        if (pin.drawingID) {
            this.fetchData();
        }
    }
    componentDidUpdate(prevProps) {
        const { pin } = this.props;
        if (pin.drawingID && !prevProps.pin.drawingID) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {
            pin,
            clientFetchSingleFloor,
            clientFetchSingleBuilding,
            clientFetchSingleSite,
            clientFetchSingleDrawing
        } = this.props;
        const companyID = getSelectedCompanyForClient();
        clientFetchSingleDrawing(companyID, pin.drawingID)
            .then(({ payload }) => clientFetchSingleFloor(companyID, payload.floorID))
            .then(({ payload }) => clientFetchSingleBuilding(companyID, payload.buildingID))
            .then(({ payload }) => clientFetchSingleSite(companyID, payload.siteID));
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { singlePin, isFetching: fetchingPins },
            drawingsReducer: { drawings, isFetching: fetchingDrawings },
            floorsReducer: { floors, isFetching: fetchingFloors },
            buildingsReducer: { buildings, isFetching: fetchingBuildings },
            sitesReducer: { sites, isFetching: fetchingSites }
        }
    },
    { match }
) => {
    const pin = singlePin[match.params.id] || {};
    const drawing = drawings[pin.drawingID] || {};
    const floor = floors[drawing.floorID] || {};
    const building = buildings[floor.buildingID] || {};
    const site = sites[building.siteID] || {};
    return {
        pin,
        drawing,
        floor,
        building,
        site,
        isFetching:
            fetchingPins || fetchingDrawings || fetchingFloors || fetchingBuildings || fetchingSites
    };
};

const mapDispatchToProps = dispatch => ({
    clientFetchSingleBuilding: (companyID, buildingID) => {
        return dispatch(clientFetchSingleBuilding(companyID, buildingID));
    },
    clientFetchSingleSite: (companyID, siteID) => {
        return dispatch(clientFetchSingleSite(companyID, siteID));
    },
    clientFetchSingleFloor: (companyID, floorID) => {
        return dispatch(clientFetchSingleFloor(companyID, floorID));
    },
    clientFetchSingleDrawing: (companyID, drawingID) => {
        return dispatch(clientFetchSingleDrawing(companyID, drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinSingleBreadCrumbContainer)
);
