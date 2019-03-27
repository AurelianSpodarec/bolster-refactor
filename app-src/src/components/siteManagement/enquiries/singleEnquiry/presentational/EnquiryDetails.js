import React from 'react';
import moment from 'moment';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EnquiryDetails = ({
    handleShowModal,
    enquiry: { companyName, name, createdOn, contactNumber, email, message, id }
}) => {
    return (
        <>
            <div className="size-lg-12">
                {!!name && <p className="size-lg-12">Name: {name}</p>}
                {!!companyName && (
                    <p className="size-lg-12">Company: {companyName}</p>
                )}
                {!!email && <p className="size-lg-12">Email: {email}</p>}
                {!!contactNumber && (
                    <p className="size-lg-12">
                        Contact Number: {contactNumber}
                    </p>
                )}
                {!!createdOn && (
                    <p className="size-lg-12">
                        Sent On:{' '}
                        {moment(createdOn).format('DD-MM-YYYY hh:mm a')}
                    </p>
                )}
                {!!message && <p>{message}</p>}
                <BlockButtonWrapper>
                    <button
                        onClick={() => handleShowModal(id)}
                        className="button red"
                    >
                        <i className="fa fa-times" />
                        Delete
                    </button>
                </BlockButtonWrapper>
            </div>
        </>
    );
};

export default EnquiryDetails;
