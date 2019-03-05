import React from 'react';

const TextInput = props => (
    <div className="row">
        <input
            className="col s6"
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
        {!!(props.error && props.error.length) && (
            <p className="error red-text text-accent-4">{props.error}</p>
        )}
    </div>
);

export default TextInput;
