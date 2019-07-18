import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { convertArrToObj, isEmpty } from 'helpers/generic';
import AddServiceForm from '../presentational/AddServiceForm';
import createService from 'actions/superAdmin/services/async/createService';
import postTemplatesForService from 'actions/superAdmin/services/async/postTemplatesForService';

import { ADMIN_CREATE_SERVICE_SUCCESS } from 'constants/actionTypes/services';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchTemplatesSimple from 'actions/superAdmin/templateBuilder/async/fetchTemplatesSimple';

class AddServiceFormContainer extends Component {
    state = {
        name: '',
        templateUUIDs: [],
        showOnCompanySite: true
    };

    render() {
        const templateOptions = this._getTemplateOptions();
        const { isFetching, error, templates } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(templates)}
                noWhiteBackground
            >
                <AddServiceForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    templateOptions={Object.values(templateOptions)}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchTemplatesSimple();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push('/admin/services');
        }
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();

        const { createService, postTemplatesForService } = this.props;
        const { name, templateUUIDs, showOnCompanySite } = this.state;

        createService({ name, showOnCompanySite }).then(action => {
            if (action.type === ADMIN_CREATE_SERVICE_SUCCESS) {
                const service = action.payload;

                postTemplatesForService(service.id, {
                    templateIDs: templateUUIDs
                });
            }
        });
    };

    _getTemplateOptions = () => {
        const { templates } = this.props;

        const options = templates
            .map(({ name, uuid, companyName }) => {
                return {
                    label: `${companyName} - ${name}`,
                    text: `${companyName} - ${name}`,
                    value: uuid
                };
            })
            .sort((a, b) => a.label.localeCompare(b.label));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    superAdmin: {
        adminServicesReducer: { postSuccess },
        templatesReducer: { templates, isFetching, error }
    }
}) => ({ postSuccess, templates: Object.values(templates), isFetching, error });

const mapDispatchToProps = {
    createService,
    postTemplatesForService,
    fetchTemplatesSimple
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddServiceFormContainer)
);
