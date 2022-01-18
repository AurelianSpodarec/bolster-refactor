import React, { Component } from 'react';
import { connect } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { FILTER_FIELDS, CONFIRM_SUBMIT, LOADING_DATA } from 'constants/shared/modalTypes';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertEnumToDropdownOptions, removeDuplicates, isObjEmpty } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION, FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FilterField from '../presentational/FilterField';
import MapPinSelectorContainer from 'components/shared/pinSelector/container/MapPinSelectorContainer';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import updateFurtherFiltrationOption from 'actions/companyAdmin/reports/sync/updateFurtherFiltrationOption';
import FilterFieldsModalContainer from './FilterFieldsModalContainer';
import ZoneSelectorContainer from 'components/shared/pinSelector/container/ZoneSelectorContainer';
import { NUMBER_OF_HISTORIES, NUMBER_OF_HISTORIES_WITH_DATE } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
const { PIN_SELECTOR, INDIVIDUAL_PINS, FILTERS, ZONES } = FURTHER_FILTRATION_OPTIONS;

class FurtherFiltrationContainer extends Component {
    state = {
        // only show add if no filters are already there
        addFilter: this.props.fields.length ? false : true,
        filterToEditID: null,
    };
    render() {
        const {
            fields,
            filters: { drawingID, reportHistories, fromDateInclusive, toDateInclusive },
            furtherFiltrationOption,
        } = this.props;
        const filtrationOptions = convertEnumToDropdownOptions(FURTHER_FILTRATION);

        const filtrationOptionsArr = Object.values(filtrationOptions).filter(
            ({ value }) => drawingID.length || +value === FILTERS,
        );
        const selected = filtrationOptions[furtherFiltrationOption];

        const historyNumsOptions = Object.entries(
            !fromDateInclusive && !toDateInclusive
                ? NUMBER_OF_HISTORIES
                : NUMBER_OF_HISTORIES_WITH_DATE,
        ).map(([value, label]) => ({
            value: +value,
            label,
        }));

        return (
            <BlockContainer>
                <BlockHeading title="Advanced Filters" />
                <p className="generic-text small">
                    Here you can make create much more specific filters on your data set.
                </p>
                <FurtherFiltration
                    furtherFiltrationOptions={filtrationOptionsArr}
                    selected={selected}
                    handleChange={this.handleChange}
                    handleNumOfHistoriesChange={this.handleNumOfHistoriesChange}
                    historyNumsOptions={historyNumsOptions}
                    selectedHistoryNum={reportHistories}
                />
                {+furtherFiltrationOption === +ZONES ? (
                    <ZoneSelectorContainer blockName="zoneSelector" />
                ) : +furtherFiltrationOption === +INDIVIDUAL_PINS ? (
                    <PinSelectorContainer blockName="pinSelector" />
                ) : +furtherFiltrationOption === +PIN_SELECTOR ? (
                    <MapPinSelectorContainer
                        handleClick={this._scrollToMap}
                        blockName="pinSelector"
                    />
                ) : +furtherFiltrationOption === +FILTERS ? (
                    <div className="custom-filters-block">
                        <Field
                            name="Exact match?"
                            classes="fields-inside"
                            sizeClasses="size-lg-2 size-md-12"
                        >
                            <CheckboxContainer
                                checked={this.props.filters.isQuestionFilterExact}
                                name="isQuestionFilterExact"
                                text=""
                                handleChange={this.handleExactMatchChange}
                            />
                        </Field>

                        {this.state.addFilter ? (
                            <FilterFieldsModalContainer
                                id={this.state.filterToEditID}
                                toggleAddFilter={this.toggleAddFilter}
                            />
                        ) : (
                            <>
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
                                            isQuestionFilterExact={
                                                this.props.filters.isQuestionFilterExact
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
                                        <i className="fa fa-plus fa-fw" /> Add filter
                                    </button>
                                </BlockButtonWrapper>
                            </>
                        )}
                    </div>
                ) : null}
            </BlockContainer>
        );
    }
    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions,
            furtherFiltrationOption,
            updateFurtherFiltrationOption,
            isFetching,
            showModal,
            hideModal,
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
        // loading filters - slow on live
        if (isFetching && !prevProps.isFetching) {
            showModal(LOADING_DATA, {
                message: 'Filtering Pins, please wait.',
            });
        }

        // finished loading filters
        if (!isFetching && prevProps.isFetching) {
            hideModal();
        }
    };
    _scrollToMap = () => {
        window.scrollTo({ top: '300', behavior: 'smooth' });
    };

    toggleAddFilter = () => {
        this.setState({
            addFilter: !this.state.addFilter,
            filterToEditID: null,
        });
    };

    addCustomField = () => {
        const { showModal, customQuestions } = this.props;
        showModal(FILTER_FIELDS, { customQuestions });
    };

    handleShowCustomFieldModal = id => {
        this.setState({
            addFilter: !this.state.addFilter,
            filterToEditID: id,
        });
    };

    removeCustomField = async id => {
        const { removeFilterQuestion } = this.props;
        await removeFilterQuestion(id);
    };

    _getQuestionsOptions = () => {
        const { customQuestions } = this.props;
        const uniques = removeDuplicates(customQuestions, true);
        const options = uniques.reduce(
            (acc, curr) => ({
                ...acc,
                [curr.id]: { value: curr.id, text: curr.name },
            }),
            {},
        );
        return options;
    };

    handleChange = async (_, value) => {
        const { updateFurtherFiltrationOption } = this.props;
        await updateFurtherFiltrationOption(value);
    };

    handleExactMatchChange = async (_, value) => {
        const { postFilters, handleChange } = this.props;
        handleChange('isQuestionFilterExact', value).then(postFilters);
    };

    handleNumOfHistoriesChange = (name, value) => {
        const { handleChange, showModal, hideModal, shouldConfirm } = this.props;

        if (shouldConfirm) {
            const handleSubmit = () => {
                hideModal();
                handleChange(name, value);
            };
            const message = 'Changing this will reset your advanced filters options, continue?';
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            handleChange(name, value);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { pins = [], questions = [] },
            filters: { pinIDs: ids = [], siteID, companyUserIDs = [] },
            fields,
            filters,
            furtherFiltrationOption,
            isFetching,
        },
    },
}) => ({
    customQuestions: questions,
    fields: Object.values(fields),
    filters,
    shouldConfirm: !isObjEmpty(fields) || pins.length !== ids.length,
    furtherFiltrationOption,
    isFetching,
    isDisabled: !companyUserIDs.length && !siteID,
});

const mapDispatchToProps = {
    updateReportFilter,
    addFilterQuestion,
    removeFilterQuestion,
    removeFilterQuestions,
    showModal,
    hideModal,
    updateFurtherFiltrationOption,
};

export default withUpdateOnChange(
    connect(mapStateToProps, mapDispatchToProps)(FurtherFiltrationContainer),
);
