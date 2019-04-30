import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import CustomFiltersContainer from './CustomFiltersContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';

class FurtherFiltrationContainer extends Component {
    state = { filterOption: 0 };

    render() {
        const { drawingID } = this.props.filters;
        const filtrationOptions = convertEnumToDropdownOptions(
            FURTHER_FILTRATION
        );
        const filtrationOptionsArr = Object.values(filtrationOptions).filter(
            ({ text }) => drawingID || text !== 'Pin Selection'
        );

        const questionOptions = this._getQuestionsOptions();
        const { filterOption } = this.state;
        const selectedFurtherFiltration = filtrationOptions[filterOption];
        const { fields } = this.props;
        return (
            <>
                <FurtherFiltration
                    furtherFiltrationOptions={filtrationOptionsArr}
                    selectedfurtherFiltration={selectedFurtherFiltration}
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
                                    questionOptions={questionOptions}
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
            </>
        );
    }
    addCustomField = () => this.props.addFilterQuestion(uuid());

    removeCustomField = id => this.props.removeFilterQuestion(id);

    _getQuestionsOptions() {
        const options = this.props.customQuestions.map(
            ({ id: value, name: text }) => ({
                value,
                text
            })
        );
        return convertArrToObj(options, 'value');
    }

    handleChange = ({ target: { value, name } }) =>
        this.setState({ [name]: value });
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
    removeFilterQuestion: id => dispatch(removeFilterQuestion(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FurtherFiltrationContainer);
