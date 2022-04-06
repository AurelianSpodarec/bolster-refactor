import React from 'react';

import { PIN_OPTIONS_TABS } from 'constants/companyAdmin/blockTabs';
import { isEmpty } from 'helpers/generic';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';
import useFetchServices from 'components/companyAdmin/hooks/useFetchServices';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';

const PinOptions = () => {
    const { selectedTabID, setSelectedTabID, SpecificComponent } = useBlockTabs(PIN_OPTIONS_TABS);

    const { services, isFetchingServices, servicesError } = useFetchServices();

    return (
        <>
            <PageHeading title="Pin Options" />

            <BlockContainer
                isEmpty={isEmpty(services) && isFetchingServices}
                isFetching={isFetchingServices}
                error={servicesError}
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
