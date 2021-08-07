---
layout: "post"
title:  "Mask Wearing and Trump Voting"
subtitle: "Trump dominated in counties where people don't wear masks. That's a bad thing."
short-hand: "mask-wearing"
tags: "politics"
top-loads: [<script src="https://d3js.org/d3.v5.min.js"></script>, 
        <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js" integrity="sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==" crossorigin="anonymous"></script>]
bottom-loads: [<script type="text/javascript" src="/post-assets/mask-wearing/mask-wearing.js"></script>]
permalink: "articles/mask-wearing" 
old_css: "True"
---

**“I just don’t want to be doing — I don’t know, somehow sitting in the Oval Office behind that beautiful Resolute Desk, the great Resolute Desk. I think wearing a face mask as I greet presidents, prime ministers, dictators, kings, queens — I don’t know, somehow I don’t see it for myself. I just, I just don’t." -Donald Trump, 4/3/2020**

Somehow, President Trump and the GOP made mask-wearing a political issue. According to Pew Research, "Democrats and Democratic-leaning independents are about twice as likely as Republicans and Republican leaners to say that masks should be worn always (63% vs. 29%)." But thanks to data from the New York Times, we can investigate this relationship at the county level.

The NYT published data that reports what percent of a county's residents say they would never, rarely, sometimes, frequently, or always wear a mask when around other people. I then turned these proportions into a weighted sum for each county, something I call the MWI, or Mask Wearing Index. MWI ranges from 1 to 5: 1 would indicate that 100% of a county's residents never wear masks, and 5 would indicate that 100% of a county's residents always wear masks. 

While the average MWI is 3.98, here is how MWIs look across the country. Green is more mask wearing, and red is less; hover over a county for more details.

<div id="chart-1" style="margin: auto;"></div>


Here is a histogram of our nation's MWIs.

![histogram of MWIs](/post-assets/mask-wearing/hist-MWI.jpg)

But more interesting is the relationship between MWIs and Trump's performance: here is how Trump's vote shares were correlated with MWIs.

![correlation of MWIs and trump voter share](/post-assets/mask-wearing/MWI-TVS.jpg)

As you can see, there is a negative and linear relationship between the share of votes Trump won in a county and that county's mask wearing index.

We can also use averages to investigate the relationship between Trump votes and mask wearing. Below, I've split United States counties into deciles based on their MWIs, and calculated Trump's average vote share in each of those deciles. As you can see, Trump's performance markedly declines as mask wearing increases. 

![trump voter share by decile](/post-assets/mask-wearing/MWI-deciles.jpg)

Last but not least, here is an assortment of some other fun findings from this project:

—Trump won 96.7% of counties where more than 20% of residents said they would never wear a mask (n=122). 

—Trump won only 34% of counties where more than 80% of residents said they would always wear a mask (n=91). 

—Trump won 91% of counties with an MWI less than or equal to 3 (n=21). 

—Trump lost just 5 of the 200 lowest MWI counties. 