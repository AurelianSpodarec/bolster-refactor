import React, { Component } from 'react';
import { connect } from 'react-redux';

import withCurUrl from 'components/shared/generic/misc/hocs/withCurUrl';

class DropdownMenuItemContainer extends Component {
    state = {
        isOpen: false,
        hover: false
    };

    render() {
        const {
            icon,
            title,
            children,
            colourCode,
            isBolsterLogoDark
        } = this.props;
        const { isOpen, hover } = this.state;

        let textColor = 'white';

        if (isBolsterLogoDark) textColor = 'black';

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={`item ${isOpen ? 'open' : ''} custom-hover`}
                style={
                    isOpen
                        ? { backgroundColor: colourCode, color: textColor }
                        : hover
                        ? { backgroundColor: colourCode, color: textColor }
                        : {}
                }
            >
                <a href="#/" onClick={this.toggleExpand}>
                    {!!icon && <i className={`far fa-${icon} icon`} />}
                    <span className="menu-text">
                        {title}{' '}
                        <i
                            className={`fa fa-chevron-${
                                isOpen ? 'down' : 'right'
                            } arrow`}
                        />
                    </span>
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

    handleMouseEnter = () => this.setState({ hover: true });

    handleMouseLeave = () => this.setState({ hover: false });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode, isBolsterLogoDark }
        }
    }
}) => ({
    colourCode: colourCode || '#e10512',
    isBolsterLogoDark
});

export default withCurUrl(connect(mapStateToProps)(DropdownMenuItemContainer));
