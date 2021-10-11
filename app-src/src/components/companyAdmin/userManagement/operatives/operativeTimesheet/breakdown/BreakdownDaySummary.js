import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import React, { Fragment } from 'react';

const BreakdownDaySummary = ({ hours, pins, references }) => {
    return (
        <div className="breakdown-day-summary">
            <div className="summary-row">
                <FieldOutput title="Total Hours" fieldClass="hours">
                    {hours}
                </FieldOutput>
                <FieldOutput title="Total Pins" fieldClass="pins">
                    {pins}
                </FieldOutput>
            </div>
            <div className="summary-row">
                <FieldOutput title="Job References" fieldClass="references">
                    {references.length === 0
                        ? 'N/A'
                        : references.map((reference, i) => (
                              <Fragment key={i}>
                                  {reference}
                                  <br />
                              </Fragment>
                          ))}
                </FieldOutput>
            </div>
        </div>
    );
};

export default BreakdownDaySummary;
