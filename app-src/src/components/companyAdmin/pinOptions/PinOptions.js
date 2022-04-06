import React from 'react';

import { PIN_OPTIONS_TABS } from 'constants/companyAdmin/blockTabs';
import { isEmpty } from 'helpers/generic';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';
import useFetchServices from 'components/companyAdmin/hooks/useFetchServices';
import useFetchPinOptionTypes from '../hooks/useFetchPinOptionTypes';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';

const PinOptions = () => {
    const { selectedTabID, setSelectedTabID, SpecificComponent } = useBlockTabs(PIN_OPTIONS_TABS);

    const { services, isFetchingServices, servicesError } = useFetchServices();
    const { pinOptionTypes, isFetchingPinOptionTypes, pinOptionTypesError } =
        useFetchPinOptionTypes();

    return (
        <>
            <PageHeading title="Pin Options" />

            <BlockContainer
                isEmpty={
                    (isEmpty(services) && isFetchingServices) ||
                    (isEmpty(pinOptionTypes) && isFetchingPinOptionTypes)
                }
                isFetching={isFetchingServices || isFetchingPinOptionTypes}
                error={servicesError || pinOptionTypesError}
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
