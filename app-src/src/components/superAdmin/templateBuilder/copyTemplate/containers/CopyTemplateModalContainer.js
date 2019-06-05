import React, { Component } from 'react';
import { connect } from 'react-redux';
import CopyTemplateModal from '../presentational/CopyTemplateModal';

class CopyTemplateModalContainer extends Component {
    state = {
        templateUUID: null
    };

    render() {
        const { templateUUID } = this.state;
        const { hideModal } = this.props;
        return (
            <CopyTemplateModal
                templateUUID={templateUUID}
                templateOptions={this._getTemplateOptions()}
                handleChange={this.handleChange}
                hideModal={hideModal}
            />
        );
    }

    _getTemplateOptions = () => {
        const { companies, templates } = this.props;

        return templates
            .map(({ name, uuid, companyID }) => {
                const company = companies[companyID];
                if (!company) return;

                return {
                    label: `${company.name} - ${name}`,
                    value: uuid
                };
            })
            .sort((a, b) => a.label.localeCompare(b.label));
    };

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };
}

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies },
        templatesReducer: { templates }
    }
}) => ({ companies, templates: Object.values(templates) });

export default connect(mapStateToProps)(CopyTemplateModalContainer);
