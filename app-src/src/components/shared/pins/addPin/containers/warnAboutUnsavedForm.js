import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router';
import { connect } from 'react-redux';

function warnAboutUnsavedForm(WrappedComponent) {
    class WarnAboutUnsavedChanges extends Component {
        static defaultProps = {
            leaveMessage: 'Leave with unsaved change?'
        };

        componentDidUpdate() {
            this._promptUnsavedChange(this.props.leaveMessage);
        }

        componentWillUnmount() {
            window.onbeforeunload = null;
        }

        _promptUnsavedChange(isUnsaved = false, leaveMessage) {
            window.onbeforeunload = isUnsaved && (() => leaveMessage);
        }

        render() {
            return (
                <>
                    <WrappedComponent {...this.props} />
                    <Prompt when={true} message={this.props.leaveMessage} />
                </>
            );
        }
    }

    return withRouter(WarnAboutUnsavedChanges);
}

export default warnAboutUnsavedForm;
