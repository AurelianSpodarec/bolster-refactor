import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            const pageArea = document.getElementById('page-area');

            if (pageArea) {
                pageArea.scrollTo(0, 0);
            } else {
                window.scrollTo(0, 0);
            }
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
