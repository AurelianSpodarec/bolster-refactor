import React, { Fragment } from 'react';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import HomeSlides from '../presentational/HomeSlides';

const HomeSlidesContainer = () => {
    return (
        <div className={'home-slides-container'}>
            {HomeSlidesList.map((item, index) => {
                const lastSlide = index === HomeSlidesList.length - 1;
                return (
                    <Fragment key={index}>
                        <HomeSlides background={item.background} last={lastSlide}>
                            <div className="slide-content">
                                <h1 className="slide-title">{item.title}</h1>
                                <p className="slide-description">{item.description}</p>
                                <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                            </div>
                        </HomeSlides>
                        {lastSlide && (
                            <>
                                <TrustedBy />
                                <FrontEndFooter />
                            </>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default HomeSlidesContainer;
