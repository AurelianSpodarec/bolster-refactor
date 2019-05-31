import React from 'react';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

import RedPin from '_content/images/map-markers/red-pin2x.png';
import GreenPin from '_content/images/map-markers/green-pin2x.png';
import BluePin from '_content/images/map-markers/blue-pin2x.png';
import YellowPin from '_content/images/map-markers/yellow-pin2x.png';
import PurplePin from '_content/images/map-markers/purple-pin2x.png';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardStatsOptions = ({
    services,
    selectedService,
    startDate,
    endDate,
    handleChangeSetting
}) => (
    <>
        <div className="map-filters size-lg-12">
            <BlockHeading title="Pin data filters">
                <div className="pin-amounts">
                    <div className="pin">
                        <img alt="red pin" src={RedPin} />
                        <p>1</p>
                    </div>
                    <div className="pin">
                        <img alt="green pin" src={GreenPin} />
                        <p>2</p>
                    </div>
                    <div className="pin">
                        <img alt="blue pin" src={BluePin} />
                        <p>3</p>
                    </div>
                    <div className="pin">
                        <img alt="yellow pin" src={YellowPin} />
                        <p>4</p>
                    </div>
                    <div className="pin">
                        <img alt="purple pin" src={PurplePin} />
                        <p>5</p>
                    </div>
                </div>
            </BlockHeading>
            <div className="generic-form">
                <Field name="##Service Types##" sizeClasses="size-lg-6">
                    <NewSelect
                        name="serviceType"
                        options={services}
                        onChange={handleChangeSetting}
                        value={selectedService}
                    />
                </Field>
                <Field name="##Live time period##" sizeClasses="size-lg-6">
                    <NewSelect
                        name="liveTimePeriod"
                        onChange={handleChangeSetting}
                        options={[{ label: 'Last 24hrs', value: 1 }]}
                        value={1}
                        singleSelect
                    />
                </Field>
                <Field name="Date range" sizeClasses="w-dates size-lg-6">
                    <div className="size-lg-5">
                        <DatePickerPresentational
                            name="startDate"
                            selected={startDate}
                            onChange={handleChangeSetting}
                            placeholderText="Date"
                        />
                    </div>
                    <p className="size-lg-2">To</p>
                    <div className="size-lg-5">
                        <DatePickerPresentational
                            name="endDate"
                            selected={endDate}
                            onChange={handleChangeSetting}
                            placeholderText="Date"
                        />
                    </div>
                </Field>
            </div>
        </div>
    </>
);
export default DashboardStatsOptions;
