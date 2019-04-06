import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import TestFileUploadFormContainer from '../containers/TestFileUploadFormContainer';

const TestFileUploadPage = () => (
    <div className="auth size-lg-12">
        <div className="content-container size-lg-12">
            <h1 className="heading heading-1 size-lg-12">File upload test</h1>
        </div>

        <Block>
            <h3 className="heading heading-3 size-lg-12">Upload files</h3>
            <TestFileUploadFormContainer />
        </Block>
    </div>
);

export default TestFileUploadPage;
