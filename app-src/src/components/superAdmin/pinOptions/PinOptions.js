import React from 'react';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import usePinOptionsTabs from './hooks/usePinOptionsTabs';
import useFetchServices from '../../superAdmin/hooks/useFetchServices';

const PinOptions = () => {
    // const { tabs, selectedTabID, setSelectedTabID, SpecificComponent } = usePinOptionsTabs();

    const { services, isFetchingServices, servicesError } = useFetchServices();

    return (
        <>
            <FlexHeading title="Pin Options" />

            <BlockContainer
                isEmpty={isEmpty(services) && isFetchingServices}
                isFetching={isFetchingServices}
                error={servicesError}
            >
                {/*<BlockTabs*/}
                {/*tabs={tabs}*/}
                {/*selectedTabID={selectedTabID}*/}
                {/*setSelectedTabID={setSelectedTabID}*/}
                {/*/>*/}

                {/*{SpecificComponent && <SpecificComponent selectedTypeID={selectedTabID} />}*/}
            </BlockContainer>
        </>
    );
};

export default PinOptions;
