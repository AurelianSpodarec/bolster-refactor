import React, { Component } from 'react';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';

class DrawingCompanyAccessContainer extends Component {
    render() {
        const companies = [
            {
                id: 1,
                name: 'Prosol Uk',
                isInherited: false
            },
            {
                id: 2,
                name: 'Alpha Fire',
                isInherited: false
            },
            {
                id: 3,
                name: 'Alpha Fire',
                isInherited: true
            }
        ];

        return <CompaniesAccessTable companies={companies} />;
    }
}

export default DrawingCompanyAccessContainer;
