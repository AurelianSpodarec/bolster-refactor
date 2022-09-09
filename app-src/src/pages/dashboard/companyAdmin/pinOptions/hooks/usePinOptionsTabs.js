import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../../../helpers/hooks';

import { isEmpty } from 'helpers/generic';

import setPinOptionsTypesSelectedTabID from 'actions/companyAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';
import {
    selectPinOptionTypesArr,
    selectPinOptionTypesSelectedTabID,
} from 'selectors/companyAdmin/pinOptionTypes';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';

import OptionSets from '../optionSets/OptionSets';
import Prelims from '../prelims/Prelims';
import { showModal } from '../../../../../actions/shared/generic/modals/sync/showModal';
import { BOLSTER_PLUS_UPGRADE_MODAL } from '../../../../../constants/shared/modalTypes';
import useBolsterPlus from '../../subscription/addOns/hooks/useBolsterPlus';
import { hideModal } from '../../../../../actions/shared/generic/modals/sync/hideModal';

const usePinOptionsTabs = () => {
    const dispatch = useDispatch();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);

    const { isBolsterPlusActivated } = useBolsterPlus();

    const tabs = useMemo(() => {
        const tabsList = [];

        pinOptionTypesArr
            .sort((a, b) => a.sort - b.sort)
            .forEach(({ id, tabName }) =>
                tabsList.push({ id, name: tabName, component: OptionSets }),
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

    const prevSelectedTab = usePrevious(selectedTabID);

    useEffect(() => {
        dispatch(setPinOptionsTypesSelectedTabID(selectedTabID));
    }, [selectedTabID]);

    useEffect(() => {
        if (selectedTabID === 'prelims' && !isBolsterPlusActivated) {
            dispatch(
                showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                    handleClose: () => dispatch(hideModal()),
                    handleSwitchTab: () => setSelectedTabID(prevSelectedTab),
                }),
            );
        }
    }, [selectedTabID, isBolsterPlusActivated]);

    return { tabs, selectedTabID, setSelectedTabID, SpecificComponent };
};

export default usePinOptionsTabs;
