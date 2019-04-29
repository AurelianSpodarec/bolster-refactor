import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import OperativesFilterContainer from '../containers/OperativesFilterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const Block1Filters = ({ fieldError }) => (
    <div className="flex-item size-lg-6">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Heirarchy Selection" />

                <LevelsFilterContainer />
                <OperativesFilterContainer />
                {!!fieldError && (
                    <div
                        className="form-field size-lg-12"
                        style={{ minHeight: 0 }}
                    >
                        <p className="error red-text text-accent-4">
                            {fieldError}
                        </p>
                    </div>
                )}
            </div>
        </BlockContainer>
    </div>
);

export default Block1Filters;
