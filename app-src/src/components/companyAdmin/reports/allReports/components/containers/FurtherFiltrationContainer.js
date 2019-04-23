import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FurtherFiltration from '../presentational/FurtherFiltration';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import CustomFiltersContainer from './CustomFiltersContainer';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { convertArrToObj } from 'helpers/generic';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';

class FurtherFiltrationContainer extends React.Component {
    state = {
        customFields: []
    };
    render() {
        const {
            furtherFiltrationOptions,
            selectedfurtherFiltration,
            handleChange,
            filterOption,
            fields
        } = this.props;

        const questionOptions = this._getQuestionsOptions();
        return (
            <>
                <FurtherFiltration
                    furtherFiltrationOptions={furtherFiltrationOptions}
                    selectedfurtherFiltration={selectedfurtherFiltration}
                    handleChange={handleChange}
                />
                {filterOption === '1' ? (
                    <PinSelectorContainer />
                ) : filterOption === '2' ? (
                    <>
                        <button
                            onClick={this.addCustomField}
                            type="button"
                            className="button"
                        >
                            Add field
                        </button>
                        {fields.map(field => (
                            <CustomFiltersContainer
                                key={field.id}
                                id={field.id}
                                removeField={() =>
                                    this.removeCustomField(field.id)
                                }
                                questionOptions={questionOptions}
                            />
                        ))}
                    </>
                ) : null}
            </>
        );
    }

    addCustomField = () => {
        const { addFilterQuestion } = this.props;
        const id = uuid();
        this.setState({
            customFields: [...this.state.customFields, id]
        });
        addFilterQuestion(id);
    };

    // updateCustomField = (id, field) => {
    //     this.setState({
    //         customFields: { ...this.state.customFields, [id]: field }
    //     });
    // };

    removeCustomField = id => {
        const { removeFilterQuestion } = this.props;
        this.setState({
            customFields: this.state.customFields.filter(
                fieldID => id !== fieldID
            )
        });
        removeFilterQuestion(id);
    };

    _getQuestionsOptions = () => {
        const { customQuestions } = this.props;

        const options = customQuestions.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

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
