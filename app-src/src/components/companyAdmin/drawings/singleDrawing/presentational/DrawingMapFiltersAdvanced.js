import React from 'react';

import RedPin from '_content/images/pins-examples/red-pin.svg';
import GreenPin from '_content/images/pins-examples/green-pin.svg';
import BluePin from '_content/images/pins-examples/blue-pin.svg';
import YellowPin from '_content/images/pins-examples/yellow-pin.svg';
import PurplePin from '_content/images/pins-examples/purple-pin.svg';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';

import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingMapFiltersAdvanced = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    operativeOptions,
    selectedOperative,
    startDateSelected,
    endDateSelected,
    handleChange,
    handleDateChange,
    pins
}) => (
    <div className="map-filters size-lg-12">
        <div className="size-lg-12">
            <BlockHeading title="Pin Filters">
                <div className="pin-amounts">
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
                        <img alt="purple pin" src={PurplePin} />
                        <p>
                            {
                                pins.filter(
                                    pin => pin.latestStatus === STATUS.OTHER
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
                        name="serviceSelectedID"
                        options={serviceOptions}
                        value={selectedService}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Status" sizeClasses="size-lg-6">
                    <DropdownContainer
                        placeholder="All Statuses"
                        name="statusSelectedID"
                        options={statusOptions}
                        value={selectedStatus}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Date range" sizeClasses="w-dates size-lg-6">
                    <div className="size-lg-5">
                        <DatePicker
                            name="startDateSelected"
                            selected={startDateSelected}
                            onChange={e =>
                                handleDateChange(e, 'startDateSelected')
                            }
                            placeholderText="Start Date"
                        />
                    </div>
                    <p className="size-lg-2">to</p>
                    <div className="size-lg-5">
                        <DatePicker
                            name="endDateSelected"
                            selected={endDateSelected}
                            onChange={e =>
                                handleDateChange(e, 'endDateSelected')
                            }
                            placeholderText="End Date"
                        />
                    </div>
                </Field>

                <Field name="Operative" sizeClasses="size-lg-6">
                    <DropdownContainer
                        placeholder="Select operative"
                        name="operativeSelectedID"
                        options={operativeOptions}
                        value={selectedOperative}
                        selectedOption={selectedOperative}
                        handleChange={handleChange}
                    />
                </Field>
            </Form>
        </div>
    </div>
);

export default DrawingMapFiltersAdvanced;
