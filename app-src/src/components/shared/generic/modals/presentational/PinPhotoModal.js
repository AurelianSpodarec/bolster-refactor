import React, { Component } from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import loading from '../../../../../_content/images/layout/loading.gif';

class PinPhotoModal extends Component {
    state = { isLoading: true };
    render = () => (
        <ModalOuterContainer>
            {this.state.isLoading && (
                <img
                    alt="loading"
                    src={loading}
                    style={{ width: '10em', height: '10em' }}
                />
            )}
            <img
                alt="pin"
                src={this.props.image}
                // set the loading variable to false on load or error
                onLoad={() => this.setState({ isLoading: false })}
                onError={() => this.setState({ isLoading: false })}
                style={{
                    padding: '1em'
                }}
            />
        </ModalOuterContainer>
    );
}

export default PinPhotoModal;
