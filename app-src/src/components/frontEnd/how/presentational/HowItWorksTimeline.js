import React from 'react';

const HowItWorksTimeline = ({ items, activeIndex }) => (
    <div className="section">
        <div className="timeline">
            <div className="line-divider" />

            <div className="content">
                {items.map((item, index) => {
                    const number = '0' + (index + 1);

                    return (
                        <div
                            key={item.title}
                            className={`item-container item-${index} ${
                                index === activeIndex ? 'active' : ''
                            }`}
                        >
                            <div className="line-points">
                                <div className="circle" />
                                <div className="line" />
                                <div className="circle" />
                            </div>

                            <div className="item">
                                <div className="number">{number.slice(-2)}.</div>
                                <div className="icon">
                                    <img alt={item.title} src={item.icon} />
                                </div>
                                <div className="text">
                                    <h4>{item.title}</h4>
                                    <div className="divider" />
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default HowItWorksTimeline;
