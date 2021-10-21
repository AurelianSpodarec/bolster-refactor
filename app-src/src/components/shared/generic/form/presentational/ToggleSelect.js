import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ButtonContainer from '../../button/containers/ButtonContainer';

const ToggleSelect = ({
    name,
    handleChange,
    options = [],
    selected = [],
    required = false,
    validate = () => {},
    error,
    errorsVisible,
    addFieldError,
    removeFieldError,
}) => {
    const [chosen, setChosen] = useState([]);

    const idleOptions = options.filter(({ value }) => !selected.includes(value));
    const chosenOptions = options.filter(({ value }) => selected.includes(value));

    const shift = mode => {
        const newSelected = [...selected];

        for (const value of chosen) {
            const index = newSelected.indexOf(value);
            if (index >= 0 && mode === 'sub') newSelected.splice(index, 1);
            else if (mode === 'add') newSelected.push(value);
            choose(value, true);
        }

        handleChange(name, newSelected);
    };

    const choose = (value, multiple = false) => {
        if (!multiple) setChosen([]);
        setChosen(chosen => {
            const newChosen = [...chosen];
            const index = newChosen.indexOf(value);
            if (index >= 0) newChosen.splice(index, 1);
            else newChosen.push(value);
            return newChosen;
        });
    };

    const _validate = () => {
        const validateError = validate(selected);
        if (required && selected.length === 0) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    useEffect(() => _validate(), [selected, _validate]);

    return (
        <>
            <p>Hold ‘SHIFT’ + ‘CLICK’ to select multiple pins at once.</p>
            <br />
            <div id={name} className="toggle-select">
                <div className="list">
                    {options.length === 0 && <p className="no-data">No options available</p>}
                    {idleOptions.map((option, i) => (
                        <Option option={option} chosen={chosen} choose={choose} key={i} />
                    ))}
                </div>
                <div className="controls">
                    <div className="buttons">
                        <ButtonContainer
                            className="exclude icon-only"
                            handleClick={() => shift('sub')}
                        >
                            <i className="far fa-long-arrow-left" />
                        </ButtonContainer>
                        <ButtonContainer
                            className="include icon-only"
                            handleClick={() => shift('add')}
                        >
                            <i className="far fa-long-arrow-right" />
                        </ButtonContainer>
                    </div>
                    {errorsVisible && error && error.length && (
                        <p className="error red-text text-accent-4">{error}</p>
                    )}
                </div>
                <div className="list">
                    {chosenOptions.map((option, i) => (
                        <Option option={option} chosen={chosen} choose={choose} key={i} />
                    ))}
                </div>
            </div>
        </>
    );
};

const Option = ({ option: { value, label }, chosen, choose }) => {
    return (
        <button
            type="button"
            className={`option ${chosen.includes(value) ? 'chosen' : ''}`}
            onClick={event => choose(value, event.shiftKey)}
        >
            <p className="text">{label}</p>
        </button>
    );
};

const mapStateToProps = ({ shared: { fieldErrorsReducer } }, ownProps) => ({
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible,
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSelect);
