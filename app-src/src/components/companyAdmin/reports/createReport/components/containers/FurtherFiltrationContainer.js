import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import CustomFiltersContainer from './CustomFiltersContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';

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
            <BlockContainer heading="Further Filtration">
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
                            {fields.map(({ id }) => (
                                <CustomFiltersContainer
                                    key={id}
                                    id={id}
                                    removeField={() =>
                                        this.removeCustomField(id)
                                    }
                                    questionOptions={this._getQuestionsOptions()}
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

    addCustomField = () => this.props.addFilterQuestion(uuid());

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

    handleChange = (name, value) => this.setState({ [name]: value });
}

const mapStateToProps = ({
    companyAdmin: {
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

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => dispatch(updateReportFilter(name, val)),
    addFilterQuestion: id => dispatch(addFilterQuestion(id)),
    removeFilterQuestion: id => dispatch(removeFilterQuestion(id)),
    removeFilterQuestions: () => dispatch(removeFilterQuestions())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FurtherFiltrationContainer);
