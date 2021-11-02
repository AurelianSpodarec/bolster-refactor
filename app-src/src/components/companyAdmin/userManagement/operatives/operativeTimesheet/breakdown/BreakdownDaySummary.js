import React, { Fragment } from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { formatAsHrsMinsSecs } from 'helpers/generic';

const BreakdownDaySummary = ({ formattedHours, pins, references }) => {
    return (
        <div className="breakdown-day-summary">
            <div className="summary-row">
                <FieldOutput title="Total Hours" fieldClass="hours">
                    {formatAsHrsMinsSecs(formattedHours)}
                </FieldOutput>
                <FieldOutput title="Total Pin histories" fieldClass="pins">
                    {pins}
                </FieldOutput>
            </div>
            <div className="summary-row">
                <FieldOutput title="Job Reference" fieldClass="references">
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
