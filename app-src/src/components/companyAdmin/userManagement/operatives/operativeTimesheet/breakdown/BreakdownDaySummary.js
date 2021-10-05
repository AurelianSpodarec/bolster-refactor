import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import React from 'react';

const BreakdownDaySummary = ({ hours, pins, reference, description }) => {
    return (
        <div className="breakdown-day-summary">
            <div className="summary-row">
                <FieldOutput title="Total Hours" fieldClass="hours">
                    {hours}
                </FieldOutput>
                <FieldOutput title="Total Pins" fieldClass="pins">
                    {pins}
                </FieldOutput>
                <FieldOutput title="Job Reference" fieldClass="reference">
                    {reference}
                </FieldOutput>
            </div>
            <div className="summary-row">
                <FieldOutput title="Description" fieldClass="description">
                    {description}
                </FieldOutput>
            </div>
        </div>
    );
};

export default BreakdownDaySummary;
