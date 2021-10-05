import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import React from 'react';
import BreakdownTextBox from './BreakdownTextBox';

const BreakdownDaySummary = ({ hours, pins, reference, description }) => {
    return (
        <div className="breakdown-day-summary">
            <div className="summary-row">
                <FieldOutput title="Total Hours" />
            </div>
            <div className="summary-row"></div>
        </div>
    );
};

export default BreakdownDaySummary;
