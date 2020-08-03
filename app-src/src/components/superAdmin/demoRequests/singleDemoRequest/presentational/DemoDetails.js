import React, { useState } from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import moment from 'moment';

const DemoDetails = ({
    handleShowModal,
    demoRequests: { companyName, name, createdOn, contactNumber, email, id, comments, contacted },
}) => {
    const [commentValue, setCommentValue] = useState(comments || '');

    return (
        <>
            <BlockHeading title="Demo Requests Details" />
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
            </div>

            <BlockButtonWrapper>
                <button onClick={() => handleShowModal(id, commentValue)} className="button green">
                    <i className="far fa-trash-alt" />
                    Save Comments
                </button>
            </BlockButtonWrapper>
        </>
    );
};

export default DemoDetails;
