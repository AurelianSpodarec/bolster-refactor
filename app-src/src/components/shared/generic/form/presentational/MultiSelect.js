import React, { useState, useRef, useEffect } from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

// MultiSelect is a multi select
// pass 'required' prop if it's required
// pass 'search' prop if you want to enable the search
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be an array of selected values i.e '[1, 2]'
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
    const [hasOpened, setHasOpened] = useState(false);
    const [searchTerm, setSearch] = useState('');
    const node = useRef();
    const filteredOptions = getFilteredOptions();

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
        <div className="multi-multi-dropdown size-lg-12" ref={node}>
            <div className="selected-box" onClick={() => setIsOpen(!isOpen)}>
                {!getSelected().length && (
                    <p className="placeholder">{placeholder}</p>
                )}
                {getSelected().map(opt => (
                    <div
                        key={opt.value}
                        className="option"
                        onClick={() => isOpen && setIsOpen(false)}
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
                    {search && !!options.length && (
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
                        {!filteredOptions.length && (
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

    function handleClick(e) {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsOpen(false);
    }

    function getSelected() {
        return options.filter(opt => value.includes(opt.value));
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

export default withFieldValidation(MultiSelect);
