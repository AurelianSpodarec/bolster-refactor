import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GENERATION_STATE_VAL } from 'constants/companyAdmin/enums';

import HeaderProfile from '../presentational/HeaderProfile';

class HeaderProfileContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const {
            isImpersonating,
            companyName,
            profile,
            generationQueueLength
        } = this.props;
        return (
            <HeaderProfile
                updateNode={node => {
                    this.node = node;
                }}
                logout={this.logout}
                profile={profile}
                generationQueueLength={generationQueueLength}
                popupVisible={this.state.popupVisible}
                handleClick={this.handleClick}
                isImpersonating={isImpersonating}
                companyName={companyName}
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
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.handleClick();
    };

    logout = e => {
        this.handleClick();
        const { history } = this.props;
        e.preventDefault();
        localStorage.setItem('token', '');

        history.replace('/auth/login');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { name }
        }
    },
    superAdmin: { generationQueueReducer },
    shared: {
        profileReducer,
        decodeJWTReducer: {
            jwtData: { companyID, headquartersCompanyID }
        }
    }
}) => ({
    isImpersonating:
        companyID &&
        headquartersCompanyID &&
        companyID !== headquartersCompanyID,
    companyName: name,
    profile: profileReducer.profile || {},
    generationQueueLength: Object.values(
        generationQueueReducer.generationQueue
    ).filter(item => item.state === GENERATION_STATE_VAL.WAITING).length
});

export default withRouter(connect(mapStateToProps)(HeaderProfileContainer));
