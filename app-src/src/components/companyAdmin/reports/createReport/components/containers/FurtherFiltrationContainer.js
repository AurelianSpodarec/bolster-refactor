import React, { Component } from 'react';
import { connect } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { FILTER_FIELDS, CONFIRM_SUBMIT } from 'constants/shared/modalTypes';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import {
    convertEnumToDropdownOptions,
    removeDuplicates,
    isObjEmpty
} from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FilterField from '../presentational/FilterField';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';
import MapPinSelectorContainer from 'components/shared/pinSelector/container/MapPinSelectorContainer';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import updateFurtherFiltrationOption from 'actions/companyAdmin/reports/sync/updateFurtherFiltrationOption';
import FilterFieldsModalContainer from './FilterFieldsModalContainer';

class FurtherFiltrationContainer extends Component {
    state = {
        addFilter: false
    };
    render() {
        const {
            fields,
            filters: { drawingID, reportHistories },
            furtherFiltrationOption
        } = this.props;
        const filtrationOptions = convertEnumToDropdownOptions(
            FURTHER_FILTRATION
        );
        const filtrationOptionsArr = Object.values(filtrationOptions).filter(
            ({ text }) => drawingID || text !== 'Individual Pins'
        );
        const selected = filtrationOptions[furtherFiltrationOption];

        return (
            <BlockContainer>
                <BlockHeading title="Advanced Filters" />
                <p className="generic-text small">
                    Here you can make create much more specific filters on your
                    data set.
                </p>
                <FurtherFiltration
                    furtherFiltrationOptions={filtrationOptionsArr}
                    selected={selected}
                    handleChange={this.handleChange}
                    handleNumOfHistoriesChange={this.handleNumOfHistoriesChange}
                    selectedHistoryNum={reportHistories}
                />
                {furtherFiltrationOption === '1' ? (
                    <PinSelectorContainer blockName="pinSelector" />
                ) : furtherFiltrationOption === '2' ? (
                    <MapPinSelectorContainer blockName="pinSelector" />
                ) : furtherFiltrationOption === '3' ? (
                    this.state.addFilter ? (
                        <FilterFieldsModalContainer
                            toggleAddFilter={this.toggleAddFilter}
                        />
                    ) : (
                        <div className="custom-filters-block">
                            <div className="size-lg-12">
                                {fields.map(field => (
                                    <FilterField
                                        key={field.id}
                                        field={field}
                                        questions={this._getQuestionsOptions()}
                                        handleShowCustomFieldModal={
                                            this.handleShowCustomFieldModal
                                        }
                                        removeCustomField={
                                            this.removeCustomField
                                        }
                                    />
                                ))}
                            </div>

                            <BlockButtonWrapper>
                                <button
                                    onClick={this.toggleAddFilter}
                                    type="button"
                                    className="button green"
                                >
                                    <i className="fa fa-plus fa-fw" /> Add
                                    filter
                                </button>
                            </BlockButtonWrapper>
                        </div>
                    )
                ) : null}
            </BlockContainer>
        );
    }
    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions,
            furtherFiltrationOption,
            updateFurtherFiltrationOption
        } = this.props;
        // reset filter fields if changing the filter
        if (prevProps.furtherFiltrationOption !== furtherFiltrationOption) {
            removeFilterQuestions();
        }
        // reset further filters if site info changes
        if (
            siteID !== prevProps.filters.siteID ||
            buildingID !== prevProps.filters.buildingID ||
            floorID !== prevProps.filters.floorID ||
            drawingID !== prevProps.filters.drawingID
        ) {
            updateFurtherFiltrationOption(0);
            removeFilterQuestions();
        }
    };

    toggleAddFilter = () => {
        this.setState({ addFilter: !this.state.addFilter });
    };
    addCustomField = () => {
        const { showModal, customQuestions } = this.props;
        showModal(FILTER_FIELDS, { customQuestions });
    };

    handleShowCustomFieldModal = id => {
        const { showModal, customQuestions } = this.props;
        showModal(FILTER_FIELDS, { customQuestions, id });
    };

    removeCustomField = id => this.props.removeFilterQuestion(id);

    _getQuestionsOptions = () => {
        const { customQuestions } = this.props;
        const uniques = removeDuplicates(customQuestions, true);
        const options = uniques.reduce(
            (acc, curr) => ({
                ...acc,
                [curr.id]: { value: curr.id, text: curr.name }
            }),
            {}
        );
        return options;
    };

    handleChange = (_, value) => {
        this.props.updateFurtherFiltrationOption(value);
    };

    handleNumOfHistoriesChange = (name, value) => {
        const {
            handleChange,
            postFilters,
            showModal,
            hideModal,
            shouldConfirm
        } = this.props;

        if (shouldConfirm) {
            const handleSubmit = () => {
                hideModal();
                handleChange(name, value).then(postFilters);
            };
            const message =
                'Changing this will reset your advanced filters options, continue?';
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            handleChange(name, value).then(postFilters);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { pins = [], questions = [] },
            filters: { pinIDs: ids = [] },
            fields,
            filters,
            furtherFiltrationOption
        }
    }
}) => ({
    customQuestions: questions,
    fields: Object.values(fields),
    filters,
    shouldConfirm: !isObjEmpty(fields) || pins.length !== ids.length,
    furtherFiltrationOption
});

const mapDispatchToProps = {
    updateReportFilter,
    addFilterQuestion,
    removeFilterQuestion,
    removeFilterQuestions,
    showModal,
    hideModal,
    resetFilterOptions,
    updateFurtherFiltrationOption
};

export default withUpdateOnChange(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FurtherFiltrationContainer)
);
