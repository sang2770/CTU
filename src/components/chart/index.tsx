//higth chart 
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react';

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);

Highcharts?.setOptions({
    lang: {
        loading: 'Đang tải...',
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        shortMonths: ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12'],
        downloadJPEG: "Tải xuống hình ảnh JPEG",
        downloadPNG: "Tải xuống hình ảnh PNG",
        downloadPDF: "Tải xuống PDF",
        downloadSVG: "Tải xuống SVG",
        viewFullscreen: "Xem toàn màn hình",
        printChart: "In biểu đồ"
    },
    time: {
        useUTC: false
    },
    rangeSelector: {
        inputEnabled: true
    }
})

function CustomHighChart({data}) {
    const [dataOptions, setDataOptions] = useState({});

    const addZero = (no) => {
        return no < 10 ? '0' + no : no;
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('https://demo-live-data.highcharts.com/aapl-c.json');
    //         const data = await response.json();
    //         setDataOptions(
    //             {
    //                 chart: {
    //                     type: 'line',
    //                     height: 550,
    //                 },
    //                 plotOptions: {
    //                     series: {
    //                         color: '#21409d'
    //                     }
    //                 },
    //                 tooltip: {
    //                     formatter: function () {
    //                         var sendDTime = new Date(this.x);
    //                         var strTime = `${addZero(sendDTime.getHours())}:${addZero(sendDTime.getMinutes())}:${addZero(sendDTime.getSeconds())}, ${addZero(sendDTime.getDate())}/${addZero(sendDTime.getMonth() + 1)}/${sendDTime.getFullYear()}`;
    //                         var strTimeShow = `Thời gian: <b> ${strTime} </b><br/>Giá trị: <b>${this.y}</b>`
    //                         return strTimeShow;
    //                     }
    //                 },
    //                 series: [{
    //                     data: data,
    //                     zoneAxis: 'x',
    //                     marker: {
    //                         symbol: "circle",
    //                         radius: 2,
    //                         enabled: true
    //                     }
    //                 }]
    //             }
    //         )
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        
        setDataOptions(
            {
                chart: {
                    type: 'line',
                    height: 550,
                },
                plotOptions: {
                    series: {
                        color: '#21409d'
                    }
                },
                tooltip: {
                    formatter: function () {
                        var sendDTime = new Date(this.x);
                        var strTime = `${addZero(sendDTime.getHours())}:${addZero(sendDTime.getMinutes())}:${addZero(sendDTime.getSeconds())}, ${addZero(sendDTime.getDate())}/${addZero(sendDTime.getMonth() + 1)}/${sendDTime.getFullYear()}`;
                        var strTimeShow = `Thời gian: <b> ${strTime} </b><br/>Giá trị: <b>${this.y}</b>`
                        return strTimeShow;
                    }
                },
                series: [{
                    data: data,
                    zoneAxis: 'x',
                    marker: {
                        symbol: "circle",
                        radius: 2,
                        enabled: true
                    }
                }]
            }
        )
}, [data]);

    return (
        <HighchartsReact
            style={{ width: "100%" }}
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={dataOptions}
        />
    );
}

export default CustomHighChart;