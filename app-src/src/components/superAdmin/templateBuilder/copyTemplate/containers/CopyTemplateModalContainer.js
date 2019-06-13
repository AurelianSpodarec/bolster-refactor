import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import newUUID from 'uuid/v1';

import CopyTemplateModal from '../presentational/CopyTemplateModal';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import postTemplate from 'actions/superAdmin/templateBuilder/async/postTemplate';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

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
                handleSubmit={this.handleSubmit}
            />
        );
    }

    _getTemplateOptions = () => {
        const { companies, templates } = this.props;

        return templates
            .map(({ name, uuid, companyID }) => {
                const company = companies[companyID];
                if (!company) return null;

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
                uuid: newUUID(),
                name: this.getNewTemplateName(companyTemplates, template.name),
                companyID
            };

            let newLabelFields = labelFields.map(lf => {
                const lfUUID = newUUID();
                return {
                    ...lf,
                    uuid: lfUUID,
                    templateUUID: newTemplateUUID
                };
            });

            const { newSections, newQuestions } = sections.reduce(
                (acc, sec) => {
                    const newSectionUUID = newUUID();
                    const newSection = {
                        ...sec,
                        uuid: newSectionUUID,
                        templateUUID: newTemplateUUID
                    };

                    const newSectionQuestions = questions
                        .filter(q => q.sectionUUID === sec.uuid)
                        .map(q => {
                            const qOldUUID = q.uuid;
                            const newQuestionUUID = newUUID();
                            newLabelFields = labelFields.map(lf => {
                                if (lf.config.questionUUID === qOldUUID) {
                                    lf.config.questionUUID = newQuestionUUID;
                                }
                                return lf;
                            });
                            return {
                                ...q,
                                uuid: newQuestionUUID,
                                sectionUUID: newSectionUUID,
                                templateUUID: newTemplateUUID
                            };
                        });

                    acc.newSections.push(newSection);
                    acc.newQuestions = acc.newQuestions.concat(
                        newSectionQuestions
                    );

                    return acc;
                },
                { newSections: [], newQuestions: [] }
            );

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

const mapDispatchToProps = { fetchTemplate, postTemplate };

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(CopyTemplateModalContainer);

export default withRouter(WithConnect);
