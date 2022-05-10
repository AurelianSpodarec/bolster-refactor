import { useEffect, useMemo } from 'react';
import useBlockTabs from '../../../shared/tabs/hooks/useBlockTabs';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from '../../../../helpers/generic';

import setPinOptionsTypesSelectedTabID from '../../../../actions/superAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';

import {
    selectPinOptionTypesArr,
    selectPinOptionTypesSelectedTabID,
} from '../../../../selectors/superAdmin/pinOptionTypes';

import OptionSets from '../optionSets/OptionSets';

const usePinOptionsTabs = () => {
    const dispatch = useDispatch();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const tabs = useMemo(() => {
        const tabsList = [];

        pinOptionTypesArr
            .sort((a, b) => a.sort - b.sort)
            .forEach(({ id, tabName }) =>
                tabsList.push({ id, name: tabName, component: OptionSets }),
            );

        if (!isEmpty(pinOptionTypesArr)) {
            tabsList.push({ id: 'prelims', name: 'Prelims', component: null });
        }

        return tabsList;
    }, [pinOptionTypesArr]);

    const optionTypesSelectedTabID = useSelector(selectPinOptionTypesSelectedTabID);

    const { selectedTabID, setSelectedTabID, SpecificComponent } = useBlockTabs(
        tabs,
        optionTypesSelectedTabID,
    );

    useEffect(() => {
        dispatch(setPinOptionsTypesSelectedTabID(selectedTabID));
    }, [selectedTabID]);

    return { tabs, selectedTabID, setSelectedTabID, SpecificComponent };
};

export default usePinOptionsTabs;
