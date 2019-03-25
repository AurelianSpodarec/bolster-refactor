import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllUsers from 'actions/users/async/fetchAllUsers';
import AllUsers from '../presentational/AllUsers';

class AllUsersContainer extends Component {
    state = {
        filter: '',
        role: {
            text: '',
            value: ''
        }
    };
    componentDidMount() {
        this.props.fetchAllUsers();
    }
    handleSearchInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleRoleFilterChange = e => {
        const { value } = e.target;
        this.setState({
            role: {
                text: value,
                value
            }
        });
    };
    render() {
        return (
            <AllUsers
                filter={this.state.filter}
                role={this.state.role}
                handleSearchInputChange={this.handleSearchInputChange}
                handleRoleFilterChange={this.handleRoleFilterChange}
            />
        );
    }
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
