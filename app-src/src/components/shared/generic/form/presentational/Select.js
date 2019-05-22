import React, { useState, useRef, useEffect } from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

// Select is a single select
// pass 'required' prop if it's required
// pass 'search' prop if you want to enable the search
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be the selected 'value' not option(the number not the object)
const Select = ({
    name,
    search = false,
    value = null,
    options = [],
    onChange,
    showError,
    placeholder = '-- select options --'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [searchTerm, setSearch] = useState('');
    const node = useRef();
    const filteredOptions = getFilteredOptions();
    const selected = getSelected();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    useEffect(() => {
        if (isOpen && !hasOpened) setHasOpened(true);
        else if (!isOpen && hasOpened) showError();
    }, [isOpen]);

    return (
        <div
            className="multi-multi-dropdown size-lg-12"
            ref={node}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="selected-box">
                {!selected ? (
                    <p className="placeholder">{placeholder}</p>
                ) : (
                    <p className="placeholder">{selected.label}</p>
                )}

                <i className="arrow fal fa-angle-down" />
            </div>

            {isOpen && (
                <div className="option-selection">
                    {search && !!options.length && (
                        <div
                            className="search-box"
                            onClick={e => e.stopPropagation()}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    )}
                    <div className="option-container">
                        {filteredOptions.length ? (
                            <p
                                className={`option ${!value ? 'active' : ''}`}
                                onClick={e => handleSelect(e, null)}
                            >
                                {placeholder}
                            </p>
                        ) : (
                            <p>There are no options to display</p>
                        )}

                        {filteredOptions.map(opt => (
                            <p
                                key={opt.value}
                                className={`option ${
                                    value === opt.value ? 'active' : ''
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

    function handleClick(e) {
        // inside click
        if (node.current.contains(e.target)) {
            return;
        }

        // outside click
        setIsOpen(false);
    }

    function getSelected() {
        return options.find(item => item.value === value);
    }

    function getFilteredOptions() {
        if (search || !searchTerm) return options;
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

    function handleSelect(e, clicked) {
        e.preventDefault();

        if (value === clicked) return;
        onChange(name, clicked);
    }
};

const TestSelect = withFieldValidation(Select);

const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
];

const Test = () => {
    const [value, setVal] = useState(null);
    return (
        <TestSelect
            options={options}
            value={value}
            name="single"
            onChange={(_, val) => setVal(val)}
            required
            // search
        />
    );
};

export default Test;
