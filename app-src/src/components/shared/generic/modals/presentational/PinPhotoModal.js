import React, { Component } from 'react';
import ActionButton from '../../button/presentational/ActionButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

import Loading from '../../misc/presentational/Loading';
import FlexModalOuter from './FlexModalOuter';

class PinPhotoModal extends Component {
    state = { isLoading: true };

    render = () => {
        const { hideModal } = this.props;

        return (
            <FlexModalOuter title="View Photo">
                <div className="flex-content-wrapper">
                    <div className="flex-content">
                        {this.state.isLoading && <Loading message="Loading photo..." />}
                        <img
                            alt="pin"
                            src={this.props.image}
                            // set the loading variable to false on load or error
                            onLoad={() => this.setState({ isLoading: false })}
                            onError={() => this.setState({ isLoading: false })}
                        />
                    </div>

                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <ActionButton text="Close" onClick={hideModal} />
                    </ButtonWrapper>
                </div>
            </FlexModalOuter>
        );
    };
}

export default PinPhotoModal;
