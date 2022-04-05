import React from 'react';

import { PIN_OPTIONS_TABS } from 'constants/shared/blockTabs';

import useBlockTabs from 'components/shared/tabs/hooks/useBlockTabs';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';

const PinOptions = () => {
    const { selectedTabID, setSelectedTabID, SpecificComponent } = useBlockTabs(PIN_OPTIONS_TABS);

    return (
        <>
            <PageHeading title="Pin Options" />

            <BlockContainer>
                <BlockTabs
                    tabs={PIN_OPTIONS_TABS}
                    selectedTabID={selectedTabID}
                    setSelectedTabID={setSelectedTabID}
                />

                {SpecificComponent && <SpecificComponent />}
            </BlockContainer>
        </>
    );
};

export default PinOptions;
