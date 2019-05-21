import React from 'react';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

import RedPin from '_content/images/pins-examples/red-pin.svg';
import GreenPin from '_content/images/pins-examples/green-pin.svg';
import BluePin from '_content/images/pins-examples/blue-pin.svg';
import YellowPin from '_content/images/pins-examples/yellow-pin.svg';
import PurplePin from '_content/images/pins-examples/purple-pin.svg';
import Field from 'components/shared/generic/form/presentational/Field';

const DashboardStatsOptions = ({
    services,
    selectedService,
    startDate,
    endDate,
    handleChangeSetting
}) => (
    <>
        <div className="size-lg-7">
            <Field name="Service Types">
                <NewSelect
                    name="serviceType"
                    options={services}
                    onChange={handleChangeSetting}
                    value={selectedService}
                />
            </Field>
            <Field name="##Live time period##">
                <NewSelect
                    name="liveTimePeriod"
                    onChange={handleChangeSetting}
                    options={[{ label: 'Last 24hrs', value: 1 }]}
                    value={1}
                    singleSelect
                />
            </Field>
            <Field name="Date range" sizeClasses="w-dates">
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
        <div className="map-filters size-lg-5">
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
        </div>
    </>
);
export default DashboardStatsOptions;
