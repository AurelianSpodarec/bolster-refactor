import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PIN_OPTIONS_TABS } from 'constants/companyAdmin/blockTabs';
import { isEmpty } from 'helpers/generic';

import setPinOptionsTypesSelectedTabID from 'actions/companyAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';
import { selectPinOptionTypesSelectedTabID } from 'selectors/companyAdmin/pinOptionTypes';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';
import useFetchServices from 'components/companyAdmin/hooks/useFetchServices';
import useFetchPinOptionTypes from '../hooks/useFetchPinOptionTypes';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const PinOptions = () => {
    const dispatch = useDispatch();

    const optionTypesSelectedTabID = useSelector(selectPinOptionTypesSelectedTabID);

    const { selectedTabID, setSelectedTabID, SpecificComponent } = useBlockTabs(
        PIN_OPTIONS_TABS,
        optionTypesSelectedTabID,
    );

    const { services, isFetchingServices, servicesError } = useFetchServices();
    const { pinOptionTypes, isFetchingPinOptionTypes, pinOptionTypesFetchError } =
        useFetchPinOptionTypes();

    useEffect(() => {
        dispatch(setPinOptionsTypesSelectedTabID(selectedTabID));
    }, [selectedTabID]);

    return (
        <>
            <FlexHeading title="Pin Options" />

            <BlockContainer
                isEmpty={
                    (isEmpty(services) && isFetchingServices) ||
                    (isEmpty(pinOptionTypes) && isFetchingPinOptionTypes)
                }
                isFetching={isFetchingServices || isFetchingPinOptionTypes}
                error={servicesError || pinOptionTypesFetchError}
            >
                <BlockTabs
                    tabs={PIN_OPTIONS_TABS}
                    selectedTabID={selectedTabID}
                    setSelectedTabID={setSelectedTabID}
                />

                {SpecificComponent && <SpecificComponent selectedTypeID={selectedTabID} />}
            </BlockContainer>
        </>
    );
};

export default PinOptions;
