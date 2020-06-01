import React, { useState } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editCompanyUserType from 'actions/companyAdmin/userManagement/async/editCompanyUserType';
import UserDrawingListItem from '../presentational/UserDrawingListItem';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import { componentDidMount } from 'helpers/generic';

const UserDrawingListItemContainer = ({
    drawing,
    colCount,
    checkedDrawings,
    handleDrawingIDs,
    fetchSingleSite,
    fetchSingleFloor,
    fetchSingleBuilding,
    services,
    drawingServices,
}) => {
    const [siteName, setSiteName] = useState('Unknown');
    const [floorName, setFloorName] = useState('Unknown');
    const [buildingName, setBuildingName] = useState('Unknown');

    componentDidMount(() => {
        fetchSingleSite(drawing.siteID)
            .then(({ payload }) => {
                if (payload.name) {
                    setSiteName(payload.name);
                }
            })
            .catch(error => console.log(error));

        fetchSingleBuilding(drawing.buildingID)
            .then(({ payload }) => {
                if (payload.name) {
                    setBuildingName(payload.name);
                }
            })
            .catch(error => console.log(error));

        fetchSingleFloor(drawing.floorID)
            .then(({ payload }) => {
                if (payload.name) {
                    setFloorName(payload.name);
                }
            })
            .catch(error => console.log(error));
    });
    return (
        <UserDrawingListItem
            drawing={drawing}
            colCount={colCount}
            checkedDrawings={checkedDrawings}
            handleDrawingIDs={handleDrawingIDs}
            siteName={siteName}
            buildingName={buildingName}
            floorName={floorName}
            serviceNames={getServiceNames()}
        />
    );

    function getServicesForCurrentDrawing() {
        const curServices = drawingServices.filter(x => x.drawingID === drawing.id);

        return curServices[0].serviceIDs;
    }

    function getServiceNames() {
        if (!drawingServices.length) return null;

        const serviceIDs = getServicesForCurrentDrawing();

        const filteredServices = services.filter(service => {
            return serviceIDs.includes(service.id);
        });

        const names = filteredServices.map(service => service.name).join(', ');

        return names;
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
    editCompanyUserType: (companyUserID, postBody) => {
        dispatch(editCompanyUserType(companyUserID, postBody));
    },
    fetchSingleSite: id => {
        return dispatch(fetchSingleSite(id));
    },
    fetchSingleBuilding: id => {
        return dispatch(fetchSingleBuilding(id));
    },
    fetchSingleFloor: id => {
        return dispatch(fetchSingleFloor(id));
    }
});
const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites, isFetching: fetchingSites },
        buildingsReducer: { buildings, isFetching: fetchingBuildings },
        floorsReducer: { floors, isFetching: fetchingFloors },
        userDrawingsReducer: { isFetching: fetchingDrawings },
        servicesReducer: { services, drawingServices, error: servicesError }
    }
}) => {
    return {
        sites: sites || {},
        buildings: buildings || {},
        floors: floors || {},
        fetchingDrawings,
        isFetching: fetchingFloors || fetchingBuildings || fetchingSites,
        services: Object.values(services) || [],
        drawingServices: Object.values(drawingServices) || [],
        servicesError
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDrawingListItemContainer);
