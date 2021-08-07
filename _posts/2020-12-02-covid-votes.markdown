---
layout: "post"
title:  "COVID-19 and the American Electorate"
subtitle: "If they hadn't died, who would they have voted for? See how COVID-19 affected our election."
short-hand: "covid-votes"
tags: "politics"
top-loads: [<script src="https://d3js.org/d3.v5.min.js"></script>, 
        <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js" integrity="sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==" crossorigin="anonymous"></script>]
bottom-loads: [<script type="text/javascript" src="/post-assets/covid-votes/covid-votes.js"></script>]
permalink: "articles/covid-votes" 
old_css: "True"
---

President Trump’s lack of a comprehensive coronavirus response certainly hurt his chances at reelection. The pandemic was the fourth-most important issue for voters this election, and according to Pew Research, the majority of American lacked confidence in his ability to handle the crisis, said he was “delivering the wrong message” on the pandemic, and said that he “and his administration only sometimes or hardly ever [got] the facts right about the outbreak.” But the pandemic also hurt Trump’s reelection bid in a much more literal sense: it cost him about 80,000 votes.

To fully investigate the extent to which the pandemic shaped the 2020 election, the virus’s impression on the American electorate must be considered. After all, COVID-19 resulted in the deaths of more than 200,000 Americans before November 3rd, the overwhelming majority of whom (>99%) were of voting age.

By combining county-level election results with county-level COVID-19 death reporting, and by incorporating age- and race-based voter preference adjustments and age-based turnout projections, we can estimate the way in which the pandemic affected both candidates. Below is a map of each county, colored by the difference between the estimated votes Biden lost and the estimated votes Trump lost in that county. Red indicates Trump lost more votes than Biden.

<div id="chart-1" style="margin: auto;"></div>

Across all states excluding Alaska, I estimate that the coronavirus pandemic cost the Trump campaign 121,499 votes and cost the Biden campaign 40,542 votes, a difference of 80,956; I estimate that Trump would have won the votes of those who died from the virus by a margin of about 3:1. While not enough to flip the election, or even to flip a state, these deaths represent possibly the largest policy failure in American history. Our Federal government failing to respond adequately to the pandemic may very well be the 21st century's single greatest case of voter disenfranchisement.

<p style="font-size: large; font-weight: 700; width: 100%;">Methodology</p>

<p style="font-size: medium; font-weight: 700; width: 100%;">Vote data</p>

County level vote data were obtained using [this](https://github.com/favstats/USElection2020-EdisonResearch-Results/blob/main/data/latest/presidential.csv) github repository, which scraped election results from the New York Times.

<p style="font-size: medium; font-weight: 700; width: 100%;">COVID-19 data</p>

County-level cumulative COVID-19 death estimates were obtained from the NYT github repository, linked [here](https://github.com/nytimes/covid-19-data). Because NYC is reported as one county in the NYT database, I added data for the 5 NYC counties individually using data from NYC Health, linked [here](https://www1.nyc.gov/site/doh/covid/covid-19-data.page). State-level age and race breakdowns of COVID-19 deaths were obtained from the CDC, both of which can be found [here](https://www.cdc.gov/nchs/nvss/vsrr/covid_weekly/index.htm).

<p style="font-size: medium; font-weight: 700; width: 100%;">Race and Age Preference Adjustments</p>

I built a simple multiple regression to estimate how a population will vote relative to a baseline as the percentage of its citizens who are white, Black, and 65+ change relative to a baseline. In the model, states were considered baselines, demographic differences between a county and its state were used as explanatory variables, and vote differences between a county and its state were used as dependent variables.

The model estimates President-elect Biden will do approximately 0.4 points worse when the share of a population that is White increases by 1%, or when the share of a population that is 65+ increases by 1%, and will do approximately 0.4 points better when the share of a population that is Black increases by 1%. The results were almost exactly the opposite for President Trump. The full model descriptions are below.

Next, I used state-level age and race breakdowns of COVID-19 deaths and compared them to general population age and race breakdowns. This generated an estimate of how, in each state, each candidate would perform relative to the baseline average. I then added these adjustments to the county level election results. Because those who died of COVID-19 are so disproportionally 65+, and are only slightly disproportionately Black, the model estimates that Trump would do substantially better among the population of those who died (by about 30 points) and that Biden would do substantially worse (by about 27 points).

<p style="font-size: medium; font-weight: 700; width: 100%;">Turnout Estimates</p>

I projected turnout levels using age breakdowns of turnout from the 2016 election, data I obtained [here](https://www.kff.org/other/state-indicator/number-of-individuals-who-voted-in-thousands-and-individuals-who-voted-as-a-share-of-the-voter-population-by-age/?currentTimeframe=0&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D). I calculated a weighted mean voter turnout based on the turnout rate of each age group, and how much that age group was represented within those who died from COVID-19 in each state.