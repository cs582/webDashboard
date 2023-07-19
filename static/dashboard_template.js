// Sample data
const data = [
  { x: 0, y: 5 },
  { x: 1, y: 9 },
  { x: 2, y: 7 },
  { x: 3, y: 3 },
  { x: 4, y: 8 },
  { x: 5, y: 4 },
];

function createLinePlot(svgElement) {
  // Chart dimensions
  const width = 600;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3.select(svgElement)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create scales
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([innerHeight, 0]);

  // Create line generator
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  // Append the line path
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Append x-axis
  svg.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  // Append y-axis
  svg.append("g")
    .call(d3.axisLeft(yScale));
}

createLinePlot(".cpu__dashboard")
createLinePlot(".mem__dashboard")
createLinePlot(".net__dashboard")