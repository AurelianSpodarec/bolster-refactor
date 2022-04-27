import React from 'react';
import FlexWrapper from '../../shared/generic/flexWrapper/FlexWrapper';

const CostingGraphFilters = () => {
    return (
        <div className="graph-filters-tooltip border">
            <FlexWrapper align="center" justify="between" extraClasses="filter-item">
                <p>Operatives</p>

                <button>
                    <i className="far fa-chevron-down" />
                </button>
            </FlexWrapper>
            <FlexWrapper align="center" justify="between" extraClasses="filter-item">
                <p>Services</p>

                <button>
                    <i className="far fa-chevron-down" />
                </button>
            </FlexWrapper>
            <FlexWrapper align="center" justify="between" extraClasses="filter-item">
                <p>Installation Types</p>

                <button>
                    <i className="far fa-chevron-down" />
                </button>
            </FlexWrapper>
            <FlexWrapper align="center" justify="between" extraClasses="filter-item">
                <p>Price Range</p>

                <button>
                    <i className="far fa-chevron-down" />
                </button>
            </FlexWrapper>
        </div>
    );
};

export default CostingGraphFilters;
