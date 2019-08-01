import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import newUUID from 'uuid/v4';

import CopyTemplateModal from '../presentational/CopyTemplateModal';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import postTemplate from 'actions/superAdmin/templateBuilder/async/postTemplate';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import fetchCompanyTemplates from 'actions/superAdmin/companies/async/fetchCompanyTemplates';

class CopyTemplateModalContainer extends Component {
    state = {
        templateUUID: null,
        companyID: null
    };

    render() {
        const { templateUUID, companyID } = this.state;
        const { hideModal } = this.props;
        return (
            <CopyTemplateModal
                templateUUID={templateUUID}
                templateOptions={this._getTemplateOptions()}
                companyOptions={this._getCompanyOptions()}
                companyID={companyID}
                handleChange={this.handleChange}
                hideModal={hideModal}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = (_, prevState) => {
        const { companyID } = this.state;
        const { fetchCompanyTemplates } = this.props;
        if (prevState.companyID !== companyID) {
            fetchCompanyTemplates(companyID);
        }
    };

    _getCompanyOptions = () => {
        const { companies } = this.props;

        return Object.values(companies).map(({ name, id }) => ({
            name,
            label: name,
            value: id
        }));
    };

    _getTemplateOptions = () => {
        const { companies, templates } = this.props;
        const { companyID } = this.state;
        if (!companyID) return null;

        return templates
            .filter(template => template.companyID === companyID)
            .map(({ name, uuid, companyID }) => {
                const company = companies[companyID];
                if (!company) return null;

                return {
                    label: `${company.name} - ${name}`,
                    name: `${company.name} - ${name}`,
                    value: uuid
                };
            })
            .sort((a, b) => a.label.localeCompare(b.label));
    };

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { templateUUID } = this.state;
        const {
            fetchTemplate,
            templates,
            postTemplate,
            hideModal,
            showModal,
            history,
            companyID
        } = this.props;

        fetchTemplate(templateUUID).then(action => {
            const { template, sections, questions, labelFields } = action;

            const companyTemplates = templates.filter(
                t => t.companyID === template.companyID
            );

            const newTemplateUUID = newUUID();
            const newTemplate = {
                ...template,
                uuid: newTemplateUUID,
                name: this.getNewTemplateName(companyTemplates, template.name),
                companyID
            };

            const newSectionUUIDs = sections.reduce((acc, section) => {
                const newID = newUUID();
                acc[section.uuid] = newID;

                return acc;
            }, {});

            const newQuestionUUIDs = questions.reduce((acc, question) => {
                const newID = newUUID();
                acc[question.uuid] = newID;

                return acc;
            }, {});

            const newLabelFieldUUIDs = labelFields.reduce((acc, lf) => {
                const newID = newUUID();
                acc[lf.uuid] = newID;

                return acc;
            }, {});

            const newSections = sections.map(section => ({
                ...section,
                uuid: newSectionUUIDs[section.uuid],
                templateUUID: newTemplateUUID
            }));

            const newQuestions = questions.map(q => ({
                ...q,
                uuid: newQuestionUUIDs[q.uuid],
                templateUUID: newTemplateUUID,
                sectionUUID: newSectionUUIDs[q.sectionUUID],
                prereqUUID: newQuestionUUIDs[q.prereqUUID]
            }));

            const newLabelFields = labelFields.map(lf => ({
                ...lf,
                uuid: newLabelFieldUUIDs[lf.uuid],
                templateUUID: newTemplateUUID,
                config: {
                    ...lf.config,
                    questionUUID: newQuestionUUIDs[lf.config.questionUUID]
                }
            }));

            const templateData = {
                template: newTemplate,
                labelFields: newLabelFields,
                sections: newSections,
                questions: newQuestions
            };

            postTemplate(templateData)
                .then(({ template: newTemp }) => {
                    const newPath = `/admin/companies/${companyID}/template/${
                        newTemp.uuid
                    }`;

                    history.push(newPath);
                    hideModal();
                })
                .catch(() => {
                    showModal(ERROR_MODAL, {});
                });
        });
    };

    // recersively checks for conflicting a name adding '(copy) each time
    getNewTemplateName = (templates, curName) => {
        if (templates.some(({ name }) => name === curName)) {
            return this.getNewTemplateName(templates, curName + '(copy)');
        }

        return curName;
    };
}

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies },
        templatesReducer: { templates }
    }
}) => ({ companies, templates: Object.values(templates) });

const mapDispatchToProps = {
    fetchTemplate,
    postTemplate,
    fetchCompanyTemplates
};

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(CopyTemplateModalContainer);

export default withRouter(WithConnect);
