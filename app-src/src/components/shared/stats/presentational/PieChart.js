import React from 'react';
import ReactPieChart from 'react-minimal-pie-chart';
import { isIE } from 'react-device-detect';

import greenPin from '_content/images/map-markers/green-pin2x.png';
import redPin from '_content/images/map-markers/red-pin2x.png';
import bluePin from '_content/images/map-markers/blue-pin2x.png';
import yellowPin from '_content/images/map-markers/yellow-pin2x.png';
import purplePin from '_content/images/map-markers/purple-pin2x.png';
// import { FILE_STORAGE_URL } from 'config';
//todo: reference images with FILE_STORAGE_URL

import statsPieChartColours from 'constants/companyAdmin/statsPieColours';

const PieChart = ({
    stats,
    hierarchyType,
    sizeClasses = 'size-lg-6',
    wTitle = true,
    onMobile,
    isFiltered
    // style
}) => {
    const isStatsEmpty = Object.values(stats.statuses).every(stat => stat === 0);

    const total = Object.values(stats.statuses).reduce((acc, val) => {
        return acc + val;
    }, 0);

    const pieStats = !isStatsEmpty
        ? Object.entries(stats.statuses).map(([title, value]) => {
            return {
                title,
                value,
                color: statsPieChartColours[title],
                style: {
                    backgroundColor: '#000'
                }
            };
        })
        : [{ title: 'Empty', value: 100, color: '#cecece' }];

    return (
        <div className={`history ${sizeClasses}`}>
            {wTitle && (
                <h4 className="heading heading-3 size-lg-12">
                    Latest Pin Histories
                    {isFiltered && <span className="filtered-flag"> - filtered</span>}
                </h4>
            )}

            {isStatsEmpty ? (
                <p className="no-data size-lg-12">
                    There are currently no pins on this {hierarchyType}.
                </p>
            ) : (
                    <div className="size-lg-12">
                        {onMobile && (
                            <div className="size-lg-12">
                                <div className="size-md-2" />

                                <ReactPieChart
                                    className="size-md-8"
                                    data={pieStats}
                                    segmentsStyle={{
                                        transition: 'stroke .3s'
                                    }}
                                    animate
                                />
                                <div className="size-md-2" />
                            </div>
                        )}
                        <div className={`pin-key ${isIE ? 'size-lg-12 ' : 'size-lg-6 '}size-md-12`}>
                            <div className="pin">
                                <img src={redPin} alt="pin" />
                                <p>
                                    Action Required:{' '}
                                    <span>{`${stats.statuses['ActionRequired']}`}</span>
                                </p>
                            </div>
                            <div className="pin">
                                <img src={greenPin} alt="pin" />
                                <p>
                                    Installed: <span>{`${stats.statuses['Installed']}`}</span>
                                </p>
                            </div>
                            <div className="pin">
                                <img src={bluePin} alt="pin" />
                                <p>
                                    Inspected: <span>{`${stats.statuses['Inspected']}`}</span>
                                </p>
                            </div>
                            <div className="pin">
                                <img src={yellowPin} alt="pin" />
                                <p>
                                    No Action: <span>{`${stats.statuses['NoAction']}`}</span>
                                </p>
                            </div>
                            <div className="pin">
                                <img src={purplePin} alt="pin" />
                                <p>
                                    Other: <span>{`${stats.statuses['Other']}`}</span>
                                </p>
                            </div>
                            <div className="pin">
                                <p className="no-pin">
                                    Total: <span>{`${total}`}</span>
                                </p>
                            </div>
                        </div>

                        {!onMobile && !isIE && (
                            <ReactPieChart
                                className="size-lg-5"
                                data={pieStats}
                                segmentsStyle={{
                                    transition: 'stroke .3s'
                                }}
                                animate
                            />
                        )}
                    </div>
                )}
        </div>
    );
};

export default PieChart;
