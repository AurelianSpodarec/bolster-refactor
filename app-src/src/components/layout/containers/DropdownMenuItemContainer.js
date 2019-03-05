import React, { Component } from 'react';

class DropdownMenuItemContainer extends Component {
    state = {
        isOpen: false
    };

    render() {
        const { icon, title, children } = this.props;
        const { isOpen } = this.state;
        return (
            <div className={`item ${isOpen ? 'open' : ''}`}>
                <a href="#/" onClick={this.toggleExpand}>
                    {!!icon && <i className={`fa fa-${icon} icon`} />}
                    {title}
                    <i
                        className={`fa fa-chevron-${
                            isOpen ? 'down' : 'right'
                        } arrow`}
                    />
                </a>
                <div className="sub-menu">{children}</div>
            </div>
        );
    }

    toggleExpand = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    };
}

export default DropdownMenuItemContainer;
