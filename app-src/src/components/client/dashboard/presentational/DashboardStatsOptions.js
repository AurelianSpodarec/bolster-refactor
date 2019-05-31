import React from 'react';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

import RedPin from '_content/images/map-markers/red-pin2x.png';
import GreenPin from '_content/images/map-markers/green-pin2x.png';
import BluePin from '_content/images/map-markers/blue-pin2x.png';
import YellowPin from '_content/images/map-markers/yellow-pin2x.png';
import PurplePin from '_content/images/map-markers/purple-pin2x.png';

const DashboardStatsOptions = ({
    services,
    selectedService,
    startDate,
    endDate,
    handleChangeSetting
}) => (
    <>
        <div className="size-lg-7">
            <p className="generic-text">##Service Type##</p>
            <NewSelect
                name="serviceType"
                options={services}
                onChange={handleChangeSetting}
                value={selectedService}
            />
            <p className="generic-text">##Live time period##</p>
            <NewSelect
                name="liveTimePeriod"
                onChange={handleChangeSetting}
                options={[{ label: 'Last 24hrs', value: 1 }]}
                value={1}
                singleSelect
            />
            <p className="generic-text">Date</p>
            <DatePickerPresentational
                name="startDate"
                selected={startDate}
                onChange={handleChangeSetting}
                placeholderText="Date"
            />
            <p className="generic-text">To</p>
            <DatePickerPresentational
                name="endDate"
                selected={endDate}
                onChange={handleChangeSetting}
                placeholderText="Date"
            />
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
