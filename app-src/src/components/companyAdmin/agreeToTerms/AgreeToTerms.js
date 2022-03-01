import React, { useState } from 'react';
import { connect } from 'react-redux';

import Form from 'components/shared/generic/form/containers/Form';
import Block from 'components/shared/generic/block/presentational/Block';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import agreeToTerms from 'actions/companyAdmin/legalDocuments/agreeToTerms';
import Field from 'components/shared/generic/form/presentational/Field';
import TsCsContainer from 'components/frontEnd/termsAndConditions/containers/Ts&CsContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AgreeToTerms = ({ agreeToTerms, handleClick }) => {
    const [hasAgreed, setHasAgreed] = useState(false);

    return (
        <>
            <TsCsContainer />
            <div className="flex-row width-12 size-lg-12">
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
                            <ButtonContainer handleClick={handleClick}>
                                <i className="fa fa-times" />
                                Cancel
                            </ButtonContainer>
                        </div>
                    </Form>
                </Block>
            </div>
        </>
    );
};

const mapState = { agreeToTerms };
export default connect(null, mapState)(AgreeToTerms);
