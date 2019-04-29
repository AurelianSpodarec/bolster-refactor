import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import PinSectionsContainer from '../containers/PinSectionsContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const PinDetails = ({
    pin,
    pinHistory,
    user,
    services,
    handleDelete,
    handleEdit
}) => (
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

            {/* <FieldOutput
                title="Status"
                description={STATUS[pinHistory.status]}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            /> */}
        </div>

        <PinSectionsContainer pinHistory={pinHistory} />

        {/* <div className="field-output no-h-padding size-lg-12">
                <label className="title">Photo(s)</label>
                <PinImagesContainer images={pinHistory.photoIds} />
            </div> */}

        <BlockButtonWrapper>
            <button className="button red" onClick={handleDelete}>
                <i className="icon fa fa-trash-alt" /> Delete history
            </button>
            <button className="button yellow" onClick={handleEdit}>
                <i className="far fa-pencil" /> Edit history
            </button>
        </BlockButtonWrapper>
    </>
);

export default PinDetails;
