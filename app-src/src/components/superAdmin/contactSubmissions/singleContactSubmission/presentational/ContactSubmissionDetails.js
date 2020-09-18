import React, { useState } from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import moment from 'moment';

const EnquiryDetails = ({
    handleShowModal,
    handleCommentModal,
    contactSubmission: {
        companyName,
        name,
        createdOn,
        contactNumber,
        email,
        message,
        id,
        contacted,
        comments,
    },
}) => {
    const [commentValue, setCommentValue] = useState(comments || '');

    return (
        <>
            <BlockHeading title="Contact Submission" />
            <div className="field-group size-lg-12">
                <div className="size-lg-4">
                    {!!name && (
                        <FieldOutput title="Name" description={name} fieldClass="no-h-padding" />
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
                            description={moment(createdOn).format('DD-MM-YYYY HH:mm')}
                            fieldClass="no-h-padding"
                        />
                    )}
                </div>
                <div className="size-lg-4">
                    {!!email && (
                        <FieldOutput title="Email" description={email} fieldClass="no-h-padding" />
                    )}

                    <FieldOutput
                        title="Contacted"
                        description={contacted ? 'Yes' : 'No'}
                        fieldClass="no-h-padding"
                    />
                </div>
            </div>
            <div className="size-lg-12">
                <FieldOutput title="Comments" fieldClass="comments">
                    <textarea
                        rows="5"
                        name="comments-textarea"
                        value={commentValue}
                        onChange={event => setCommentValue(event.target.value)}
                    >
                        {comments}
                    </textarea>
                </FieldOutput>
            </div>
            <BlockButtonWrapper>
                <button
                    onClick={() => handleCommentModal(id, commentValue)}
                    className="button green"
                >
                    <i className="far fa-save fa-fw" />
                    Save Comment
                </button>
                <button onClick={() => handleShowModal(id)} className="button red">
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
            </BlockButtonWrapper>
        </>
    );
};

export default EnquiryDetails;
