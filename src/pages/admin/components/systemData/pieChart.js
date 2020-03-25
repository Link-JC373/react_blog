import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

const PieChart = (props) => {
    const { pieData } = props

    useEffect(() => {
        console.log(pieData);

        const pie = new Chart({
            container: 'pieCanvas',
            autoFit: true,
            height: 500,
        });

        pie.coordinate('theta', {
            radius: 0.75,
        });
        pie.data(pieData);

        pie.scale('percent', {
            formatter: (val) => {
                val = val * 100 + '%';
                return val;
            },
        });

        pie.tooltip({
            showTitle: false,
            showMarkers: false,
        });

        pie
            .interval()
            .position('percent')
            .color('item')
            .label('percent', {
                content: (data) => {
                    return `${data.item}: ${data.percent * 100}%`;
                },
            })
            .adjust('stack');

        pie.interaction('element-active');

        pie.render();
    })


    return (

        <div id='pieCanvas' style={{ width: 400, height: 300 }}>
        </div>

    )
}

export default PieChart;