import React from 'react';

const DrawingPinSelector = () => (
    <>
        <h2 className="heading heading-3 size-lg-12">Pin selector</h2>

        <p className="generic-text size-lg-12">
            Using either of the boxes below or the pin map, select which pins
            you would like to be included in your report.
        </p>

        <div className="pin-selection-box">
            <h3>Excluded</h3>
            <div className="content">
                <p>0023:01</p>
                <p className="selected">0023:02</p>
                <p>0023:03</p>
            </div>
        </div>

        <div className="pin-selection-buttons">
            <button className="exclude" type="button">
                <i className="far fa-long-arrow-left" />
            </button>

            <button className="include" type="button">
                <i className="far fa-long-arrow-right" />
            </button>
        </div>

        <div className="pin-selection-box">
            <h3>Included</h3>
            <div className="content">
                <p>0023:04</p>
                <p>0023:05</p>
                <p>0023:06</p>
                <p>0023:07</p>
                <p>0023:08</p>
            </div>
        </div>
    </>
);

export default DrawingPinSelector;
