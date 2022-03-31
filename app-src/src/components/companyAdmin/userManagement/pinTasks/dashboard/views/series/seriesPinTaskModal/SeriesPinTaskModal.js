import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const SeriesPinTaskModal = ({ pins, isFetching, error }) => {
    console.log(pins);
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
                {pins.map(({ id }) => (
                    <div className="content-area" key={id}>
                        <div className="flex-row justify-between align-center width-5">
                            <p>Pin ID: {id}</p>
                            <a className="link-without-decoration" href={`/company/pins/${id}`}>
                                <button className="button" type="button">
                                    View pin
                                </button>
                            </a>
                        </div>
                    </div>
                ))}
            </BlockContainer>
        </ModalOuterContainer>
    );
};

export default SeriesPinTaskModal;
