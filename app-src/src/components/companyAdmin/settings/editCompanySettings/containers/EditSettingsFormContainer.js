import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsForm from '../presentational/EditSettingsForm';

class EditSettingsFormContainer extends Component {
    state = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        logoFile: null,
        colourCode: null,
        isBolsterLogoDark: false,
        telephone: null,
        fax: null,
        labelTelNumber: null,
        labelCompanyName: null,
        hideOnClientList: false,
        defaultTemplateUsageRule: 0
    };

    render() {
        return (
            <EditSettingsForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleFileChange={this.handleFileChange}
            />
        );
    }

    componentDidMount = () => {
        const { companySettings } = this.props;
        this.setState({
            ...companySettings
        });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleSubmit = e => {
        e.preventDefault();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { isFetching, error, companySettings }
    }
}) => ({
    isFetching,
    error,
    companySettings
});

export default connect(mapStateToProps)(EditSettingsFormContainer);
