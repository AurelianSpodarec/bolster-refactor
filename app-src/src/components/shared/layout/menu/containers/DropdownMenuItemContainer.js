import React, { Component } from 'react';

import withCurUrl from 'components/shared/generic/misc/hocs/withCurUrl';

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

    componentDidMount = () => {
        this._compareRoutes();
    };

    componentDidUpdate = prevProps => {
        const { curUrl } = this.props;

        if (curUrl !== prevProps.curUrl) {
            this._compareRoutes();
        }
    };

    toggleExpand = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    };

    _compareRoutes = () => {
        const { baseUrl, curUrl } = this.props;

        this.setState({
            ...this.state,
            isOpen: curUrl.startsWith(baseUrl.toLowerCase())
        });
    };
}

export default withCurUrl(DropdownMenuItemContainer);
