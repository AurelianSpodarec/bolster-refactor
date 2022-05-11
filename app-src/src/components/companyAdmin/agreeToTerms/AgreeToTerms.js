import React, { useState } from 'react';
import { connect } from 'react-redux';

import Form from 'components/shared/generic/form/containers/Form';
import Block from 'components/shared/generic/block/presentational/Block';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import agreeToTerms from 'actions/companyAdmin/legalDocuments/agreeToTerms';
import Field from 'components/shared/generic/form/presentational/Field';
import TsCsContainer from 'components/frontEnd/termsAndConditions/containers/Ts&CsContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const AgreeToTerms = ({ agreeToTerms, handleClick }) => {
    const [hasAgreed, setHasAgreed] = useState(false);

    return (
        <>
            <TsCsContainer />
            <div className="flex-row flex-wrap width-12 size-lg-12">
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
                            <ActionButton text="Confirm" type="submit" icon="check" />
                            <ActionButton text="Close" source="secondary" onClick={handleClick} />
                        </div>
                    </Form>
                </Block>
            </div>
        </>
    );
};

const mapState = { agreeToTerms };
export default connect(null, mapState)(AgreeToTerms);
