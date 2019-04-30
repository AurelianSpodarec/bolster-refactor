import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonNoClickContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            children,
            colourCode,
            to = '',
            type = 'buttton',
            className = ''
        } = this.props;
        const { hover } = this.state;

        const style = { backgroundColor: hover ? colourCode : '#939393' };

        return to && to.length ? (
            <div
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={style}
                className={`link-holder ${className}`}
            >
                <Link to={to}>{children}</Link>
            </div>
        ) : (
            <button
                style={style}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                type={type}
                className={`button ${className}`}
            >
                {children}
            </button>
        );
    }

    handleMouseOver = () =>
        this.setState({
            hover: true
        });

    handleMouseLeave = () =>
        this.setState({
            hover: false
        });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode }
        }
    }
}) => ({
    colourCode: colourCode || '#e10512'
});

export default withRouter(connect(mapStateToProps)(ButtonNoClickContainer));
