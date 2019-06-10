import React from 'react';

import RedPin from '_content/images/map-markers/red-pin2x.png';
import GreenPin from '_content/images/map-markers/green-pin2x.png';
import BluePin from '_content/images/map-markers/blue-pin2x.png';
import YellowPin from '_content/images/map-markers/yellow-pin2x.png';
import PurplePin from '_content/images/map-markers/purple-pin2x.png';
import AllPins from '_content/images/map-markers/all-pins2x.png';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';

import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import OperativesFilterContainer from 'components/companyAdmin/reports/createReport/components/containers/OperativesFilterContainer';

const DrawingMapFiltersAdvanced = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    fromDateInclusive,
    toDateInclusive,
    handleChangeFilter,
    handleDateChange,
    pins
}) => (
    <div className="map-filters size-lg-12">
        <div className="size-lg-12">
            <BlockHeading title="Pin Filters">
                <div className="pin-amounts">
                    <div className="pin">
                        <img
                            className="all-pins"
                            alt="all pins"
                            src={AllPins}
                        />
                        <p>{pins.length}</p>
                    </div>
                    <div className="pin">
                        <img alt="purple pin" src={PurplePin} />
                        <p>
                            {
                                pins.filter(
                                    pin => pin.latestStatus === STATUS.OTHER
                                ).length
                            }
                        </p>
                    </div>
                    <div className="pin">
                        <img alt="yellow pin" src={YellowPin} />
                        <p>
                            {
                                pins.filter(
                                    pin => pin.latestStatus === STATUS.NO_ACTION
                                ).length
                            }
                        </p>
                    </div>
                    <div className="pin">
                        <img alt="blue pin" src={BluePin} />
                        <p>
                            {
                                pins.filter(
                                    pin => pin.latestStatus === STATUS.INSPECTED
                                ).length
                            }
                        </p>
                    </div>
                    <div className="pin">
                        <img alt="green pin" src={GreenPin} />
                        <p>
                            {
                                pins.filter(
                                    pin => pin.latestStatus === STATUS.INSTALLED
                                ).length
                            }
                        </p>
                    </div>
                    <div className="pin">
                        <img alt="red pin" src={RedPin} />
                        <p>
                            {
                                pins.filter(
                                    pin =>
                                        pin.latestStatus ===
                                        STATUS.ACTION_REQUIRED
                                ).length
                            }
                        </p>
                    </div>
                </div>
            </BlockHeading>
            <Form className="generic-form">
                <Field name="Service type" sizeClasses="size-lg-6">
                    <DropdownContainer
                        placeholder="All services"
                        name="serviceID"
                        options={serviceOptions}
                        value={selectedService}
                        selectedOption={selectedService}
                        handleChange={handleChangeFilter}
                    />
                </Field>
                <Field name="Status" sizeClasses="size-lg-6">
                    <DropdownContainer
                        placeholder="All Statuses"
                        name="status"
                        options={statusOptions}
                        value={selectedStatus}
                        selectedOption={selectedStatus}
                        handleChange={handleChangeFilter}
                    />
                </Field>
                <Field name="Date range" sizeClasses="w-dates size-lg-6">
                    <div className="size-lg-5">
                        <DatePicker
                            name="fromDateInclusive"
                            selected={fromDateInclusive}
                            onChange={e =>
                                handleDateChange(e, 'fromDateInclusive')
                            }
                            placeholderText="Start Date"
                        />
                    </div>
                    <p className="size-lg-2">to</p>
                    <div className="size-lg-5">
                        <DatePicker
                            name="toDateInclusive"
                            selected={toDateInclusive}
                            onChange={e =>
                                handleDateChange(e, 'toDateInclusive')
                            }
                            placeholderText="End Date"
                        />
                    </div>
                </Field>
                <OperativesFilterContainer sizeClasses="size-lg-6" />
            </Form>
        </div>
    </div>
);

export default DrawingMapFiltersAdvanced;
