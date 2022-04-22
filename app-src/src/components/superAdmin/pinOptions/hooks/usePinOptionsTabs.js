import React, { useEffect, useMemo } from 'react';
import useBlockTabs from '../../../shared/tabs/hooks/useBlockTabs';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from '../../../../helpers/generic';
import Prelims from '../../../companyAdmin/pinOptions/prelims/Prelims';
import {
    selectPinOptionTypesArr,
    selectPinOptionTypesSelectedTabID,
} from '../../../../selectors/superAdmin/pinOptionTypes';

import setPinOptionsTypesSelectedTabID from '../../../../actions/superAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';

const usePinOptionsTabs = () => {
    const dispatch = useDispatch();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);

    const tabs = useMemo(() => {
        const tabsList = [];

        pinOptionTypesArr.forEach(({ id, namePlural }) =>
            tabsList.push({ id, name: namePlural, component: OptionSets }),
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
