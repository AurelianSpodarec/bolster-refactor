import React, { useState, useRef, useEffect } from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

// Boundless select is a mult select dropdown with the ability to click the same option multiple times
// pass 'required' prop if it's required
// pass 'search' prop if you want to enable the search
// pass 'disabled' flag if you want to disable the dropdown
// pass a ''placeholder'' string if you want to customize the placeholder
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be an array of selected values i.e '[1, 2, 2, 2, 1]'
// pass an empty array as the default value
const BoundlessSelect = ({
    name,
    search = false,
    disabled = false,
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
        <div
            className={`multi-multi-dropdown size-lg-12 ${
                disabled ? 'disabled' : ''
            }`}
            ref={node}
        >
            <div
                className="selected-box"
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
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
        return options
            .filter(opt => value.includes(opt.value))
            .map(opt => {
                let label = opt.label;
                const count = value.filter(item => item === opt.value).length;
                if (count > 1) label = `${label} x ${count}`;

                return { ...opt, label };
            });
    }

    function getFilteredOptions() {
        if (!search || !searchTerm) return options;
        return options.filter(opt =>
            opt.label
                .replace(/[^A-Z0-9]/gi, '')
                .toLowerCase()
                .includes(searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase())
        );
    }

    function handleSearchChange(e) {
        e.preventDefault();

        setSearch(e.target.value);
    }

    function handleDeselect(e, clicked) {
        e.preventDefault();
        e.stopPropagation();
        const index = value.findIndex(item => item === clicked);
        const newVal = [...value.slice(0, index), ...value.slice(index + 1)];

        onChange(name, newVal);
    }

    function handleSelect(e, clicked) {
        e.preventDefault();

        onChange(name, [...value, clicked]);
    }
};

export default withFieldValidation(BoundlessSelect);
