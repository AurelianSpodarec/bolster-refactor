import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateOperativeAlertForm from '../presentational/CreateOperativeAlertForm';

class CreateOperativeAlertContainer extends Component {
    state = {
        message: ''
    };

    render() {
        return (
            <CreateOperativeAlertForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedSiteID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit = e => {
    //     e.preventDefault();

    //     const postBody = {
    //         ...this.state
    //     };

    //     this.props.createSite(postBody);
    // };
}

export default connect()(CreateOperativeAlertContainer);
