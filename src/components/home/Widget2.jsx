import {useEffect, useRef} from 'react'
import ApexCharts from 'apexcharts'

const Widget2 = ({chartHeight='100px'}) => {
  const chartRef = useRef(null)

  const {mode} = '' // to be replaced by theme mode value later

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight))
    if (chart) {
      chart.render()
    }

    return chart
  }

  return (
    <div className='w-full'>
        {/* end::Title */}
        <div
          ref={chartRef}
          className='mixed-widget-13-chart'
          style={{height: chartHeight, minHeight: chartHeight}}
        ></div>
    </div>
  )
}

const chartOptions = (chartHeight) => {
    // const labelColor = getCSSVariableValue('--bs-gray-800')
  
    return {
      series: [
        {
          name: 'Payments',
          data: [1, 2.1, 1, 2.1, 4.1, 6.1, 4.1, 4.1, 2.1, 4.1, 2.1, 3.1, 1, 1, 2.1],
        },
      ],
      chart: {
        fontFamily: 'inherit',
        height: chartHeight,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      colors: ['#ffffff'],
      plotOptions: {
        bar: {
          borderRadius: 2.5,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + '%'
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
          'Jan',
          'Feb',
          'Mar',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
          // background: labelColor,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + '%'
          },
        },
      },
    }
  }

export {Widget2}
