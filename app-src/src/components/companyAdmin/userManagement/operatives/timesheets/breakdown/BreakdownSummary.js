import React, { Fragment } from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { formatAsHrsMinsSecs } from 'helpers/generic';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import useDateTime from 'components/shared/dateTime/hooks/useDateTime';

const BreakdownSummary = ({
    name,
    formattedHours = 0,
    formattedBreakHours = 0,
    formattedClockedInHours = 0,
    totalPins = 0,
    jobReferences = [],
    clockIn,
    clockOut,
    timePeriod = TIME_PERIOD.DAY,
}) => {
    const filteredJobReferences = jobReferences.filter(jobReference => jobReference);
    const { moment: clockInMoment } = useDateTime(clockIn);
    const { moment: clockOutMoment } = useDateTime(clockOut);
    const clockInDay = clockInMoment.startOf('day');
    const clockOutDay = clockOutMoment.startOf('day');
    const dayDifference = clockOutDay.diff(clockInDay, 'days');

    return (
        <div className="breakdown-summary">
            {name && <BlockHeading title={name} classes="with-underline" />}
            {clockIn || totalPins ? (
                <>
                    <div className="summary-row">
                        <FieldOutput
                            title="Total Hours Worked"
                            fieldClass="hours"
                            sizeClass="size-lg-6"
                        >
                            {formatAsHrsMinsSecs(formattedHours)}
                        </FieldOutput>
                        <FieldOutput
                            title="Total Break Time"
                            fieldClass="breakHours"
                            sizeClass="size-lg-6"
                        >
                            {formatAsHrsMinsSecs(formattedBreakHours)}
                        </FieldOutput>
                        <FieldOutput
                            title="Total Hours Clocked In"
                            fieldClass="clockedIn"
                            sizeClass="size-lg-6"
                        >
                            {clockIn ? formatAsHrsMinsSecs(formattedClockedInHours) : 'N/A'}
                        </FieldOutput>
                    </div>
                    {timePeriod === TIME_PERIOD.DAY && (
                        <div className="summary-row">
                            <FieldOutput title="First Clocked In" sizeClass="size-lg-6">
                                {clockIn ? (
                                    <DateTimeContainer
                                        datetime={DATE_TIME_IDS.TIME}
                                        date={clockIn}
                                    />
                                ) : (
                                    'N/A'
                                )}
                            </FieldOutput>
                            <FieldOutput title="Last Clocked Out" sizeClass="size-lg-6">
                                {clockOut ? (
                                    <>
                                        <DateTimeContainer
                                            datetime={DATE_TIME_IDS.TIME}
                                            date={clockOut}
                                        />
                                        {dayDifference > 0 && '(+' + dayDifference + 'd)'}
                                    </>
                                ) : (
                                    'N/A'
                                )}
                            </FieldOutput>
                            <FieldOutput
                                title="Total Pin Histories"
                                fieldClass="pins"
                                sizeClass="size-lg-6"
                            >
                                {totalPins}
                            </FieldOutput>
                        </div>
                    )}
                    <div className="summary-row">
                        <FieldOutput title="Job References" fieldClass="references">
                            {filteredJobReferences.length === 0
                                ? 'N/A'
                                : filteredJobReferences.map((reference, i) => (
                                      <Fragment key={i}>
                                          {reference}
                                          <br />
                                      </Fragment>
                                  ))}
                        </FieldOutput>
                    </div>
                </>
            ) : (
                <p>No data to display</p>
            )}
        </div>
    );
};

export default BreakdownSummary;
