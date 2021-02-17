import React from 'react';

import { FILE_STORAGE_URL } from 'config';
import RedPin from '_content/images/map-markers/red-pin2x.png';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SelectPinScaleModal = ({
    drawing: { tailoredTilesetS3Key },
    scale,
    handleUpdatePinScale,
    handleSubmit,
    handleCancelScale,
    showZoneSlider,
    zoneOpacity,
    handleOpacityChange,
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Select Size of Pins" />
        <div className="size-lg-12">
            <img
                className="loading-floorplan"
                alt="floorplan"
                style={{ width: '100%' }}
                src={`${FILE_STORAGE_URL}/${tailoredTilesetS3Key}?width=570`}
            />

            <div className="pins-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    height="300"
                    viewBox="0 0 64 64"
                    style={{ position: 'absolute', top: '50%', left: '50%', height: '25%' }}
                >
                    <polygon
                        fillOpacity={zoneOpacity}
                        fill="lime"
                        strokeOpacity="1"
                        stroke="lime"
                        strokeWidth="1"
                        points="30,4,4,60,60,60"
                    />
                    <text
                        x="31"
                        y="45"
                        textAnchor="middle"
                        fontSize="7"
                        fontWeight="400"
                        fill="#212228"
                    >
                        Zone
                    </text>
                </svg>
                <div style={{ top: '20%', left: '20%' }} className="pin">
                    <img alt="pin for scale" src={RedPin} style={{ height: `${100 * scale}%` }} />
                </div>
                <div style={{ top: '20%', left: '75%' }} className="pin">
                    <img alt="pin for scale" src={RedPin} style={{ height: `${100 * scale}%` }} />
                </div>
                <div style={{ top: '12%', left: '50%' }} className="pin">
                    <img alt="pin for scale" src={RedPin} style={{ height: `${100 * scale}%` }} />
                </div>
                <div style={{ top: '50%', left: '30%' }} className="pin">
                    <img alt="pin for scale" src={RedPin} style={{ height: `${100 * scale}%` }} />
                </div>
                <div style={{ top: '55%', left: '65%' }} className="pin">
                    <img alt="pin for scale" src={RedPin} style={{ height: `${100 * scale}%` }} />
                </div>
            </div>
        </div>

        <div className="size-lg-12 sliders">
            <div className="slider pin">
                <img alt="example pin" src={RedPin} className="pin pin-small" />
                <input
                    className="js-pinscale"
                    type="range"
                    value={scale}
                    list="tickmarks"
                    min={0.4}
                    max={1.6}
                    step={0.1}
                    onChange={handleUpdatePinScale}
                />
                <img alt="example pin" src={RedPin} className="pin pin-large" />
            </div>

            <div className="slider opacity">
                <p>Zone Opacity</p>
                <input
                    type="range"
                    min="0"
                    max="1"
                    value={zoneOpacity}
                    step="0.1"
                    onChange={handleOpacityChange}
                />
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
