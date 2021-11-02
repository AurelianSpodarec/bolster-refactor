import React, { Fragment } from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { formatAsHrsMinsSecs } from 'helpers/generic';

import useTimeline from '../hooks/useTimeline';
import useFormattedBreakTime from './hooks/useFormattedBreakTime';
import moment from 'moment';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const BreakdownDaySummary = ({ formattedHours, pins, references, clockerEntries }) => {
    const timeline = useTimeline(clockerEntries);
    const formattedBreakTime = useFormattedBreakTime(timeline);

    const clockIn = timeline.find(({ clockIn }) => clockIn)?.clockIn;
    const clockOut = [...timeline].reverse().find(({ clockOut }) => clockOut)?.clockOut;

    return (
        <div className="breakdown-day-summary">
            <div className="summary-row">
                <FieldOutput title="Total Clocked Time" fieldClass="hours" sizeClass="size-lg-4">
                    {formatAsHrsMinsSecs(formattedHours)}
                </FieldOutput>
                <FieldOutput title="Total Break Time" fieldClass="breakHours" sizeClass="size-lg-4">
                    {formatAsHrsMinsSecs(formattedBreakTime)}
                </FieldOutput>
                <FieldOutput title="Total Pin Histories" fieldClass="pins" sizeClass="size-lg-4">
                    {pins}
                </FieldOutput>
            </div>
            <div className="summary-row">
                <FieldOutput title="Clocked In" fieldClass="clockedIn" sizeClass="size-lg-6">
                    {clockIn ? (
                        <DateTimeContainer datetime={DATE_TIME_IDS.TIME} date={clockIn.timestamp} />
                    ) : (
                        'N/A'
                    )}
                </FieldOutput>
                <FieldOutput title="Clocked Out" fieldClass="clockedOut" sizeClass="size-lg-6">
                    {clockOut ? (
                        <DateTimeContainer
                            datetime={DATE_TIME_IDS.TIME}
                            date={clockOut.timestamp}
                        />
                    ) : (
                        'N/A'
                    )}
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
