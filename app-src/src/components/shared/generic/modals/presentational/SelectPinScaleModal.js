import React from 'react';

import { RAW_S3_STORAGE_URL } from 'config';
import RedPin from '_content/images/map-markers/red-pin2x.png';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SelectPinScaleModal = ({
    drawing: { tailoredTilesetS3Key },
    scale,
    handleUpdatePinScale,
    handleSubmit,
    handleCancelScale
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Select Size of Pins" />
        <div className="size-lg-12">
            <img
                alt="floorplan"
                style={{ width: '100%' }}
                src={`${RAW_S3_STORAGE_URL}/${tailoredTilesetS3Key}`}
            />
            <div className="pins-container">
                <div style={{ top: '20%', left: '20%' }} className="pin">
                    <img
                        alt="pin for scale"
                        src={RedPin}
                        style={{ height: `${100 * scale}%` }}
                    />
                </div>
                <div style={{ top: '20%', left: '75%' }} className="pin">
                    <img
                        alt="pin for scale"
                        src={RedPin}
                        style={{ height: `${100 * scale}%` }}
                    />
                </div>
                <div style={{ top: '12%', left: '50%' }} className="pin">
                    <img
                        alt="pin for scale"
                        src={RedPin}
                        style={{ height: `${100 * scale}%` }}
                    />
                </div>
                <div style={{ top: '50%', left: '30%' }} className="pin">
                    <img
                        alt="pin for scale"
                        src={RedPin}
                        style={{ height: `${100 * scale}%` }}
                    />
                </div>
            </div>

            <div className="pinscale-slider">
                <img alt="example pin" src={RedPin} className="pin pin-small" />
                <input
                    className="js-pinscale"
                    type="range"
                    value={scale}
                    list="tickmarks"
                    min={0.5}
                    max={2}
                    step={0.5}
                    onChange={handleUpdatePinScale}
                />
                <img alt="example pin" src={RedPin} className="pin pin-large" />
            </div>
        </div>

        <BlockButtonWrapper>
            <button onClick={handleCancelScale} className="button">
                Close
            </button>
            <button onClick={handleSubmit} className="button green">
                <i className="fa fa-file" />
                Generate Report
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SelectPinScaleModal;
