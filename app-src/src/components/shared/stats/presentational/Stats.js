import React from 'react';

import PieChart from 'react-minimal-pie-chart';

import PinImage from '../../../../_content/images/examples/pin.png';

const Stats = () => (
    <div className="content-container size-lg-8">
        <div className="content-area site-details size-lg-12">
            <h3 className="heading heading-3 size-lg-6">Details</h3>
            <h4 className="heading heading-3 size-lg-6">
                Latest Pin Histories
            </h4>
            <div className="size-lg-6">
                <p className="size-lg-12">
                    ##Manchester Royal Infirmary
                    <br />
                    Civic Offices
                    <br />
                    Union St
                    <br />
                    Chorley
                    <br />
                    PR7 1AL##
                </p>
            </div>

            <div className="size-lg-6">
                <PieChart
                    className="size-lg-4"
                    //test data
                    data={[
                        {
                            title: 'One',
                            value: 10,
                            color: '#d71a1a'
                        },
                        {
                            title: 'Two',
                            value: 15,
                            color: '#3363dd'
                        },
                        {
                            title: 'Four',
                            value: 10,
                            color: '#eec206'
                        },
                        {
                            title: 'Three',
                            value: 20,
                            color: '#2cac56'
                        }
                    ]}
                    segmentsStyle={{ transition: 'stroke .3s' }}
                    animate
                />
                <div className="pin-key size-lg-8">
                    <div className="pin">
                        <img src={PinImage} />
                        <p>103</p>
                    </div>
                    <div className="pin">
                        <img src={PinImage} />
                        <p>0</p>
                    </div>
                    <div className="pin">
                        <img src={PinImage} />
                        <p>90</p>
                    </div>
                    <div className="pin">
                        <img src={PinImage} />
                        <p>100</p>
                    </div>
                </div>
                <p>Last Update: ##01/01/2018 13:43##</p>
            </div>
            <div className="button-container size-lg-12">
                <button>Edit</button> <button>Delete Site</button>
            </div>
        </div>
    </div>
);

export default Stats;
