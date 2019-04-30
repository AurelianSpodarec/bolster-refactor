import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ReportFormatsContainer from '../containers/ReportFormatsContainer';
import OtherOptionsContainer from '../containers/OtherOptionsContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const OutputSettings = () => (
    <Form>
        <div className="size-lg-12">
            <BlockContainer>
                <div className="size-lg-12">
                    <BlockHeading title="Output Settings" />
                    <div className="generic-form">
                        <div className="size-lg-6">
                            <ReportFormatsContainer />
                        </div>
                        <div className="size-lg-6">
                            <OtherOptionsContainer />
                        </div>
                        <BlockButtonWrapper>
                            <button className="button green" type="submit">
                                <i className="fa fa-file" />
                                Generate report
                            </button>
                        </BlockButtonWrapper>
                    </div>
                </div>
            </BlockContainer>
        </div>
    </Form>
);

export default OutputSettings;
