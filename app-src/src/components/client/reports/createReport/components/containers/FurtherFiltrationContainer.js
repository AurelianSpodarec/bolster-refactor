import React, { Component } from 'react';
import { connect } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { CLIENT_FILTER_FIELDS } from 'constants/shared/modalTypes';

import FurtherFiltration from '../presentational/FurtherFiltration';
import ClientPinSelectorContainer from 'components/shared/pinSelector/container/ClientPinSelectorContainer';
import updateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import {
    convertEnumToDropdownOptions,
    removeDuplicates
} from 'helpers/generic';
import addFilterQuestion from 'actions/client/reports/create/sync/clientAddFilterQuestion';
import removeFilterQuestion from 'actions/client/reports/create/sync/clientRemoveFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import removeFilterQuestions from 'actions/client/reports/create/sync/clientRemoveFilterQuestions';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FilterField from '../presentational/FilterField';
import resetFilterOptions from 'actions/client/reports/create/sync/clientResetFilterOptions';

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
                <BlockHeading title="Advanced Filters" />
                <p className="generic-text small">
                    Here you can make create much more specific filters on your
                    data set.
                </p>
                <FurtherFiltration
                    furtherFiltrationOptions={filtrationOptionsArr}
                    selected={selected}
                    handleChange={this.handleChange}
                />
                {filterOption === '1' ? (
                    <ClientPinSelectorContainer blockName="pinSelector" />
                ) : filterOption === '2' ? (
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
                                <i className="fa fa-plus fa-fw" /> Add filter
                            </button>
                        </BlockButtonWrapper>
                    </div>
                ) : null}
            </BlockContainer>
        );
    }
    componentDidUpdate = (prevProps, prevState) => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions
        } = this.props;
        // reset filter fields if changing the filter
        const { filterOption } = this.state;
        if (prevState.filterOption !== filterOption) {
            removeFilterQuestions();
        }
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
        const { showModal, customQuestions } = this.props;
        showModal(CLIENT_FILTER_FIELDS, { customQuestions });
    };

    handleShowCustomFieldModal = id => {
        const { showModal, customQuestions } = this.props;
        showModal(CLIENT_FILTER_FIELDS, { customQuestions, id });
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

    handleChange = (name, value) => this.setState({ [name]: value });
}

const mapStateToProps = ({
    client: {
        reportsReducer: {
            customFilters: { questions },
            fields,
            filters
        }
    }
}) => ({
    customQuestions: questions || [],
    fields: Object.values(fields),
    filters
});

const mapDispatchToProps = {
    updateReportFilter,
    addFilterQuestion,
    removeFilterQuestion,
    removeFilterQuestions,
    showModal,
    hideModal,
    resetFilterOptions
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FurtherFiltrationContainer);
