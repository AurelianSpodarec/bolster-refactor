import React from 'react';
import ReactPieChart from 'react-minimal-pie-chart';

import greenPin from '_content/images/map-markers/green-pin2x.png';
import redPin from '_content/images/map-markers/red-pin2x.png';
import bluePin from '_content/images/map-markers/blue-pin2x.png';
import yellowPin from '_content/images/map-markers/yellow-pin2x.png';
import purplePin from '_content/images/map-markers/purple-pin2x.png';
// import { FILE_STORAGE_URL } from 'config';
//todo: reference images with FILE_STORAGE_URL

import statsPieChartColours from 'constants/companyAdmin/statsPieColours';

const PieChart = ({ stats, hierarchyType }) => {
    const isStatsEmpty = Object.values(stats.statuses).every(
        stat => stat === 0
    );

    const total = Object.values(stats.statuses).reduce((acc, val) => {
        return acc + val;
    }, 0);

    const pieStats = !isStatsEmpty
        ? Object.entries(stats.statuses).map(([title, value]) => {
              return {
                  title,
                  value,
                  color: statsPieChartColours[title]
              };
          })
        : [{ title: 'Empty', value: 100, color: '#cecece' }];
    return (
        <div className="history size-lg-6">
            <h4 className="heading heading-3 size-lg-12">
                Latest Pin Histories
            </h4>

            {isStatsEmpty ? (
                <p className="no-data size-lg-12">
                    There are currently no pins on this {hierarchyType}.
                </p>
            ) : (
                <div className="size-lg-12">
                    <div className="pin-key size-lg-6">
                        <div className="pin">
                            <img src={redPin} alt="pin" />
                            <p>
                                Action Required -{' '}
                                <span>{`${
                                    stats.statuses['ActionRequired']
                                }`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={greenPin} alt="pin" />
                            <p>
                                Installed -{' '}
                                <span>{`${stats.statuses['Installed']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={bluePin} alt="pin" />
                            <p>
                                Inspected -{' '}
                                <span>{`${stats.statuses['Inspected']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={yellowPin} alt="pin" />
                            <p>
                                No Action -{' '}
                                <span>{`${stats.statuses['NoAction']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={purplePin} alt="pin" />
                            <p>
                                Other -{' '}
                                <span>{`${stats.statuses['Other']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <p className="no-pin">
                                Total - <span>{`${total}`}</span>
                            </p>
                        </div>
                    </div>
                    <ReactPieChart
                        className="size-lg-5"
                        data={pieStats}
                        segmentsStyle={{ transition: 'stroke .3s' }}
                        animate
                    />
                </div>
            )}
        </div>
    );
};

export default PieChart;
