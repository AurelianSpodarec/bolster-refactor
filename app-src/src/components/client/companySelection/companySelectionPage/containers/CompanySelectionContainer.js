import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanySelectionForm from '../presentational/CompanySelectionForm';

class CompanySelectionContainer extends Component {
    state = {
        selectedCompany: null,
        companyOptions: [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' }
        ]
    };

    render = () => (
        <CompanySelectionForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
        />
    );

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const { postLogin } = this.props;
        const { email, password } = this.state;
        postLogin(email, password);
    };

    // componentDidUpdate = prevProps => {
    //     const {
    // companyOptions
    //         selectedCompany,
    //         history
    //     } = this.props;

    // if(isFetching && prevProps.isFetching && companyOptions.length) {
    //     this.setState({companyOptions: companyOptions})
    // }

    // if(selectedCompany && selectedCompany !== prevProps.selectedCompany) {
    //     history.push('client company site')
    //     // navigate to company area for that client
    // }
}

// todo include once the api is set up
// companies, selected company
// const mapStateToProps = ({}) => ({});

// todo fetch the companies list that the client has access to
// todo select the company by it's id
// const mapDispatchToProps = dispatch => ({});

export default withRouter(connect()(CompanySelectionContainer));
