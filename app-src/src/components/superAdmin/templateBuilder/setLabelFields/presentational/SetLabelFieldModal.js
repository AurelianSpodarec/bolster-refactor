import React from 'react';

import ModalOuter from 'components/shared/generic/modals/presentational/ModalOuter';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import LabelFields from './LabelFields';

const SetLabelModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    labelType,
    fields,
    questionOptions
}) => (
    <ModalOuter extraClasses="wide w-form" hideModal={hideModal}>
        <BlockHeading title="Update Label Fields" />
        <Form className="generic-form labels-form" onSubmit={handleSubmit}>
            <LabelFields
                labelType={labelType}
                fields={[...fields].sort((a, b) => b.key - a.key)}
                handleChange={handleChange}
                questionOptions={questionOptions}
            />
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" />
                    Set
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuter>
);

export default SetLabelModal;
