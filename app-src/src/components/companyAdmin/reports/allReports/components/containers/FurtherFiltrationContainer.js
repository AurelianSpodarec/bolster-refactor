import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FurtherFiltration from '../presentational/FurtherFiltration';
// import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import CustomFiltersContainer from './CustomFiltersContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertArrToObj } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const FurtherFiltrationContainer = ({
    furtherFiltrationOptions,
    selectedfurtherFiltration,
    handleChange,
    filterOption,
    fields,
    removeFilterQuestion,
    addFilterQuestion,
    customQuestions
}) => {
    const questionOptions = _getQuestionsOptions();
    return (
        <>
            <FurtherFiltration
                furtherFiltrationOptions={furtherFiltrationOptions}
                selectedfurtherFiltration={selectedfurtherFiltration}
                handleChange={handleChange}
            />
            {/* {filterOption === '1' ? (
                <PinSelectorContainer /> */
            filterOption === '2' ? (
                <div className="custom-filters-block ignore-padding">
                    <div className="size-lg-12">
                        {fields.map(field => (
                            <CustomFiltersContainer
                                key={field.id}
                                id={field.id}
                                removeField={() => removeCustomField(field.id)}
                                questionOptions={questionOptions}
                            />
                        ))}
                    </div>

                    <BlockButtonWrapper>
                        <button
                            onClick={addCustomField}
                            type="button"
                            className="button"
                        >
                            <i className="fa fa-plus" /> Add field
                        </button>
                    </BlockButtonWrapper>
                </div>
            ) : null}
        </>
    );
    function addCustomField() {
        addFilterQuestion(uuid());
    }

    function removeCustomField(id) {
        removeFilterQuestion(id);
    }

    function _getQuestionsOptions() {
        const options = customQuestions.map(({ id: value, name: text }) => ({
            value,
            text
        }));
        return convertArrToObj(options, 'value');
    }
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { questions },
            fields
        }
    }
}) => ({
    customQuestions: questions || [],
    fields: Object.values(fields)
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
