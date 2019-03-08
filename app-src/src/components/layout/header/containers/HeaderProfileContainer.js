import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderProfile from '../presentational/HeaderProfile';

class HeaderProfileContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const { state, props, handleClick } = this;

        return (
            <HeaderProfile
                updateNode={node => {
                    this.node = node;
                }}
                profile={props.profile}
                generationQueueLength={props.generationQueueLength}
                popupVisible={state.popupVisible}
                handleClick={handleClick}
            />
        );
    }

    handleClick = () => {
        if (!this.state.popupVisible) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible
        }));
    };

    handleOutsideClick = e => {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        this.handleClick();
    };
}

const mapStateToProps = ({ profileReducer, generationQueueReducer }) => ({
    profile: profileReducer.profile,
    generationQueueLength: Object.values(
        generationQueueReducer.generationQueue
    ).filter(item => item.status.toLowerCase() === 'pending').length
});

export default connect(mapStateToProps)(HeaderProfileContainer);
