import React, { FC } from "react";
// import Chart from "react-apexcharts";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

type Props = {
  candleData: any;
  stockName: string;
};

export const StockCandleChart: FC<Props> = ({ stockName, candleData }) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const open = candleData?.data.o;
  const high = candleData?.data.h;
  const low = candleData?.data.l;
  const close = candleData?.data.c;
  const time = candleData?.data.t;

  const timeSorted = time.map((dateSec) => {
    const tempTime = new Date(0);
    tempTime.setUTCSeconds(dateSec);
    return tempTime;
  });

  const formattedData = [];

  open.forEach((_, index) => {
    const chartItem = {
      x: timeSorted[index],
      y: [open[index], high[index], low[index], close[index]],
    };
    formattedData.push(chartItem);
  });

  const data = {
    series: [
      {
        data: formattedData,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: `${stockName}`,
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <Box>
      <Chart
        options={data.options as ApexOptions}
        series={data.series}
        type="candlestick"
        width="100%"
        height={320}
      />
    </Box>
  );
};
