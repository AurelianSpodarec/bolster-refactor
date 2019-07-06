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
    fetchSingleBuilding
}) => {
    const [siteName, setSiteName] = useState('Unkown');
    const [floorName, setFloorName] = useState('Unkown');
    const [buildingName, setBuildingName] = useState('Unkown');

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
        />
    );
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
        userDrawingsReducer: { isFetching: fetchingDrawings }
    }
}) => {
    return {
        sites: sites || {},
        buildings: buildings || {},
        floors: floors || {},
        fetchingDrawings,
        isFetching: fetchingFloors || fetchingBuildings || fetchingSites
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDrawingListItemContainer);
