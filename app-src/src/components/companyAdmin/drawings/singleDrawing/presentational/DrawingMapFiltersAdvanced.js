import React from 'react';

import Filter from 'components/shared/generic/form/presentational/Filter';
import RedPin from '_content/images/pins/red-pin.png';
import GreenPin from '_content/images/pins/green-pin.png';
import BluePin from '_content/images/pins/blue-pin.png';
import YellowPin from '_content/images/pins/yellow-pin.png';
import PurplePin from '_content/images/pins/purple-pin.png';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';

const DrawingMapFiltersAdvanced = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    handleChange,
    pins
}) => (
    <div className="form size-lg-8">
        <div className="size-lg-9">
            <div className="size-lg-6">
                <DropdownContainer
                    placeholder="Select service"
                    name="serviceSelectedID"
                    options={serviceOptions}
                    selectedOption={selectedService}
                    handleChange={handleChange}
                />
            </div>

            <div className="size-lg-6">
                <DropdownContainer
                    placeholder="Select status"
                    name="statusSelectedID"
                    options={statusOptions}
                    selectedOption={selectedStatus}
                    handleChange={handleChange}
                />
            </div>

            {/* <div className="size-lg-6">
                <Filter
                    title="Time period"
                    options={serviceOptions}
                    selectedOption={serviceSelectedID}
                    handleInputChange={handleChange}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Operative"
                    options={serviceOptions}
                    selectedOption={serviceSelectedID}
                    handleInputChange={handleChange}
                />
            </div> */}
        </div>

        <div className="size-lg-3">
            <div className="pin-amounts" style={{ top: '5px' }}>
                <div className="pin size-lg-6">
                    <img alt="red pin" src={RedPin} />
                    <p>
                        {
                            pins.filter(
                                pin =>
                                    pin.latestStatus === STATUS.ACTION_REQUIRED
                            ).length
                        }
                    </p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="green pin" src={GreenPin} />
                    <p>
                        {
                            pins.filter(
                                pin => pin.latestStatus === STATUS.INSTALLED
                            ).length
                        }
                    </p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="blue pin" src={BluePin} />
                    <p>
                        {
                            pins.filter(
                                pin => pin.latestStatus === STATUS.INSPECTED
                            ).length
                        }
                    </p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="yellow pin" src={YellowPin} />
                    <p>
                        {
                            pins.filter(
                                pin => pin.latestStatus === STATUS.NO_ACTION
                            ).length
                        }
                    </p>
                </div>
                <div className="pin size-lg-6">
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
        </div>
    </div>
);

export default DrawingMapFiltersAdvanced;
