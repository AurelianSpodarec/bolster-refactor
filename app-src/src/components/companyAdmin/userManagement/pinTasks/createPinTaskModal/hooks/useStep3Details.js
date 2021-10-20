import { useSelector } from 'react-redux';
import { selectBuildings } from 'selectors/companyAdmin/buildings';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectDrawings } from 'selectors/companyAdmin/drawings';
import { selectFloors } from 'selectors/companyAdmin/floors';
import { selectPins } from 'selectors/companyAdmin/pins';
import { selectSites } from 'selectors/companyAdmin/sites';

const useStep3Details = (
    days,
    recurring,
    operativeIDs,
    siteID,
    buildingID,
    floorID,
    drawingID,
    pinIDs,
) => {
    const users = useSelector(selectCompanyUsers) ?? [];
    const sites = useSelector(selectSites) ?? [];
    const buildings = useSelector(selectBuildings) ?? [];
    const floors = useSelector(selectFloors) ?? [];
    const drawings = useSelector(selectDrawings) ?? [];
    const pins = useSelector(selectPins) ?? [];

    const selectedDays = days.reduce(
        (acc, day) => [...acc, `${day.charAt(0).toUpperCase()}${day.slice(1)}`],
        [],
    );
    const recurringType = `${recurring.charAt(0).toUpperCase()}${recurring.slice(1)}`;

    const selectedOperatives = Object.values(users).reduce(
        (acc, { id, userFirstName, userLastName }) =>
            operativeIDs.includes(id) ? [...acc, `${userFirstName} ${userLastName}`] : acc,
        [],
    );

    const selectedPins = Object.values(pins).reduce(
        (acc, { id, pinCode }) => (pinIDs.includes(id) ? [...acc, pinCode] : acc),
        [],
    );

    const siteName = Object.values(sites).find(({ id }) => id === siteID)?.name;
    const buildingName = Object.values(buildings).find(({ id }) => id === buildingID)?.name;
    const floorName = Object.values(floors).find(({ id }) => id === floorID)?.name;
    const drawingName = Object.values(drawings).find(({ id }) => id === drawingID)?.name;

    return {
        selectedDays,
        recurringType,
        selectedOperatives,
        siteName,
        buildingName,
        floorName,
        drawingName,
        selectedPins,
    };
};

export default useStep3Details;
