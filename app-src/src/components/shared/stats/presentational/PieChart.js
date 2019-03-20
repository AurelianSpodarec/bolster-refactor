import React from 'react';

import ReactPieChart from 'react-minimal-pie-chart';

import greenPin from '_content/images/pins/green-pin.png';
import redPin from '_content/images/pins/red-pin.png';
import bluePin from '_content/images/pins/blue-pin.png';
import yellowPin from '_content/images/pins/yellow-pin.png';

const PieChart = () => (
    <div className="history size-lg-6">
        <ReactPieChart
            className="size-lg-5"
            //test data
            data={[
                {
                    title: 'Red',
                    value: 10,
                    color: '#d71a1a'
                },
                {
                    title: 'Blue',
                    value: 20,
                    color: '#3363dd'
                },
                {
                    title: 'Green',
                    value: 35,
                    color: '#eec206'
                },
                {
                    title: 'Yellow',
                    value: 100,
                    color: '#2cac56'
                }
            ]}
            segmentsStyle={{ transition: 'stroke .3s' }}
            animate
        />
        <div className="pin-key size-lg-6">
            <div className="pin">
                <img src={redPin} alt="pin" />
                <p>##10##</p>
            </div>
            <div className="pin">
                <img src={bluePin} alt="pin" />
                <p>##20##</p>
            </div>
            <div className="pin">
                <img src={greenPin} alt="pin" />
                <p>##35##</p>
            </div>
            <div className="pin">
                <img src={yellowPin} alt="pin" />
                <p>##100##</p>
            </div>
        </div>
        <label className="size-lg-12">
            Last Update: ##12/10/2018 09:17 pm##
        </label>
    </div>
);

export default PieChart;
