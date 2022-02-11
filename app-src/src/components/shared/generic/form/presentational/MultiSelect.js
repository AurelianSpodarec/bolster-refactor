import { useWindowDimensions } from 'helpers/hooks';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

// MultiSelect is a multi select dropdown
// pass 'required' prop if it's required
// pass 'search' prop if you want to enable the search
// pass 'disabled' flag if you want to disable the dropdown
// pass a 'placeholder' string if you want to customize the placeholder
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be an array of selected values i.e '[1, 2]'
// pass an empty array as the default value
const MultiSelect = ({
    name,
    search = false,
    disabled = false,
    value = [],
    options = [],
    onChange,
    showError,
    iconClass = '',
    placeholder = '-- select options --',
    maxLines = null,
    classes = '',
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

    const windowDimensions = useWindowDimensions();

    const [visibleLimit, setVisibleLimit] = useState(options.length);
    const selectedRef = useRef();
    useEffect(() => {
        const selectedElement = selectedRef.current;
        if (selectedElement && maxLines) {
            const optionElements = selectedElement.getElementsByClassName('option');
            const maxWidth = selectedElement.clientWidth - 115;

            let usedWidth = 0;
            let maxVisibleCount = 0;
            let linesLeft = maxLines;

            for (const optionElement of optionElements) {
                usedWidth += optionElement.clientWidth;

                if (usedWidth < maxWidth) {
                    maxVisibleCount++;
                } else {
                    linesLeft -= 1;
                    if (linesLeft <= 0) break;
                    maxVisibleCount++;
                    usedWidth = optionElement.clientWidth;
                }
            }
            setVisibleLimit(maxVisibleCount);
        }
    }, [selectedRef.current, value, maxLines, windowDimensions]);

    useEffect(() => {
        if (maxLines == null) setVisibleLimit(options.length);
    }, [options]);

    return (
        <div
            className={`multi-multi-dropdown size-lg-12 ${classes && classes} ${
                disabled ? 'disabled' : ''
            }`}
            ref={node}
        >
            <div
                className="selected-box"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                ref={selectedRef}
            >
                {!getSelected().length && <p className="placeholder">{placeholder}</p>}
                {getSelected().map((opt, i) => (
                    <div
                        key={opt.value}
                        className={`option ${i + 1 > visibleLimit ? 'option-hidden' : ''}`}
                        onClick={() => isOpen && setIsOpen(false)}
                    >
                        <p>{opt.label}</p>
                        <i
                            className="close fal fa-times"
                            onClick={e => !disabled && handleDeselect(e, opt.value)}
                        />
                    </div>
                ))}
                {getSelected().length > visibleLimit && (
                    <p className="more">+{getSelected().length - visibleLimit} More</p>
                )}

                <i className={`arrow ${iconClass.length ? iconClass : 'fal fa-angle-down'}`} />
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
                    <div className={`option-container ${search && options.length > 4 && 'large'}`}>
                        {!filteredOptions.length && <p>There are no options to display</p>}
                        {filteredOptions.map(opt => (
                            <p
                                key={opt.value}
                                className={`option ${value.includes(opt.value) ? 'active' : ''} ${
                                    opt.disabled ? 'disabled' : ''
                                }`}
                                onClick={e => handleSelect(e, opt.value, opt.disabled)}
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
        const selectedOptions = value
            .filter(val => !options.find(({ value }) => value === val))
            .map(val => ({ label: val, value: val }));
        return options.filter(opt => value.includes(opt.value)).concat(selectedOptions);
    }

    function getFilteredOptions() {
        if (!search || !searchTerm) return options;
        return options.filter(opt =>
            opt.label
                .replace(/[^A-Z0-9]/gi, '')
                .toLowerCase()
                .includes(searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase()),
        );
    }

    function handleSearchChange(e) {
        e.preventDefault();

        setSearch(e.target.value);
    }

    function handleDeselect(e, clicked) {
        e.preventDefault();
        e.stopPropagation();

        onChange(
            name,
            value.filter(item => item !== clicked),
        );
    }

    function handleSelect(e, clicked, disabled) {
        e.preventDefault();
        if (disabled) return;

        if (value.includes(clicked)) {
            onChange(
                name,
                value.filter(item => item !== clicked),
            );
            return;
        }

        onChange(name, [...value, clicked]);
    }
};

export default withFieldValidation(MultiSelect);
