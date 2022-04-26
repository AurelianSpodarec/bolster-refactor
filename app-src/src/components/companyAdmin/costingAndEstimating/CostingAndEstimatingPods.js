import React from 'react';

import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import FlexWrapper from '../../shared/generic/flexWrapper/FlexWrapper';

import employeeIcon from '_content/images/icons/person_icon.png';
import buildingIcon from '_content/images/icons/building_icon.png';
import poundIcon from '_content/images/icons/pound_icon.png';
import plusIcon from '_content/images/icons/plus_icon.png';

const CostingAndEstimatingPods = () => {
    return (
        <div className="pods">
            <BlockContainer contentClass="background-gradient border">
                <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                    <div className="icon">
                        <img src={employeeIcon} alt="Employee" />
                    </div>
                    <div className="arrow-container">
                        <i className={'fas fa-arrow-up asc'} />
                    </div>
                </FlexWrapper>

                <h3 className="heading heading-3">Highest Earning employee</h3>

                <div className="content-wrapper">
                    <span>John Doe</span>
                    <p>£1,000,000</p>
                </div>
            </BlockContainer>

            <BlockContainer contentClass="background-gradient border">
                <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                    <div className="icon">
                        <img src={buildingIcon} alt="Building" />
                    </div>
                    <div className="arrow-container">
                        <i className={'fas fa-arrow-up asc'} />
                    </div>
                </FlexWrapper>

                <h3 className="heading heading-3">Highest Earning Building</h3>

                <div className="content-wrapper">
                    <span>Building 1</span>
                    <p>£1,000,000</p>
                </div>
            </BlockContainer>

            <BlockContainer contentClass="background-gradient border">
                <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                    <div className="icon">
                        <img src={poundIcon} alt="Pound sign" />
                    </div>

                    <div className="arrow-container">
                        <i className={'fas fa-arrow-down desc'} />
                    </div>
                </FlexWrapper>

                <h3 className="heading heading-3">Avg Pin Price</h3>

                <div className="content-wrapper">
                    <span>Building 1</span>
                    <p>£1,000,000</p>
                </div>
            </BlockContainer>

            <BlockContainer contentClass="background-gradient border">
                <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                    <div className="icon">
                        <img src={plusIcon} alt="Plus" />
                    </div>
                    <div className="arrow-container">
                        <i className={'fas fa-arrow-up asc'} />
                    </div>
                </FlexWrapper>

                <h3 className="heading heading-3">Most Used Installation Type</h3>

                <div className="content-wrapper">
                    <span>Building 1</span>
                    <p>£1,000,000</p>
                </div>
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingPods;
