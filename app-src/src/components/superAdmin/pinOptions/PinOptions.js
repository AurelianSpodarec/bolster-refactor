import React from 'react';

import { isEmpty } from 'helpers/generic';

import usePinOptionsTabs from './hooks/usePinOptionsTabs';
import useFetchServices from '../../superAdmin/hooks/useFetchServices';
import useFetchPinOptionTypes from '../hooks/useFetchPinOptionTypes';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockTabs from 'components/shared/tabs/BlockTabs';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const PinOptions = () => {
    const { pinOptionTypes, isFetchingPinOptionTypes, pinOptionTypesFetchError } =
        useFetchPinOptionTypes();

    const { services, isFetchingServices, servicesError } = useFetchServices();

    const { tabs, selectedTabID, setSelectedTabID, SpecificComponent } = usePinOptionsTabs();

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
