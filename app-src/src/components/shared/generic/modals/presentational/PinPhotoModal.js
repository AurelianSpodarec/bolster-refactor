import React, { Component } from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import Loading from '../../misc/presentational/Loading';

class PinPhotoModal extends Component {
    state = { isLoading: true };
    render = () => (
        <ModalOuterContainer>
            {this.state.isLoading && <Loading message="Loading photo..." />}
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
