import React from 'react';
import { connect } from 'react-redux';

import clientFetchCompaniesRequest from 'actions/client/companies/async/clientFetchCompaniesRequest';
import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Block from 'components/shared/generic/block/presentational/Block';

export default function(ProtectedComponent) {
    class withSelectedCompanyAuth extends React.Component {
        state = {
            companiesFetched: false,
            error: false
        };

        render() {
            const { companiesFetched, error } = this.state;

            if (!companiesFetched)
                return (
                    <Block>
                        <Loading />
                    </Block>
                );

            if (error)
                return (
                    <Block>
                        <Error>{this.props.error}</Error>
                    </Block>
                );

            return <ProtectedComponent {...this.props} />;
        }

        componentDidMount = () => {
            const {
                companies,
                selectedCompanyID,
                clientFetchCompaniesRequest,
                history
            } = this.props;
            if (!selectedCompanyID) history.push('/client/companies');

            if (companies.length) {
                if (
                    companies.filter(
                        company => company.id === selectedCompanyID
                    ).length
                ) {
                    this.setState({
                        companiesFetched: true
                    });
                } else {
                    history.push('/client/companies');
                }
            } else {
                clientFetchCompaniesRequest();
            }
        };

        componentDidUpdate = prevProps => {
            const {
                companies,
                isFetching,
                error,
                selectedCompanyID
            } = this.props;

            if (!isFetching && prevProps.isFetching && companies.length) {
                if (
                    companies.filter(
                        company => company.id === selectedCompanyID
                    ).length
                ) {
                    this.setState({
                        companiesFetched: true
                    });
                }
            }

            if (error && !prevProps.error) this.setState({ error: true });
        };
    }

    const mapStateToProps = ({
        client: {
            companiesReducer: {
                companies,
                isFetching,
                error,
                selectedCompanyID
            }
        }
    }) => ({
        companies: Object.values(companies),
        isFetching,
        error,
        selectedCompanyID
    });

    const mapDispatchToProps = dispatch => ({
        clientFetchCompaniesRequest: () => {
            dispatch(clientFetchCompaniesRequest());
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withSelectedCompanyAuth);
}
