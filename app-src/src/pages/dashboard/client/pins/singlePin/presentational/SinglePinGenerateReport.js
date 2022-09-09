import React from 'react';

const SinglePinGenerateReport = ({ handleGenerateReport, isFetching }) => (
    <button
        className={`button blue pull-right ${isFetching ? 'disabled' : ''}`}
        disabled={isFetching}
        onClick={handleGenerateReport}
    >
        <i className="fa fa-file" />
        Generate report
    </button>
);

export default SinglePinGenerateReport;
