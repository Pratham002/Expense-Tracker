import React from "react"
import ChartBar from "./ChartBar"
import "./Chart.css"

const Chart = (props) => {
  // we've to find maximum value among all values
  const dataPointsValues = props.dataPoints.map((dataPoint) => dataPoint.value)
  const totalMaximum = Math.max(...dataPointsValues)
  return (
    <div className="chart">
      {props.dataPoints.map((data) => (
        <ChartBar
          key={data.label}
          value={data.value}
          maxValue={totalMaximum}
          label={data.label}
        />
      ))}
    </div>
  )
}

export default Chart
