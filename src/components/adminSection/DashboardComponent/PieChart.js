import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ data }) => {
  let paidPercentage = 0;
  let pendingPercentage = 100;

  if (data) {
    paidPercentage = data?.paidMaintenancePercentage
      ? parseFloat(data?.paidMaintenancePercentage)
      : 0;
    pendingPercentage = data?.pendingMaintenancePercentage
      ? parseFloat(data?.pendingMaintenancePercentage)
      : 0;
  }
  const state = {
    series: [paidPercentage, pendingPercentage],

    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      // labels: [`${paidPercentage}%`, `${pendingPercentage}%`],
      labels: [`Paid%`, `Due%`],

      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width="110%"
      />
    </>
  );
};

export default PieChart;
// const state = {
//   series: [paidPercentage, pendingPercentage],

//   options: {
//     chart: {
//       width: 380,
//       type: "pie",
//     },
//     labels: [`Paid:${paidPercentage}%`, `Due:${pendingPercentage}%`],

//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   },
// };
