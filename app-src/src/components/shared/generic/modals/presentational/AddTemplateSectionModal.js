import React from 'react';
import image from '_content/images/examples/pipe.jpg';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import PageHeading from '../../pageHeading/presentational/PageHeading';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const AddTemplateSectionModal = ({ name }) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title="Add Section" />

        <Form className="generic-form">
            <div className="size-lg-6">
                <Field name="Section name">
                    <TextInputContainer
                        name="sectioName"
                        value={name}
                        required
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button ">
                    <i className="fa fa-plus" /> Add Section
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateSectionModal;
