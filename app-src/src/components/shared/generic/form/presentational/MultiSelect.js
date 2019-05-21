import React, { useState, useRef, useEffect } from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

const MultiSelect = ({
    name,
    search = false,
    value = [],
    options = [],
    onChange,
    showError,
    placeholder = '-- select options --'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearch] = useState('');
    const node = useRef();
    const filteredOptions = getFilteredOptions();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div className="multi-multi-dropdown size-lg-12" ref={node}>
            <div className="selected-box" onClick={() => updateIsOpen(!isOpen)}>
                {!getSelected().length && (
                    <p className="placeholder">{placeholder}</p>
                )}
                {getSelected().map(opt => (
                    <div
                        key={opt.value}
                        className="option"
                        onClick={() => isOpen && updateIsOpen(false)}
                    >
                        <p>{opt.label}</p>
                        <i
                            className="close fal fa-times"
                            onClick={e => handleDeselect(e, opt.value)}
                        />
                    </div>
                ))}

                <i className="arrow fal fa-angle-down" />
            </div>

            {isOpen && (
                <div className="option-selection">
                    {search && (
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    )}
                    <div className="option-container">
                        {!filteredOptions && (
                            <p>There are no options to display</p>
                        )}
                        {filteredOptions.map(opt => (
                            <p
                                key={opt.value}
                                className={`option ${
                                    value.includes(opt.value) ? 'active' : ''
                                }`}
                                onClick={e => handleSelect(e, opt.value)}
                            >
                                {opt.label}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    function updateIsOpen(value) {
        if (!value) showError();
        setIsOpen(value);
    }

    function handleClick(e) {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        updateIsOpen(false);
    }

    function getSelected() {
        return options.filter(opt => value.includes(opt.value));
    }

    function getFilteredOptions() {
        return options.filter(opt =>
            opt.label
                .replace(/\s/g, '')
                .toLowerCase()
                .includes(searchTerm.replace(/\s/g, '').toLowerCase())
        );
    }

    function handleSearchChange(e) {
        e.preventDefault();

        setSearch(e.target.value);
    }

    function handleDeselect(e, clicked) {
        e.preventDefault();
        e.stopPropagation();

        onChange(name, value.filter(item => item !== clicked));
    }

    function handleSelect(e, clicked) {
        e.preventDefault();

        if (value.includes(clicked)) return;
        onChange(name, [...value, clicked]);
    }
};

const Select = withFieldValidation(MultiSelect);

const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
];

const Test = () => {
    const [value, setVal] = useState([]);
    return (
        <Select
            options={options}
            value={value}
            name="test"
            onChange={(_, val) => setVal(val)}
            required
            search
        />
    );
};

export default Test;
