# COVID-19 Tracker Website #
A website that tracks and displays data regarding the novel coronavirus disease COVID-19 (SARS-CoV-2).

This project aims to combine Google's visualization API with the COVID-19 data API by Smartable AI. It provides a summary, data table and visualization page to help users find and understand data about COVID-19.

## Design Process ##
People who want to understand COVID-19.
- Provide a summary of the current COVID-19 situation to instantly update users. This summary page will need to be simple to reduce the feeling of being overwhelmed with information for users.
- Search data for an individual country.
- Provide visuals to help communicate the data and help users understand trends.
- Provide reliable COVID-19 news to help inform users.
- Provide links to reliable COVID-19 sources such as the World Health Organization(WHO).

News and Media
- Provide pre-made visuals so that they can report on the trends of COVID-19.

Researchers
- Aid researchers with different visuals to help understand the trends of COVID-19.
- Aid researchers with a timeline graph of COVID-19.
- Possible help in spotting anomalies.

Click [here](https://kahseng-dev.github.io/IDAssignment2/) to view GitHub Page.
Click [here](https://github.com/kahseng-dev/IDAssignment2/blob/main/wireframe/wireframe.pdf) to view the project Wireframe.

## Features ##
### Existing Features ###
Summary Page
- Refresh data button
- Display total cases, deaths and recovered.
- Below the total cases shows the new cases gain in the current date.
- Calculate the total active cases currently.
- Show the total number of infected countries out of the total number of countries given by data.
- News articles are given in card form.
- Coronavirus section for users to be directed to the WHO website for COVID-19 information.
- Credit section for the sources used in the website.

Data Table Page
- Current data given by API and display it in a table format.
- Real-time search function. (Search by Country Name or Code)
- Sorting function when clicking on headings. Both Ascending and Descending.
- Swap between Total and New cases.

Dashboard Page:
- World Map:
  - Filled from yellow to orange depending on the number of cases.
  - When the user clicks on a country, change the information to show the data for the selected country.
  - Selector for users to search through a list of countries.
  - Show tooltip when the user hovers over a country.
- Daily New Cases: Show the last 9 days for new COVID-19 cases including the current date.
- Total Case Composition: A pie chart showing the percentages and slices for the total cases, deaths and recovered for country or world selected.
- Total Case Timeline: A line graph showing the total cases over time given selection.

Other Features:
- Navigation Bar
- Responsive Website

### Features Left to Implement ###
- All planned features have been implemented as of 9th January 2021

## Technologies Used ##
- [HTML](https://whatwg.org/): To create content layer.
- [CSS](https://www.w3.org/): To create presentation layer for general styling of website.
- [JavaScript](https://www.javascript.com/): To create interactive layer.
- [JQuery](https://jquery.com/): Used to fetch API data.
- [Visual Studio Code](https://code.visualstudio.com/): Integrated development environment used.
- [Adobe XD](https://www.adobe.com/products/xd.html): To create and plan the wireframe of the website.
- [Adobe Photoshop](https://www.adobe.com/products/photoshop.html): To edit image assets.

## Testing ##
- Tested Website both on Localhost, Live server and Github pages
- Tested responsiveness on different window/mobile screen sizes.
- Tested on Chrome, Firefox and Brave Browser.
- Pass validators:
    - [HTML Validator](https://validator.w3.org/)
    - [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [JavaScript Validator](https://codebeautify.org/jsvalidate): Validator only suggests JQuery and Global variables as errors.

## Credits ##
### Content ###
- [COVID-19 data API](https://covid19-api.org/#top): COVID-19 data API used.
- [Smartable AI](https://smartable.ai/): COVID-19 data powered by Smartable AI.
- [Johns Hopkins University GitHub](https://github.com/CSSEGISandData/COVID-19): GitHub Page of Data source
- [Google Visualization API](https://developers.google.com/chart/interactive/docs/reference#DataTable): Referenced and used in the visualization of COVID-19 data.
- [GNews API](https://gnews.io/): News API used.
- [WHO Coronavirus Page](https://www.who.int/health-topics/coronavirus#tab=tab_1)
### Media ###
- [Coronavirus icon used](https://icons8.com/icon/10565/coronavirus)

### Acknowledgements ###
- [Caffeine Monitor](https://cm.buildconf.com/): Some design elements are inspired by Caffeine Monitor.
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/): Used bootstrap templates to aid in development.
- [w3schools](https://www.w3schools.com/): For general HTML, CSS, JavaScript and JQuery guides.
- [sort Array Method | JavaScript Tutorial](https://www.youtube.com/watch?v=RsFBsBep-hA)
- [Learn Fetch API In 6 Minutes](https://www.youtube.com/watch?v=cuEtnrL9-H0)
- [Build a COVID-19 Tracker Application - React JS Project (Hooks, Material UI, Charts js)](https://www.youtube.com/watch?v=khJlrj3Y6Ls): Inspired for this project
- [Coronavirus Cases : Get COVID-19's Data Using API In Javascript & Display On A Website (HTML,BS,JS)](https://www.youtube.com/watch?v=VneeLm_haLI)
- [How to style Select Menus - CSS Tutorial](https://www.youtube.com/watch?v=8cExRlT--Zc)
- [JavaScript Search Bar](https://www.youtube.com/watch?v=wxz5vJ1BWrc)
- [Async JS Crash Course - Callbacks, Promises, Async Await](https://www.youtube.com/watch?v=PoRJizFvM7s)
- [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
- [1.4: JSON - Working with Data and APIs in JavaScript](https://www.youtube.com/watch?v=uxf0--uiX0I)
- [Javascript - How To Get Value Of Selected Radio Button In JS [ with source code ]](https://www.youtube.com/watch?v=uzwUBDQfpkU)
- [#21 Taking Input from Radiobuttons in Javascript](https://www.youtube.com/watch?v=r3Oc4IUP0XI)
- [JavaScript Fetch API: Interacting With The News API](https://www.youtube.com/watch?v=fOSGazKFRYE)
- [How to Setup localhost Server in Windows 10 Create Local Host Server IIS Server Windows 10](https://www.youtube.com/watch?v=gpSK0CbSu2g)
- [Insert comma seperators](https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
- [Google chart update on window resize](https://stackoverflow.com/questions/8950761/google-chart-redraw-scale-on-window-resize)
- [Pressing Enter in input field refreshes the page](https://stackoverflow.com/questions/2215462/html-form-when-i-hit-enter-it-refreshes-page)