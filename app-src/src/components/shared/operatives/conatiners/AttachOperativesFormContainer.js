import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AttachOperativesFormContainer extends Component {
    state = {
        userOptions: [],
        selectedOption: ''
    };

    render() {
        return (
            <BlockContainer>
                <AttachOperativesForm users={this.state.userOptions} />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { isFetching, users } = this.props;

        if (prevProps.isFetching && !isFetching) {
            this.setState({
                ...this.state,
                userOptions: users
            });
        }
    };
}

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    users: Object.values(companyUsersReducer.users),
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

export default connect(mapStateToProps)(AttachOperativesFormContainer);
