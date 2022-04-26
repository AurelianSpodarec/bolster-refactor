import React, { Component } from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import Loading from '../../misc/presentational/Loading';

import { DOCUMENT_VIEW_TYPES } from 'constants/companyAdmin/enums';

class DocumentPreviewModal extends Component {
    state = { isLoading: true };

    render() {
        const { image, type } = this.props;
        return (
            <ModalOuterContainer>
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
            </ModalOuterContainer>
        );
    }
}

export default DocumentPreviewModal;
