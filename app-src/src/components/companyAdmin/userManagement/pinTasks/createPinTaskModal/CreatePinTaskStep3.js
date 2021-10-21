import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { DATE_TIME_IDS, RECURRING_TYPE } from 'constants/companyAdmin/enums';
import React, { Fragment } from 'react';
import useStep3Details from './hooks/useStep3Details';

const CreatePinTaskStep3 = ({
    formData: {
        days,
        recurring,
        date,
        endDate,
        operatives,
        site,
        building,
        floor,
        drawing,
        service,
        template,
        pins,
    },
    isPosting,
}) => {
    const {
        selectedDays,
        recurringType,
        selectedOperatives,
        siteName,
        buildingName,
        floorName,
        drawingName,
        selectedPins,
    } = useStep3Details(days, recurring, operatives, site, building, floor, drawing, pins);

    return (
        <>
            {isPosting && <Loading />}
            <div className="size-lg-12 step-block">
                <BlockContainer>
                    <BlockHeading
                        title="Summary"
                        subTitle="Check these details are correct before submitting"
                    />
                    <Block>
                        <div className="field-group size-lg-12">
                            <div className="size-lg-4 size-md-12">
                                <FieldOutput title="Recurring Period" description={recurringType} />
                                <FieldOutput
                                    title="Recurring Days"
                                    description={
                                        !selectedDays.length
                                            ? 'None'
                                            : selectedDays.map((day, i) => (
                                                  <Fragment key={i}>
                                                      {day}
                                                      <br />
                                                  </Fragment>
                                              ))
                                    }
                                />
                                <FieldOutput
                                    title="Start Date"
                                    description={
                                        <DateTimeContainer
                                            datetime={DATE_TIME_IDS.DATE}
                                            date={new Date(date)}
                                        />
                                    }
                                />
                                {recurring !== RECURRING_TYPE.NONE && (
                                    <FieldOutput
                                        title="End Date"
                                        description={
                                            <DateTimeContainer
                                                datetime={DATE_TIME_IDS.DATE}
                                                date={new Date(endDate)}
                                            />
                                        }
                                    />
                                )}
                            </div>
                            <div className="size-lg-4 size-md-12">
                                <FieldOutput title="Site Name" description={siteName} />
                                <FieldOutput title="Building Name" description={buildingName} />
                                <FieldOutput title="Floor Name" description={floorName} />
                                <FieldOutput title="Drawing Name" description={drawingName} />
                            </div>
                            <div className="size-lg-4 size-md-12">
                                <FieldOutput
                                    title="Operatives"
                                    description={
                                        !selectedOperatives.length
                                            ? 'None'
                                            : selectedOperatives.map((operative, i) => (
                                                  <Fragment key={i}>
                                                      {operative}
                                                      <br />
                                                  </Fragment>
                                              ))
                                    }
                                />
                                <FieldOutput
                                    title="Pins"
                                    description={selectedPins.map((pin, i) => (
                                        <Fragment key={i}>
                                            {pin}
                                            <br />
                                        </Fragment>
                                    ))}
                                />
                            </div>
                        </div>
                    </Block>
                </BlockContainer>
            </div>
        </>
    );
};

export default CreatePinTaskStep3;
