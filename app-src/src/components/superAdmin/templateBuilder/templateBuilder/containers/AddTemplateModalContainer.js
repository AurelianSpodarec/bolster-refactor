import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateFormModal from '../presentational/TemplateFormModal';
import { convertArrToObj } from 'helpers/generic';

class TemplateFormModalContainer extends React.Component {
    state = {
        name: '',
        serviceID: ''
    };

    render() {
        const { serviceID, ...otherFields } = this.state;
        const serviceOptions = this._getSeviceOptions();

        return (
            <TemplateFormModal
                {...otherFields}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                action="Add"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
            />
        );
    }

    componentDidMount = () => {
        const { fetchData } = this.props;
        fetchData();
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = e => {
        e.preventDefault();
        const { history, hideModal } = this.props;
        history.goBack();
        hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { companyID, uuid, setTemplate } = this.props;
        const { name } = this.state;
        const template = {
            companyID,
            uuid,
            name
        };

        setTemplate(template);
    };

    _getSeviceOptions = () => {
        const { services } = this.props;
        const options = services.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    superAdmin: {
        servicesReducer: { services }
    }
}) => ({ services: Object.values(services) });

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    setTemplate: template => {
        dispatch(setTemplate(template));
        dispatch(hideModal());
    },
    fetchData: () => {
        dispatch(fetchAllServices());
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateFormModalContainer);

export default withRouter(WithConnect);
