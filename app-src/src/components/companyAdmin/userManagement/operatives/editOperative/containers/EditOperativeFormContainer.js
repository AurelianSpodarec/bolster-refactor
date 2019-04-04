import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditOperative from '../presentational/EditOperative';

class EditOperativeFormContainer extends Component {
    render() {
        const { id } = this.props;
        return <EditOperative handleSubmit={this.handleSubmit} userID={id} />;
    }

    componentDidMount() {
        // const { id } = this.props.match.params.id;
        // const { fetchSingleCompanyUser } = this.props;
        // fetchSingleCompanyUser(id);
    }
}

const mapDispatchToProps = dispatch => ({
    // fetchCompanyUser: id => {
    //     dispatch(fetchSingleCompanyUser(id));
    // }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditOperativeFormContainer)
);
