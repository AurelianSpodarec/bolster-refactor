import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const SeriesPinTaskModal = ({ pins, isFetching, error }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Pins'} />
            <BlockContainer
                isFetching={isFetching}
                isEmpty={!pins.length}
                error={error}
                noDataMessage="There are no pins on this hierarchy"
                contentClass="no-padding"
            >
                <div className="flex-column">
                    {pins.map(({ id, pinCode }) => (
                        <a
                            key={id}
                            className="pin-link"
                            href={`/company/pins/${id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {pinCode}
                        </a>
                    ))}
                </div>
            </BlockContainer>
        </ModalOuterContainer>
    );
};

export default SeriesPinTaskModal;
