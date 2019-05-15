import React from 'react';
import Select from 'react-select';

const MultiMultiDropdown = ({
    options,
    name,
    error,
    handleChange,
    value,
    showDropdown = false
}) => (
    <>
        <div className="multi-multi-dropdown size-lg-12">
            <div className="selected-box">
                <div className="option">
                    <p>Option 1</p>
                    <i className="close fal fa-times" />
                </div>

                <div className="option">
                    <p>Option 2</p>
                    <i className="close fal fa-times" />
                </div>

                <i className="arrow fal fa-angle-down" />
            </div>

            {showDropdown && (
                <div className="option-selection">
                    <div className="search-box">
                        <input type="text" placeholder="Search..." />
                    </div>

                    <div className="option-container">
                        {options.map(option => (
                            <p key={option.value} className="option">
                                {option.label}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
        {/* <Select
            options={options}
            isMulti
            name={name}
            onChange={handleChange}
            value={value}
            hideSelectedOptions={false}
        />
         */}
    </>
);

export default MultiMultiDropdown;
