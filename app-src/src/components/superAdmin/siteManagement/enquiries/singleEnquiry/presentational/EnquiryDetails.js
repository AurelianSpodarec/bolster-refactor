import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const EnquiryDetails = ({
    handleShowModal,
    enquiry: { companyName, name, createdOn, contactNumber, email, message, id }
}) => (
    <div className="size-lg-12">
        {!!name && <p className="size-lg-12">Name: {name}</p>}
        {!!companyName && <p className="size-lg-12">Company: {companyName}</p>}
        {!!email && <p className="size-lg-12">Email: {email}</p>}
        {!!contactNumber && (
            <p className="size-lg-12">Contact Number: {contactNumber}</p>
        )}
        {!!createdOn && (
            <p className="size-lg-12">
                Sent On: <DateTimeContainer date={createdOn} />
            </p>
        )}
        {!!message && <p>{message}</p>}
        <BlockButtonWrapper>
            <button onClick={() => handleShowModal(id)} className="button red">
                <i className="far fa-trash-alt" />
                Delete
            </button>
        </BlockButtonWrapper>
    </div>
);

export default EnquiryDetails;
