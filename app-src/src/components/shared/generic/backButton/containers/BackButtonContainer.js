import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackButton from '../presentational/BackButton';

class BackButtonContainer extends Component {
    render() {
        return <BackButton handleClick={this.handleClick} />;
    }

    handleClick = () => {
        const { history } = this.props;
        history.goBack();
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BackButtonContainer)
);
