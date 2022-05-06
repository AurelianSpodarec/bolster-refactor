import { formatCurrency } from 'helpers/generic';
import useColourTheme from 'hooks/useColourTheme';
import { useEffect, useRef, useState } from 'react';

const useDashboardLineGraph = graph => {
    const colourTheme = useColourTheme();
    const graphRef = useRef(null);

    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(300);

    useEffect(() => {
        const updateSize = () => {
            if (graphRef.current) {
                if (graphRef.current.clientWidth !== width) setWidth(graphRef.current.clientWidth);
                if (graphRef.current.clientHeight !== height)
                    setHeight(graphRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [graphRef.current]);

    const data = canvas => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(
            width * 0.4,
            height * 0.2,
            width * 0.55,
            height * 1.3,
        );
        gradient.addColorStop(0, '#0047FF');
        gradient.addColorStop(1, '#00000000');

        return {
            labels: graph.labels || [],
            datasets: [
                {
                    backgroundColor: gradient, // Put the gradient here as a fill color
                    borderColor: '#0047FF',
                    borderWidth: 4,
                    pointRadius: 0,
                    hitRadius: 500,
                    label: '',
                    data: graph.dataSets?.[0].data || [],
                },
            ],
        };
    };

    const options = {
        responsive: true,
        datasetStrokeWidth: 3,
        pointDotStrokeWidth: 0,
        scaleLabel: '',
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true,
                        zeroLineColor: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                        // color: 'transparent',
                        tickMarkLength: false,
                    },
                    ticks: {
                        // display: false,
                        beginAtZero: true,
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true,
                        zeroLineColor: colourTheme === 'dark' ? '#494c5b' : '#F2F2F2',
                        color: 'transparent',
                        tickMarkLength: false,
                    },
                    ticks: {
                        // display: false,
                        beginAtZero: true,
                    },
                },
            ],
        },
        legend: {
            display: false,
        },
        tooltips: {
            backgroundColor: '#FAFAFA',
            borderColor: '#222222',
            borderWidth: 2,
            titleFontColor: 'black',
            titleFontStyle: 'normal',
            displayColors: false,
            bodyFontColor: 'black',
            callbacks: {
                label: tooltipItem => {
                    const { yLabel } = tooltipItem;
                    return `${yLabel < 0 ? '-' : ''}£${
                        yLabel > 0 ? formatCurrency(yLabel, false) : '0.00'
                    }`;
                },
            },
        },
    };

    return { data, options, graphRef };
};

export default useDashboardLineGraph;
