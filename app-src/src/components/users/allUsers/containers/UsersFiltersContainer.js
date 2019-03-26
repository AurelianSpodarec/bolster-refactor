import React, { Component } from 'react';
import updateUsersFilters from 'actions/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { ROLE_TYPES } from 'constants/enums';

class UsersFiltersContainer extends Component {
    state = {
        roleOptions: {
            'Company Admin': { text: 'Company Admin', value: 'Company Admin' },
            Operative: { text: 'Operative', value: 'Operative' }
        }
    };
    render() {
        const { roleOptions } = this.state;

        const { email, role } = this.props.filters;
        const roleTypes = Object.entries(ROLE_TYPES).map(([type, role]) => ({
            text: role,
            value: type
        }));
        console.log(roleTypes, 'role types', role);
        return (
            <UsersFilters
                email={email}
                roleOptions={roleTypes}
                selectedRole={roleTypes[role]}
                handleChange={this.handleChange}
            />
        );
    }
    handleChange = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(updateUsersFilters(e.target.name, e.target.value));
    };
}

export default connect(({ usersReducer }) => ({
    filters: usersReducer.filters
}))(UsersFiltersContainer);
