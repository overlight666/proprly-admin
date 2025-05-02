/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "react-apexcharts";
import React from "react";
export const AcquisitionChart = function ({ data }: any) {
  const themeColor: any = localStorage.getItem("theme");
  const keyValues = Object.keys(data);

  const getValues = (status: any) => {
    return data[status];
  };

  const stringToColour = (str: string) => {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  const arrayValues = keyValues.map((v) => getValues(v));
  const arrayColors = keyValues.map((v) => stringToColour(v + "- properly"));
  const options: ApexCharts.ApexOptions = {
    labels: keyValues,
    colors: arrayColors,
    chart: {
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      colors: [themeColor === "dark" ? "#111827" : "#fff"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "5%",
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          //   value: 0.9,
        },
      },
    },
    tooltip: {
      shared: true,
      followCursor: false,
      fillSeriesColor: true,
      inverseOrder: true,
      custom: function ({ series, seriesIndex, _dataPointIndex, w }) {
        const customElement = document.createElement('div')
        customElement.style.padding = '9px'
        customElement.innerHTML = `${w?.config?.labels[seriesIndex]} (${series[seriesIndex]})`
        return customElement
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
      x: {
        show: true,
        formatter: function (_, { seriesIndex, w }) {
          const label = w.config.labels[seriesIndex];
          return label;
        },
      },
      y: {
        formatter: function (value) {
          return value + "";
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };
  const series = data ? arrayValues : [];

  return <Chart height={305} options={options} series={series} type="donut" />;
};
