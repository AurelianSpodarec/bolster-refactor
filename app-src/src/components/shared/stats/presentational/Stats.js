import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'react-minimal-pie-chart';

import greenPin from '_content/images/pins/green-pin.png';
import redPin from '_content/images/pins/red-pin.png';
import bluePin from '_content/images/pins/blue-pin.png';
import yellowPin from '_content/images/pins/yellow-pin.png';

const Stats = () => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
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
            <div className="button-container size-lg-12">
                <Link className="button" to="/edit">
                    Edit
                </Link>{' '}
                <button className="red">Delete Site</button>
            </div>
        </div>

        <div className="history size-lg-6">
            <PieChart
                className="size-lg-5"
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
            <div className="pin-key size-lg-6">
                <div className="pin">
                    <img src={redPin} alt="pin" />
                    <p>103</p>
                </div>
                <div className="pin">
                    <img src={bluePin} alt="pin" />
                    <p>0</p>
                </div>
                <div className="pin">
                    <img src={greenPin} alt="pin" />
                    <p>90</p>
                </div>
                <div className="pin">
                    <img src={yellowPin} alt="pin" />
                    <p>100</p>
                </div>
            </div>
            <label className="size-lg-12">
                Last Update: ##01/01/2018 13:43##
            </label>
        </div>
    </div>
);

export default Stats;
