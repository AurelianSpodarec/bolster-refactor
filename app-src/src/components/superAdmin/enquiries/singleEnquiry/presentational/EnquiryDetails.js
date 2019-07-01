import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import moment from 'moment';

const EnquiryDetails = ({
    handleShowModal,
    enquiry: { companyName, name, createdOn, contactNumber, email, message, id }
}) => (
    <>
        <BlockHeading title="Enquirey Details" />
        <div className="field-group size-lg-12">
            <div className="size-lg-4">
                {!!name && (
                    <FieldOutput
                        title="Name"
                        description={name}
                        fieldClass="no-h-padding"
                    />
                )}
                {!!contactNumber && (
                    <FieldOutput
                        title="Contact Number"
                        description={contactNumber}
                        fieldClass="no-h-padding"
                    />
                )}
                {!!message && (
                    <FieldOutput
                        title="Message"
                        description={message}
                        fieldClass="no-h-padding"
                    />
                )}
            </div>
            <div className="size-lg-4">
                {!!companyName && (
                    <FieldOutput
                        title="Company Name"
                        description={companyName}
                        fieldClass="no-h-padding"
                    />
                )}

                {!!createdOn && (
                    <FieldOutput
                        title="Sent on"
                        description={moment(createdOn).format(
                            'DD-MM-YYYY HH:mm'
                        )}
                        fieldClass="no-h-padding"
                    />
                )}
            </div>
            <div className="size-lg-4">
                {!!email && (
                    <FieldOutput
                        title="Email"
                        description={email}
                        fieldClass="no-h-padding"
                    />
                )}
            </div>
        </div>

        <BlockButtonWrapper>
            <button onClick={() => handleShowModal(id)} className="button red">
                <i className="far fa-trash-alt" />
                Delete
            </button>
        </BlockButtonWrapper>
    </>
);

export default EnquiryDetails;
