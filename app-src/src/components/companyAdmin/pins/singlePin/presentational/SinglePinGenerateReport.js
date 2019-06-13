import React from 'react';

const SinglePinGenerateReport = ({ handleGenerateReport }) => (
    <button className="button blue pull-right" onClick={handleGenerateReport}>
        <i className="fa fa-file" />
        Generate report
    </button>
);

export default SinglePinGenerateReport;
