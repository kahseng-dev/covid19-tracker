# COVID-19 Tracker Website #
This website provides a summary, data table and a dashboard which uses charts to display the COVID-19 data provided by disease.sh. This website aims to help users find information regarding the novel coronavirus disease COVID-19 (SARS-CoV-2).

## Design Process ##
General visitors who are interested in COVID-19.
- Provide a summary of the current COVID-19 situation to instantly update users. This summary page will need to be simple to reduce the feeling of being overwhelmed with information for users.
- Search data for an individual country.
- Provide visuals to help communicate the data and help users understand trends.
- Provide reliable COVID-19 news to help inform users.
- Provide links to reliable COVID-19 sources such as the World Health Organization(WHO).

Researchers
- Aid researchers with different visuals to help understand the trends of COVID-19.
- Aid researchers with a timeline graph of COVID-19.
- Possible help in spotting anomalies.

News and Media
- Provide pre-made visuals so that they can report on the trends of COVID-19.

Click [here](https://kahseng-dev.github.io/covid19-tracker/) to view GitHub Page.

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
- All planned features have been implemented as of 20th August 2021

## Technologies Used ##
- [HTML](https://whatwg.org/): To create content layer.
- [CSS](https://www.w3.org/): To create presentation layer for general styling of website.
- [JavaScript](https://www.javascript.com/): To create interactive layer.
- [JQuery](https://jquery.com/): JS library used for event handling and html manipulation.
- [Visual Studio Code](https://code.visualstudio.com/): Integrated development environment used.
- [Adobe Photoshop](https://www.adobe.com/products/photoshop.html): To edit image assets.

## Testing ##
- Tested Website on Localhost, Live server and Github pages
- Tested responsiveness on different window/mobile screen sizes.
- Tested on Chrome, Firefox and Brave Browser.
- Pass validators:
  - [HTML Validator](https://validator.w3.org/)
  - [CSS Validator](https://jigsaw.w3.org/css-validator/)
  - [JavaScript Validator](https://codebeautify.org/jsvalidate): Validator only suggests JQuery and Global variables as errors.

## Credits ##
### Content ###
- [COVID-19 data API by disease.sh](https://disease.sh/): COVID-19 data API used.
- [Chart.js API](https://www.chartjs.org/docs/latest/): Referenced and used in the visualization of COVID-19 data.
- [Bing News Search API](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1/): News API used.
- [WHO COVID-19 Page](https://www.who.int/emergencies/diseases/novel-coronavirus-2019)

### Media ###
- [Coronavirus icon used](https://fonts.google.com/icons?icon.query=corona)

### Acknowledgements ###
- [w3schools](https://www.w3schools.com/): For general HTML, CSS, JavaScript and JQuery guides.
- [Tailwind CSS](https://tailwindcss.com/): Used tailwindcss for styling of website.
- [Tailwind Navigation Bar](https://www.youtube.com/watch?v=puaX_nhTMRU): Used for tailwind navigation bar.
- [Fetch API JS Tutorial](https://www.youtube.com/watch?v=cuEtnrL9-H0): Used to understand fetch in js.
- [Async, Await and Promises Tutorial](https://www.youtube.com/watch?v=vn3tm0quoqE): Used to understand fetch in js.