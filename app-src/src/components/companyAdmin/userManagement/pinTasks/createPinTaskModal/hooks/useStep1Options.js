import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
    selectBuildings,
    selectBuildingsFetchError,
    selectBuildingsIsFetching,
} from 'selectors/companyAdmin/buildings';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import {
    selectDrawings,
    selectDrawingsFetchError,
    selectDrawingsIsFetching,
} from 'selectors/companyAdmin/drawings';
import {
    selectFloors,
    selectFloorsFetchError,
    selectFloorsIsFetching,
} from 'selectors/companyAdmin/floors';
import {
    selectPins,
    selectPinsFetchError,
    selectPinsIsFetching,
} from 'selectors/companyAdmin/pins';
import {
    selectSites,
    selectSitesIsFetching,
    selectSitesFetchError,
} from 'selectors/companyAdmin/sites';

const useStep1Options = (handleChange, site, building, floor, drawing) => {
    const dispatch = useDispatch();

    const users = useSelector(selectCompanyUsers) ?? [];
    const usersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const usersFetchError = useSelector(selectCompanyUsersFetchError);

    const sites = useSelector(selectSites) ?? [];
    const sitesIsFetching = useSelector(selectSitesIsFetching);
    const sitesFetchError = useSelector(selectSitesFetchError);

    const buildings = useSelector(selectBuildings) ?? [];
    const buildingsIsFetching = useSelector(selectBuildingsIsFetching);
    const buildingsFetchError = useSelector(selectBuildingsFetchError);

    const floors = useSelector(selectFloors) ?? [];
    const floorsIsFetching = useSelector(selectFloorsIsFetching);
    const floorsFetchError = useSelector(selectFloorsFetchError);

    const drawings = useSelector(selectDrawings) ?? [];
    const drawingsIsFetching = useSelector(selectDrawingsIsFetching);
    const drawingsFetchError = useSelector(selectDrawingsFetchError);

    const pins = useSelector(selectPins) ?? [];
    const pinsIsFetching = useSelector(selectPinsIsFetching);
    const pinsFetchError = useSelector(selectPinsFetchError);

    useEffect(() => {
        batch(() => {
            dispatch(fetchCompanyUsers());
            dispatch(fetchAllSites());
            dispatch(fetchAllBuildings());
            dispatch(fetchAllFloors());
            dispatch(fetchAllDrawings());
        });
    }, [dispatch]);

    useEffect(() => {
        if (drawing != null) dispatch(fetchPins('Drawing', drawing));
    }, [dispatch, drawing]);

    const operativesOptions = Object.values(users).map(({ id, userFirstName, userLastName }) => ({
        value: id,
        label: `${userFirstName} ${userLastName}`,
    }));

    const siteOptions = Object.values(sites).map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const buildingOptions = Object.values(buildings)
        .filter(({ siteID }) => siteID == site)
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const floorOptions = Object.values(floors)
        .filter(({ buildingID }) => buildingID == building)
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const drawingOptions = Object.values(drawings)
        .filter(({ floorID }) => floorID == floor)
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    useEffect(() => {
        handleChange('building', null);
    }, [site]);

    useEffect(() => {
        handleChange('floor', null);
    }, [building]);

    useEffect(() => {
        handleChange('drawing', null);
    }, [floor]);

    useEffect(() => {
        if (Object.values(pins).length === 0 && !isFetching && drawing != null) {
            dispatch(addFieldError('drawing', 'The selected drawing must have at least one pin'));
        }
    }, [dispatch, pins, isFetching]);

    const isFetching =
        usersIsFetching ||
        sitesIsFetching ||
        buildingsIsFetching ||
        floorsIsFetching ||
        drawingsIsFetching ||
        pinsIsFetching;
    const fetchError =
        usersFetchError ||
        sitesFetchError ||
        buildingsFetchError ||
        floorsFetchError ||
        drawingsFetchError ||
        pinsFetchError;

    return {
        isFetching,
        fetchError,
        operativesOptions,
        siteOptions,
        buildingOptions,
        floorOptions,
        drawingOptions,
    };
};

export default useStep1Options;
