import * as TRANSPORT from './transport.js'

console.log('statically cdn has loaded')

// $(document).on('knack-scene-render.scene_1', function(event, scene) {
//     // requests data from Dealership table
//     // object_id: object_5
//     $.ajax({
//       url: 'https://api.knack.com/v1/objects/object_5/records?rows_per_page=1000', // Ensure scene and view IDs are correct
//       type: 'GET',
//       headers: {
//         'X-Knack-Application-Id': Knack.application_id, // Replace with your actual App ID
//         'X-Knack-REST-API-Key': 'cbd95fc2-7dfb-46c7-9768-5aca85cf69dc', // Set to 'knack' as per documentation
//       },
//       success: function(data) {
//         // console.log('Data fetched successfully:', data);
//         calculateTotals(data.records)
//       },
//       error: function(xhr, status, error) {
//         console.error('Error fetching data:', xhr, status, error);
//         console.log('Response text:', xhr.responseText);
//       }
//     });
//   });
  
//   // add _raw to each field to get the raw data
//   // Total Buys Today: field_38_raw
//   // Total Buys WTD: field_37_raw
//   // Total Buys MTD: field_39_raw
//   // Total Buys YTD: field_40_raw
//   // Total Buys All Time: field_32_raw
//   function calculateTotals(records) {
//     let buyCounts = {
//       'buysToday': 0,
//       'buysWTD': 0,
//       'buysMTD': 0,
//       'buysYTD': 0,
//       'buysAllTime': 0
//     };
  
//     for (var i = 0; i < records.length; i++){
//       buyCounts.buysToday += records[i].field_38_raw;
//       buyCounts.buysWTD += records[i].field_37_raw;
//       buyCounts.buysMTD += records[i].field_39_raw;
//       buyCounts.buysYTD += records[i].field_40_raw;
//       buyCounts.buysAllTime += records[i].field_32_raw;
//     };
  
//     addTotalsToChartTitles(buyCounts);
//     // changeChartColors();
//   }
  
//   function addTotalsToChartTitles(buyCounts) {
//     let chartTitles = document.querySelectorAll('.kn-title.is-4');
    
//     for (var i = 0; i < chartTitles.length; i++){
//       let text = chartTitles[i].innerText;
//       if (text === "Today"){
//         chartTitles[i].innerText = `${text} (${buyCounts.buysToday})`
//       } else if (text === "WTD"){
//         chartTitles[i].innerText = `${text} (${buyCounts.buysWTD})`
//       } else if (text === "MTD"){
//         chartTitles[i].innerText = `${text} (${buyCounts.buysMTD})`
//       } else if (text === "YTD"){
//         chartTitles[i].innerText = `${text} (${buyCounts.buysYTD})`
//       }
//     }
//   }
  
//   // global months variable
//   const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
//   // SAL Report code //
//   $(document).on('knack-scene-render.scene_41', function(event, scene) {
  
//     const date = new Date();
//     const currentMonth = date.toLocaleString('en-US', { month: 'long' });
//     const currentYear = date.getFullYear();
  
//     if (localStorage.getItem("selectedYear") == null && localStorage.getItem("selectedMonth") == null){
//       localStorage.setItem("selectedYear", currentYear);
//       localStorage.setItem("selectedMonth", currentMonth);
//     }
  
//     // need to add a dropdown menu to the "filter by year" menu
//     addDropdownMenus(currentYear, currentMonth);
  
//     // since this page will always start by loading the current year/month, need to update the SAL Report title to display this
//     addDefaultReportTitle();
  
//     // need to retrieve metrics by default
//     defaultMonth = localStorage.getItem("selectedMonth");
//     defaultMonthNumber = MONTHS.indexOf(defaultMonth) + 1;
//     defaultYear = localStorage.getItem("selectedYear");
//     defaultBeforeDate = getBeforeDate(defaultMonthNumber, defaultYear);
//     defaultAfterDate = getAfterDate(defaultMonthNumber, defaultYear);
  
//     let encodedFilter = createEncodedFilters(defaultBeforeDate, defaultAfterDate, defaultMonthNumber);
//     fetchFilteredData(encodedFilter);
  
  
//   });
  
//   function addDropdownMenus(year, month) {
//     let targetDiv = document.querySelector('#view_82');
//     // adds the year dropdown menu
//     if (!document.getElementById("year-select")){
  
//       let selectedYear = localStorage.getItem("selectedYear");
//       let yearDropdown = document.createElement("select");
//       yearDropdown.id = "year-select";
  
//       for (let i = year - 1; i <= year + 5; i++) {
//         let option = document.createElement("option");
//         option.value = i;
//         option.textContent = i;
//         if (i == selectedYear){
//           option.selected = true
//         }
//         yearDropdown.appendChild(option);
//       }
  
//       if (targetDiv) {
//         targetDiv.append(yearDropdown);
//       }
  
//       yearDropdown.addEventListener("change", filterData);
//     }
  
//     // adds the month dropdown menu
//     if (!document.getElementById("month-select")){
  
//       let selectedMonth = localStorage.getItem("selectedMonth");
//       let monthDropdown = document.createElement("select");
//       monthDropdown.id = "month-select";
  
//       for(let i = 0; i < MONTHS.length; i++){
//         let option = document.createElement("option");
//         option.value = i+1;
//         option.textContent = MONTHS[i];
//         if(MONTHS[i] === selectedMonth){
//           option.selected = true
//         }
//         monthDropdown.appendChild(option)
//       }
  
//       if (targetDiv) {
//         targetDiv.append(monthDropdown);
//       }
  
//       // adds the on change event listener
//       monthDropdown.addEventListener("change", filterData);
//     }
//   }
  
//   function formatDate(month, day, year) {
//     return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;
//   }
  
//   function filterData(){
//     let newYear;
//     let newMonth;
//     let isYearChanging = event.target.id === 'year-select';
  
//     if(isYearChanging){
//       newYear = parseInt(event.target.value);
//       newMonth = parseInt(document.querySelector('#month-select').value);
//     } else {
//       newYear = parseInt(document.querySelector('#year-select').value);
//       newMonth = parseInt(event.target.value);
//     }
  
//     localStorage.setItem("selectedYear", newYear)
//     localStorage.setItem("selectedMonth", MONTHS[newMonth - 1]);
  
//     let beforeDate = getBeforeDate(newMonth, newYear);
//     let afterDate = getAfterDate(newMonth, newYear);
  
//     let encodedFilter = createEncodedFilters(beforeDate, afterDate, newMonth);
  
//     let newHash = `sal-wip/?view_78_filters=${encodedFilter}&view_78_page=1`;
//     window.location.hash = newHash;
//   }
  
//   async function fetchFilteredData(encodedFilter){
  
//     $.ajax({
//       url: `https://api.knack.com/v1/objects/object_6/records?rows_per_page=1000&filters=${encodedFilter}`, // Ensure scene and view IDs are correct
//       type: 'GET',
//       headers: {
//         'X-Knack-Application-Id': Knack.application_id, // Replace with your actual App ID
//         'X-Knack-REST-API-Key': 'cbd95fc2-7dfb-46c7-9768-5aca85cf69dc', // Set to 'knack' as per documentation
//       },
//       success: function(data) {
//         console.log('Data fetched successfully:', data);
//         calculateMetrics(data);
//       },
//       error: function(xhr, status, error) {
//         console.error('Error fetching data:', xhr, status, error);
//         console.log('Response text:', xhr.responseText);
//       }
//     });
  
//   }
  
//   function calculateMetrics(data){
  
//     // Metrics to calculate:
//     // average pre-commission profit -> total pre-commission profit / (# of vehicles - EAT vehicles)
//     // profit margin -> total pre-commission profit / total customer price
//     // # of vehicles -> total records returned in the filtered data response
//     // # of EAT verhicles -> total # of vehicles where profit is $0
//     // 25% manager comission -> sum of commission * .25
//     // 60% owners compensation -> total pre-commission profit * 0.6
//     // 10% pack -> total pre-commissions profit * 0.1
//     // 5% marketing -> total pre-commission profit * 0.05
  
//     // database fields needed for these metrics:
//     // pre-commission profit (field_163) - need to get the sum of all of these fields, count of these fields, and the count of this field - EAT vehicles
//     // customer price (field_160) - need to get the sum of all these fields
//     // profit (field_165) - needed to determine if the vehicle is an EAT vehicle
//     // commission (field_164) - need to get the sum of this, then multiply by .25 to get the 25% manager commission
  
//     const totalRecords = data.total_records;
//     const records = data.records;
//     let pcpSum = 0;
//     let eatTotal = 0;
//     let cpSum = 0;
//     let commissionSum = 0;
  
//     for (var i = 0; i < records.length; i++){
  
//       // get the necessary fields (need to get the regular fields, then parse the number from it. the raw field are returning the number to the nearest .5 e.g. $18 -> 17.5))
//       let pcp = parseNumberFromString(records[i].field_163);
//       let profit = parseNumberFromString(records[i].field_165);
//       let cp = parseNumberFromString(records[i].field_160);
//       let commission = parseNumberFromString(records[i].field_164);
  
//       // add this record to the sum of the associated fields
//       pcpSum += pcp;
//       cpSum += cp;
//       commissionSum += commission;
  
//       // determine whether or not this is an EAT vehicle
//       if (profit <= 0){
//         eatTotal += 1;
//       };
  
//     }
  
//     // calculate the metrics based on the gathered data
//     let averagePcp = formatNumberToCurrency(pcpSum / (totalRecords - eatTotal));
//     let profitMargin = convertToPercentage(pcpSum / cpSum);
//     let managerCommission = formatNumberToCurrency(commissionSum);
//     let ownersCompensation = formatNumberToCurrency(pcpSum * 0.6);
//     let marketingAndPack = formatNumberToCurrency(pcpSum * 0.15);
  
//     let metrics = [averagePcp, profitMargin, totalRecords, eatTotal, managerCommission, ownersCompensation, marketingAndPack];
  
//     // metrics are now being calculated, now just need to add to the DOM
//     addMetricsToDom(metrics);
  
//   }
  
//   function addMetricsToDom(metrics){
  
//     // metrics are given to this function as an array in the following order:
//     // metrics = [averagePcp, profitMargin, totalRecords, eatTotal, managerCommission, ownersCompensation, marketingAndPack];
//     // need to add these to the DOM
  
//     const metricLabels = [
//       "Average Pre-Commission Profit Per Vehicle",
//       "Profit Margin",
//       "# of Vehicles Moved",
//       "# of EAT Transactions",
//       "25% Manager Commission",
//       "60% Owner's Compensation",
//       "15% Marketing & Pack"
//     ];
  
//     // Check if the container already exists, if so, remove it to prevent duplicates
//     let existingContainer = document.getElementById("metrics-container");
//     if (existingContainer) {
//         existingContainer.remove();
//     }
  
//     // Create a container for the metrics
//     const container = document.createElement("div");
//     container.id = "metrics-container";
//     container.style.display = "grid";
//     container.style.gridTemplateColumns = "1fr 1fr";
//     container.style.gap = "10px";
//     container.style.padding = "20px";
//     container.style.border = "1px solid #ddd";
//     container.style.borderRadius = "8px";
//     container.style.backgroundColor = "#f9f9f9";
//     container.style.width = "fit-content";
//     container.style.margin = "20px";
//     container.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
    
//     // Create and append metric elements
//     metrics.forEach((metric, index) => {
//         const metricItem = document.createElement("div");
//         metricItem.style.display = "flex";
//         metricItem.style.justifyContent = "space-between";
//         metricItem.style.padding = "10px";
//         metricItem.style.backgroundColor = "#fff";
//         metricItem.style.borderRadius = "4px";
//         metricItem.style.boxShadow = "0px 1px 3px rgba(0, 0, 0, 0.1)";
        
//         const label = document.createElement("span");
//         label.style.fontWeight = "bold";
//         label.style.color = "#333";
//         label.textContent = metricLabels[index] + ":";
  
//         const value = document.createElement("span");
//         value.style.color = "#007BFF";
//         value.textContent = metric;
  
//         metricItem.appendChild(label);
//         metricItem.appendChild(value);
//         container.appendChild(metricItem);
//     });
  
//     // Append the container to the body or a specific element
//     document.getElementById('view_83').appendChild(container);
  
  
//   }
  
//   function parseNumberFromString(str) {
//     console.log(str)
//     return parseFloat(str.replace(/[$,]/g, ""));
//   }
  
//   function formatNumberToCurrency(num) {
//     let formattedNumber = Math.abs(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\.00$/, "");
//     return num < 0 ? "-$" + formattedNumber : "$" + formattedNumber;
//   }
  
//   function convertToPercentage(decimal) {
//     return (decimal * 100).toFixed(2).replace(/\.00$/, "") + "%";
//   }
  
//   function createEncodedFilters(beforeDate, afterDate, month){
//     // console.log('before date: ', beforeDate)
//     // console.log('after date ', afterDate)
//     // console.log('month ', month)
  
//     let filters;
  
//     if(month == 1){
//       filters = {
//           'match': 'and',
//           'rules': [
//             {
//                 'field': 'field_172',
//                 'operator': 'is after',
//                 'value': `${afterDate}`
//             },
//             {
//                 'field': 'field_172',
//                 'operator': 'is before',
//                 'value': `${beforeDate}`
//             }
//           ]
//       };
//     } else if (month == 12){
//         filters = {
//           'match': 'and',
//           'rules': [
//             {
//                 'field': 'field_172',
//                 'operator': 'is after',
//                 'value': `${afterDate}`
//             },
//             {
//                 'field': 'field_172',
//                 'operator': 'is before',
//                 'value': `${beforeDate}`
//             }
//           ]
//       };
//     } else {
//       filters = {
//           'match': 'and',
//           'rules': [
//               {
//                   'field': 'field_172',
//                   'operator': 'is before',
//                   'value': `${beforeDate}`
//               },
//               {
//                   'field': 'field_172',
//                   'operator': 'is after',
//                   'value': `${afterDate}`
//               }
//           ]
//       };
//     }
//     return encodeURIComponent(JSON.stringify(filters));
//   }
  
//   function getBeforeDate(newMonth, newYear) {
//       let nextMonth = newMonth + 1;
//       let nextYear = parseInt(newYear);
//       if (nextMonth > 12) {
//           nextMonth = 1;
//           nextYear += 1;
//       }
//       return `${String(nextMonth).padStart(2, "0")}/01/${nextYear}`;
//   }
  
//   function getAfterDate(newMonth, newYear) {
//       let prevMonth = newMonth - 1;
//       let prevYear = newYear;
//       if (prevMonth < 1) {
//           prevMonth = 12;
//           prevYear -= 1;
//       }
//       let lastDay = new Date(prevYear, prevMonth, 0).getDate();
//       return `${String(prevMonth).padStart(2, "0")}/${lastDay}/${prevYear}`; // Corrected: Use prevYear
//   }
  
//   function addDefaultReportTitle() {
  
//     let formattedDate;
//     if (localStorage.getItem("selectedYear") == null && localStorage.getItem("selectedMonth") == null){
//       const date = new Date();
//       const options = { month: 'long', year: 'numeric' };
//       formattedDate = date.toLocaleDateString('en-US', options);
//     } else {
//       formattedDate = `${localStorage.getItem("selectedMonth")} ${localStorage.getItem("selectedYear")}`
//     }
  
//     // update the view title
//     let viewKey = "view_78";
//     let view = Knack.views[viewKey];
//     view.model.view.title = formattedDate;
//     Knack.views[viewKey].model.fetch();
//   }