import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import PieChart from 'react-minimal-pie-chart';

import greenPin from '_content/images/pins/green-pin.png';
import redPin from '_content/images/pins/red-pin.png';
import bluePin from '_content/images/pins/blue-pin.png';
import yellowPin from '_content/images/pins/yellow-pin.png';

const Stats = ({ details, isFetching }) => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
        <div className="size-lg-6">
            <p className="size-lg-12">
                {details.addressLine1}
                <br />
                {details.addressLine2}
                <br />
                {details.city}
                <br />
                {details.postCode}
                <br />
                {isFetching || !details.pinHistory ? (
                    'loading'
                ) : (
                    <span>{details.pinHistory.red}</span>
                )}
            </p>
            <div className="button-container size-lg-12">
                <Link className="button" to="/edit">
                    Edit
                </Link>{' '}
                <button className="button red">Delete Site</button>
            </div>
        </div>
        {isFetching || !details.pinHistory ? (
            <p>Loading</p>
        ) : (
            <div className="history size-lg-6">
                <PieChart
                    className="size-lg-5"
                    //test data

                    data={[
                        {
                            title: 'Red',
                            value: details.pinHistory.red,
                            color: '#d71a1a'
                        },
                        {
                            title: 'Blue',
                            value: details.pinHistory.blue,
                            color: '#3363dd'
                        },
                        {
                            title: 'Green',
                            value: details.pinHistory.green,
                            color: '#eec206'
                        },
                        {
                            title: 'Yellow',
                            value: details.pinHistory.yellow,
                            color: '#2cac56'
                        }
                    ]}
                    segmentsStyle={{ transition: 'stroke .3s' }}
                    animate
                />
                <div className="pin-key size-lg-6">
                    <div className="pin">
                        <img src={redPin} alt="pin" />
                        <p>{details.pinHistory.red}</p>
                    </div>
                    <div className="pin">
                        <img src={bluePin} alt="pin" />
                        <p>{details.pinHistory.blue}</p>
                    </div>
                    <div className="pin">
                        <img src={greenPin} alt="pin" />
                        <p>{details.pinHistory.green}</p>
                    </div>
                    <div className="pin">
                        <img src={yellowPin} alt="pin" />
                        <p>{details.pinHistory.yellow}</p>
                    </div>
                </div>
                <label className="size-lg-12">
                    Last Update:{' '}
                    {moment(details.latestUpdate).format('DD/MM/YYYY hh:mm')}
                </label>
            </div>
        )}
    </div>
);

export default Stats;
