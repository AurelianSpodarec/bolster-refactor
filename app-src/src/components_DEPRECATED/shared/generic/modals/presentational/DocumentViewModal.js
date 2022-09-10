import React, { Component } from 'react';

import { DOCUMENT_VIEW_TYPES } from 'constants/companyAdmin/enums';

import Loading from '../../misc/presentational/Loading';
import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

class DocumentPreviewModal extends Component {
    state = { isLoading: true };

    render() {
        const { image, type, title = '', hideModal } = this.props;
        return (
            <FlexModalOuter title={title}>
                <div className="flex-content-wrapper">
                    <div className="flex-content">
                        {this.state.isLoading && <Loading message="Loading..." />}
                        {type === DOCUMENT_VIEW_TYPES.PDF ? (
                            <iframe
                                src={image}
                                id="pdf-preview"
                                type="application/pdf"
                                className="document-version-preview pdf-preview"
                                onLoad={() => this.setState({ isLoading: false })}
                                onError={() => this.setState({ isLoading: false })}
                                style={{
                                    padding: '1em',
                                    width: '100%',
                                    height: '500px',
                                }}
                                title="pdf-preview-iframe"
                            />
                        ) : (
                            <img
                                src={image}
                                alt="preview of the upload"
                                className="document-version-preview image-preview"
                                onLoad={() => this.setState({ isLoading: false })}
                                onError={() => this.setState({ isLoading: false })}
                                style={{
                                    padding: '1em',
                                }}
                            />
                        )}
                    </div>

                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <ActionButton text="Close" onClick={hideModal} />
                    </ButtonWrapper>
                </div>
            </FlexModalOuter>
        );
    }
}

export default DocumentPreviewModal;
