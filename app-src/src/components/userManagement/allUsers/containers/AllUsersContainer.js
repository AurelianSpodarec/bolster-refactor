import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllUsers from 'actions/users/async/fetchAllUsers';
import AllUsers from '../presentational/AllUsers';

class AllUsersContainer extends Component {
    state = {
        filter: '',
        role: '',
        roleOptions: {
            'Company Admin': { text: 'Company Admin', value: 'Company Admin' },
            Operative: { text: 'Operative', value: 'Operative' }
        }
    };

    render() {
        const { filter, role, roleOptions } = this.state;
        return (
            <AllUsers
                filter={filter}
                role={roleOptions[role]}
                roleOptions={Object.values(roleOptions)}
                handleInputChange={this.handleInputChange}
            />
        );
    }

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
}

const mapDispatchToProps = () => dispatch => ({
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    }
});
export default connect(
    null,
    mapDispatchToProps
)(AllUsersContainer);
