import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import setPinOptionsTypesSelectedTabID from 'actions/companyAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';
import {
    selectPinOptionTypesArr,
    selectPinOptionTypesSelectedTabID,
} from 'selectors/companyAdmin/pinOptionTypes';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';

import OptionSets from '../optionSets/OptionSets';
import Prelims from '../prelims/Prelims';

const usePinOptionsTabs = () => {
    const dispatch = useDispatch();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);

    const tabs = useMemo(() => {
        const tabsList = [];

        pinOptionTypesArr.forEach(({ id, name }) =>
            tabsList.push({ id, name, component: OptionSets }),
        );

        if (!isEmpty(pinOptionTypesArr)) {
            tabsList.push({ id: 'prelims', name: 'Prelims', component: Prelims });
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
