import React, { useState } from 'react';
import { connect } from 'react-redux';

import Form from 'components/shared/generic/form/containers/Form';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import WysiwygBlock from 'components/shared/generic/wysiwyg/presentational/WysiwygBlock';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import agreeToTerms from 'actions/companyAdmin/legalDocuments/agreeToTerms';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AgreeToTerms = ({ copy, agreeToTerms }) => {
    const [hasAgreed, setHasAgreed] = useState(false);

    return (
        <>
            <PageHeading title="Terms & Conditions"></PageHeading>
            <div className="flex-row size-lg-12">
                <Block>
                    <BlockHeading title="We've Updated Our Terms & Conditions" />
                    <WysiwygBlock>
                        <div dangerouslySetInnerHTML={{ __html: copy }}></div>
                    </WysiwygBlock>
                </Block>
            </div>
            <div className="flex-row size-lg-12">
                <Block>
                    <Form onSubmit={agreeToTerms}>
                        <Field required styles={{ minHeight: 0 }}>
                            <CheckboxContainer
                                required
                                name="hasAgreed"
                                text="I agree to the terms & conditions"
                                checked={hasAgreed}
                                handleChange={(_, val) => setHasAgreed(val)}
                            />
                        </Field>
                        <div className="button-area size-lg-12">
                            <button className="button green" type="submit">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Block>
            </div>
        </>
    );
};

const mapState = { agreeToTerms };
export default connect(null, mapState)(AgreeToTerms);
