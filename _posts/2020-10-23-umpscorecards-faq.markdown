---
layout: post
title:  "UmpScorecards FAQ"
short-hand: "umpscorecards-faq"
subtitle: "Frequently asked questions from my UmpScorecards Twitter platform."
card_url: "/images/umpscorecards-faq/card.jpg"
tags: "sports baseball"
permalink: "articles/umpscorecards-faq"
old_css: "True"
---
<p style="font-size: medium; font-weight: 700; width: 100%;">What data do you use, and where does it come from?</p>

The MLB releases detailed data for every pitch of every game. Each morning, my program uses a python library called PyBaseball to obtain all of this pitch by pitch data from the previous day’s contests. Within the data, each pitch is assigned 89 attributes, from the pitch’s release position to its horizontal acceleration. However, I only care about 5 of those 89 values. Two are the pitch’s horizontal (plate_x) and vertical (plate_z) position as it crosses the plate. Two are measures of the top and the bottom of the strike zone (sz_bot and sz_top), values that reflect the size of the zone once adjusted for batter height and stance. Finally, I use the resulting call of the pitch. In conjunction, these 5 values can tell me whether a pitch was a strike or a ball, and whether or not it was called correctly.

<p style="font-size: medium; font-weight: 700; width: 100%;">Why doesn’t your data match with what I saw on T.V.?</p>

For one, that box is not exact. From my understanding, it is more of a suggestion, not a definite zone. Second, TV boxes often don't correctly represent the ball itself. For example, the dot that the TBS electronic strike zone uses is much smaller than an actual baseball. TBS in particular has come under much fire for inaccuracies in their TV strike zone.

<p style="font-size: medium; font-weight: 700; width: 100%;">Why doesn’t your data match with what I saw on this other online graphic?</p>

Strike zone graphics from Baseball Savant, ESPN, and other sources do not adjust for the top and bottom of the strike zone for each pitch. Graphics from MLB’s Gameday feature, on the other hand, do. As such, they should align more with the graphics I post.

![zone comparison](/post-assets/umpscorecards-faq/Zone-comparison.jpg)

<p style="font-size: medium; font-weight: 700; width: 100%;">How do you determine if a pitch is a ball or a strike, and if a call was correct or incorrect?</p>

I use a model that incorporates a pitch’s measured horizontal and vertical location, as well as the potential measurement error within the pitch tracking system itself, to determine the probability that each pitch is a strike. From there, I can derive the probability that each call was incorrect. If this probability is greater than 95%, the pitch is considered to have been incorrectly called. Read more about the details of this method [here](https://ethan-singer.com/articles/umpire-miss-probability.html).

<p style="font-size: medium; font-weight: 700; width: 100%;">How do you plot each pitch?</p>

Every strike zone has the same width, so plotting the horizontal location of each pitch is relatively easy. However, not every strike zone has the same height. To adjust for this, I measure each pitch’s height relative to the zone instead of its height relative to the ground using something I call a double axis approach. As you can see, a pitch’s height on the normalized zone does not represent its true height. Instead, it represents it’s distance from the zone:

<p style="font-size: medium; font-weight: 700; width: 100%;">How are run expectancy impacts calculated?</p>

There are 288 possible base runner, out, count combinations (8 possible base states, 0, 1, or 2 outs, and 12 different counts). Each one of these has a unique run expectancy, or the number of runs a team is expected to score from that instance until the end of the inning. To calculate run expectancy effects, I simply find the difference between a team’s run expectancy before and after a bad call. For a more in depth explanation, read the article I wrote for FanGraphs [here](https://community.fangraphs.com/the-effect-of-umpires-on-baseball-umpire-runs-created-urc/).

<p style="font-size: medium; font-weight: 700; width: 100%;">How is umpire consistency measured?</p>

This year, the new umpire consistency metric is a measure of how many true balls were inside of the umpire-established strike zone, or the smallest polygonal area that can contain all of the pitches that were called a strike. Each ball inside that zone, then, is inconsistent with the umpire's zone. To read more about this process, read [here](https://ethan-singer.com/articles/umpire-consistency-scores.html).