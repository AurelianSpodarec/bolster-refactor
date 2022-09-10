import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonContainer extends Component {
    state = {
        hover: false,
    };

    render() {
        const {
            linkClass,
            children,
            colourCode,
            setColour,
            setColourHoverCode,
            to = '',
            type = 'button',
            handleClick = () => {},
            className = '',
            isAnchor = false,
            openNewTab = false,
            disabled = false,
        } = this.props;

        let style = {};

        if (setColour && setColour.length) {
            style = {
                backgroundColor: this.state.hover && !disabled ? setColourHoverCode : setColour,
            };
        } else {
            style = {
                backgroundColor: this.state.hover && !disabled ? colourCode : '#939393',
            };
        }

        const sharedProps = {
            onMouseLeave: this.handleMouseLeave,
            onMouseOver: !disabled && this.handleMouseOver,

            className: to && to.length ? `link-holder ${className}` : `button ${className}`,
            onClick: handleClick,
            style,
        };

        return to && !!to.length && !isAnchor ? (
            <div {...sharedProps}>
                <Link className={linkClass} to={to}>
                    {children}
                </Link>
            </div>
        ) : to && !!to.length && isAnchor ? (
            openNewTab ? (
                <div className="link-holder">
                    <a {...sharedProps} href={to} target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                </div>
            ) : (
                <div className="link-holder">
                    <a {...sharedProps} href={to}>
                        {children}
                    </a>
                </div>
            )
        ) : (
            <button {...sharedProps} type={type} disabled={disabled}>
                {children}
            </button>
        );
    }

    handleMouseOver = () => this.setState({ hover: true });

    handleMouseLeave = () => this.setState({ hover: false });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode },
        },
    },
}) => ({
    colourCode: colourCode || '#e10512',
});

export default withRouter(connect(mapStateToProps)(ButtonContainer));
