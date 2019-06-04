import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { isObjEmpty } from 'helpers/generic';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT, FILTER_FIELDS } from 'constants/shared/modalTypes';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FilterField from '../presentational/FilterField';

class FurtherFiltrationContainer extends Component {
    state = { filterOption: 0 };

    render() {
        const { filterOption } = this.state;
        const {
            fields,
            filters: { drawingID }
        } = this.props;
        const filtrationOptions = convertEnumToDropdownOptions(
            FURTHER_FILTRATION
        );
        const filtrationOptionsArr = Object.values(filtrationOptions).filter(
            ({ text }) => drawingID || text !== 'Pin Selection'
        );
        const selected = filtrationOptions[filterOption];

        return (
            <BlockContainer>
                <BlockHeading title="Further Filtration" />
                <p className="generic-text small">
                    ##Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce maximus mi id tempor scelerisque. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit.##
                </p>
                <FurtherFiltration
                    furtherFiltrationOptions={filtrationOptionsArr}
                    selected={selected}
                    handleChange={this.handleChange}
                />
                {filterOption === '1' ? (
                    <PinSelectorContainer />
                ) : filterOption === '2' ? (
                    <div className="custom-filters-block ignore-padding">
                        <div className="size-lg-12">
                            {fields.map(field => (
                                <FilterField
                                    key={field.id}
                                    field={field}
                                    questions={this._getQuestionsOptions()}
                                    handleShowCustomFieldModal={
                                        this.handleShowCustomFieldModal
                                    }
                                    removeCustomField={this.removeCustomField}
                                />
                            ))}
                        </div>

                        <BlockButtonWrapper>
                            <button
                                onClick={this.addCustomField}
                                type="button"
                                className="button green"
                            >
                                <i className="fa fa-plus" /> Add field
                            </button>
                        </BlockButtonWrapper>
                    </div>
                ) : null}
            </BlockContainer>
        );
    }
    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions
        } = this.props;

        // reset further filters if site info changes
        if (
            siteID !== prevProps.filters.siteID ||
            buildingID !== prevProps.filters.buildingID ||
            floorID !== prevProps.filters.floorID ||
            drawingID !== prevProps.filters.drawingID
        ) {
            this.setState({ filterOption: 0 });
            removeFilterQuestions();
        }
    };

    addCustomField = () => {
        const { addFilterQuestion, showModal, customQuestions } = this.props;
        const id = uuid();
        addFilterQuestion(id);
        showModal(FILTER_FIELDS, { id, customQuestions });
    };

    handleShowCustomFieldModal = id => {
        const { showModal, customQuestions } = this.props;
        showModal(FILTER_FIELDS, { customQuestions, id });
    };

    removeCustomField = id => this.props.removeFilterQuestion(id);

    _getQuestionsOptions = () => {
        return this.props.customQuestions.reduce(
            (acc, curr) => ({
                ...acc,
                [curr.id]: { value: curr.id, text: curr.name }
            }),
            {}
        );
    };

    handleChange = (name, value) => {
        const { shouldConfirm, showModal, hideModal } = this.props;
        if (shouldConfirm) {
            const handleSubmit = () => {
                this.setState({ [name]: value });
                hideModal();
            };
            const message =
                'Changing this will reset your further filtration options, continue?';
            // * confirm and then do this:
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            this.setState({ [name]: value });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { questions, pins = [] },
            fields,
            filters
        }
    }
}) => ({
    customQuestions: questions || [],
    fields: Object.values(fields),
    filters,
    shouldConfirm: !isObjEmpty(fields) || pins.length !== filters.pinIDs.length
});

const mapDispatchToProps = {
    updateReportFilter,
    addFilterQuestion,
    removeFilterQuestion,
    removeFilterQuestions,
    showModal,
    hideModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FurtherFiltrationContainer);
