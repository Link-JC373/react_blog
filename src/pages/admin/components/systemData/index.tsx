import React, { useState, useEffect } from 'react';
import PieChart from './pieChart';
import Histogram from './histogram';
import './index.scss'
interface iPieData {

    item: string,
    count: number,
    percent: number

}
interface iHGData {
    sales: number,
    time: string,
}

const Chart = () => {

    const [pieData, setPieData] = useState<Array<iPieData>>([])
    const [histogramData, setHGData] = useState<Array<iHGData>>([])
    useEffect(() => {
        setPieData(
            [
                { item: '事例一', count: 40, percent: 0.4 },
                { item: '事例二', count: 21, percent: 0.21 },
                { item: '事例三', count: 17, percent: 0.17 },
                { item: '事例四', count: 13, percent: 0.13 },
                { item: '事例五', count: 9, percent: 0.09 },

            ]
        )
        setHGData(
            [
                { time: '1951 年', sales: 38 },
                { time: '1952 年', sales: 52 },
                { time: '1956 年', sales: 61 },
                { time: '1957 年', sales: 145 },
                { time: '1958 年', sales: 48 },
                { time: '1959 年', sales: 38 },
                { time: '1960 年', sales: 38 },
                { time: '1962 年', sales: 38 },
            ]
        )
    }, [])
    return (
        <div className="chart">
            {pieData.length !== 0 ? <PieChart pieData={pieData} /> : null}
            {histogramData.length !== 0 ? <Histogram data={histogramData} /> : null}
        </div>
    );
}

export default Chart;