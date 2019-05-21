import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import PinSectionsContainer from '../containers/PinSectionsContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const PinDetails = ({ pin, pinHistory, user, services, drawingID }) => (
    <>
        <div className="size-lg-12">
            <FieldOutput
                title="Pin number"
                description={pin.pinCode}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />

            <FieldOutput
                title="Date created"
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            >
                <p>
                    <DateTimeContainer date={pinHistory.createdOn} />
                </p>
            </FieldOutput>

            <FieldOutput
                title="Type"
                description={services[pinHistory.serviceID].name}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />

            <FieldOutput
                title="Added by"
                description={`${user.userFirstName} ${user.userLastName}`}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />
        </div>

        <PinSectionsContainer pinHistory={pinHistory} drawingID={drawingID} />
    </>
);

export default PinDetails;
