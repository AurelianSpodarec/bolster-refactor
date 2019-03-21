import React from 'react';

import Filter from 'components/shared/generic/form/presentational/Filter';
import RedPin from '_content/images/pins/red-pin.png';
import GreenPin from '_content/images/pins/green-pin.png';
import BluePin from '_content/images/pins/blue-pin.png';
import YellowPin from '_content/images/pins/yellow-pin.png';

const DrawingMapFiltersAdvanced = ({
    serviceTypeOptions,
    serviceTypeSelected,
    handleInputChange = () => {},
    pins
}) => (
    <div className="form size-lg-12">
        <div className="size-lg-9">
            <div className="size-lg-6">
                <Filter
                    title="Service type"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                    handleInputChange={handleInputChange}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Status"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                    handleInputChange={handleInputChange}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Time period"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                    handleInputChange={handleInputChange}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Operative"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                    handleInputChange={handleInputChange}
                />
            </div>
        </div>

        <div className="size-lg-3">
            <div className="pin-amounts" style={{ top: '5px' }}>
                <div className="pin size-lg-6">
                    <img alt="red pin" src={RedPin} />
                    <p>100</p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="green pin" src={GreenPin} />
                    <p>100</p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="blue pin" src={BluePin} />
                    <p>100</p>
                </div>
                <div className="pin size-lg-6">
                    <img alt="yellow pin" src={YellowPin} />
                    <p>100</p>
                </div>
            </div>
        </div>
    </div>
);

export default DrawingMapFiltersAdvanced;
