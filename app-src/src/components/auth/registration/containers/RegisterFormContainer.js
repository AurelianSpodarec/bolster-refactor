import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchTimeZones from 'actions/shared/time/async/fetchTimezones';
import RegisterForm from '../presentational/RegisterForm';

class RegisterFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        //company name
        name: '',
        telephone: '',
        businessName: '',
        culture: '',
        addressLine1: '',
        town: '',
        postcode: '',
        VATType: '',
        VATCode: '',
        dateFormatID: '',
        TimeZone: ''
    };

    render() {
        const { TimeZone } = this.state;

        const timeZoneOptions = this._getTimesZoneOptions();
        const selectedTimeZone = timeZoneOptions.find(
            ({ value }) => value === TimeZone
        );

        return (
            <RegisterForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                timeZoneOptions={timeZoneOptions}
                selectedTimeZone={selectedTimeZone}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        this.props.postLogin(email, password);
    };

    _getTimesZoneOptions = () => {
        const { timeZones } = this.props;

        return timeZones.map(({ id, name }) => ({
            value: id,
            text: name
        }));
    };

    componentDidMount = () => {
        const { fetchTimeZones } = this.props;

        fetchTimeZones();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        // if (postSuccess && !prevProps.postSuccess) {
        //     authenticate().then(({ isSuperAdmin }) => {
        //         history.push(isSuperAdmin ? '/admin' : '/company');
        //     });
        // }
    };
}

const mapStateToProps = ({
    shared: {
        timeReducer: { timeZones }
    }
}) => ({
    timeZones: Object.values(timeZones)
});

const mapDispatchToProps = dispatch => ({
    fetchTimeZones: () => {
        dispatch(fetchTimeZones());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);
