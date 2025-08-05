import {useEffect, useRef} from 'react'
import ApexCharts from 'apexcharts'

const Widget1 = ({chartHeight='50px'}) => {
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
  // const strokeColor = getCSSVariableValue('--bs-gray-300')
  const labelColor = '#e9e9e9'
  const strokeColor = '#e3e3e3'
  // const strokeColor = getCSSVariableValue('--bs-gray-300') as string

  return {
    series: [
      {
        name: 'Loans',
        data: [15, 25, 15, 40, 20, 50],
      },
    ],
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [20, 120, 120, 120],
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: ['#FFFFFF'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousand'
        },
      },
    },
    colors: ['#ffffff'],
    markers: {
      colors: [labelColor],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  }
}

export {Widget1}
