import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchUserDrawings from 'actions/companyAdmin/userManagement/async/fetchUserDrawings';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import { usePrevious } from 'helpers/hooks';
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

const useStep1Options = (handleChange, site, building, floor, drawing, companyUserID) => {
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

    const drawings = Object.values(useSelector(selectDrawings) ?? []);
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
        });
    }, [dispatch]);
    useEffect(() => {
        if (companyUserID) {
            dispatch(fetchUserDrawings(companyUserID));
        }
    }, [companyUserID]);

    useEffect(() => {
        if (drawing != null) dispatch(fetchPins('Drawing', drawing));
    }, [dispatch, drawing]);

    const operativeOptions = Object.values(users).map(
        ({ id, userFirstName, userLastName, userEmail, operativeCode }) => ({
            value: id,
            label: `${userFirstName} ${userLastName} - ${operativeCode} (${userEmail})`,
        }),
    );

    const operativeHierarchyIDs = drawings.reduce(
        (acc, curDrawing) => {
            acc.sites = acc.sites.concat(curDrawing.siteID);
            acc.buildings = acc.buildings.concat(curDrawing.buildingID);
            acc.floors = acc.floors.concat(curDrawing.floorID);
            return acc;
        },
        { floors: [], buildings: [], sites: [] },
    );

    const siteOptions = Object.values(sites)
        .filter(site => operativeHierarchyIDs.sites.includes(site.id))
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const buildingOptions = Object.values(buildings)
        .filter(({ siteID }) => siteID == site)
        .filter(building => operativeHierarchyIDs.buildings.includes(building.id))
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const floorOptions = Object.values(floors)
        .filter(({ buildingID }) => buildingID == building)
        .filter(floor => operativeHierarchyIDs.floors.includes(floor.id))
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const drawingOptions = drawings
        .filter(({ floorID }) => floorID == floor)
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const prevSite = usePrevious(site);
    const prevBuilding = usePrevious(building);
    const prevFloor = usePrevious(floor);

    useEffect(() => {
        if (prevSite !== site) {
            handleChange('building', null);
        }
    }, [site]);

    useEffect(() => {
        if (prevBuilding !== building) {
            handleChange('floor', null);
        }
    }, [building]);

    useEffect(() => {
        if (prevFloor !== floor) {
            handleChange('drawing', null);
        }
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
        operativeOptions,
        siteOptions,
        buildingOptions,
        floorOptions,
        drawingOptions,
    };
};

export default useStep1Options;
