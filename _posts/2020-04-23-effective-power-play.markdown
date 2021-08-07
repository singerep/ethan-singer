---
layout: post
title:  "Effective Power Play"
subtitle: "A new hockey statistic used to compare a team's scoring potential when on and off the power-play."
short-hand: "effective-power-play"
card_url: "/images/effective-power-play/card.jpg"
tags: "sports hockey"
permalink: "articles/effective-power-play"
old_css: "True"
---
Power Play Percentage (PP%) is perhaps the most overrated statistic in all of professional sports. High in usage but low in value, PP% gives fans of hockey an overly-simplified and unrepresentative lens through which to view a team’s power play.

Before we begin, let's discuss what power play percentages really indicate. In its simplest form, the statistic is found by dividing a team’s power play goals (PPG) by that team’s power play opportunities (PPO). As a result of its simplicity and ease of use, PP% has been the defining statistic of a team’s power play through the history of hockey analytics.

What PP% does not indicate, however, is how many actual goals a team scored on the power play.

![Powerplay percentage vs goals](/post-assets/effective-power-play/PP. vs PPG.png)

As you can see, teams with the same PP% can largely vary in terms of how many actual goals they score on the power play. For example, take the 2018/19 Calgary Flames. Their power play ranked 18th in the league, at 19.37%, but they managed to have the 8th most power play goals (53). For a more extreme example, look no further than the 2015/16 Arizona Coyotes. They had an abysmal PP% at 17.67%, good for 20th in the league. And yet, those Yotes managed to score 53 power play goals, good for 7th in the league. The reason why is simple: teams draw penalties at vastly different rates.

Over the last five seasons, NHL teams have averaged about 9.1 minutes worth of power play per game. But the range is pretty astounding. The data had a maximum of 12.1 minutes per game, achieved by the Penguins of 2014/15, close to double the dataset’s minimum of 6.6, set by the Hurricanes of 2016/17. That’s right, double. Those Penguins could have had literally half of the 16/17 Hurricane’s PP% and still scored just as many power play goals. Just like we praise great goal scorers for generating shots, not just scoring them, we should award great teams for drawing penalties, not just converting on their power plays. To do this, instead of using (PP Goals)/(PP Opportunities), we use (PP Goals)/(Game). By removing PP Opportunities as a denominator, we can reward teams for drawing more penalties.

Another deficiency of the PP% comes from its lack of ability to adjust for conceded short handed goals (SHA). If Team A scores a goal on the penalty kill, and then Team B scores a power play goal 30 seconds later, should Team B still be rewarded? After all, the game’s goal differential remained the same. With this in mind, we can pretty easily make a different adjustment to PP%, one that will allow us to account for short handed goals: instead of using (PP Goals)/(PP Opportunity), we can use (PP Goals – SHA)/(PP Opportunity). We call this Adjusted Power Play (aPP%).

This adjustment can have a pretty large effect.

![Powerplay percentage vs goals](/post-assets/effective-power-play/Rplot.png)

Here, the black line represents a team if they gave up no short handed goals on the season. Unfortunately for every team in the data set, this feat is all but impossible. And yet, some teams did worse than others.

![Powerplay percentage vs goals](/post-assets/effective-power-play/SHA hist.png)

As seen above, teams give up short handed goals at a wide variety of rates. Take the 2018/19 Penguins, who gave up 15 short handed goals, over a quarter of their own power play goals (56). Doing so created a staggering difference in their PP% and aPP% (6.5%). Compare this with the 2018/19 New York Islanders, who gave up, unbelievably, just one short hand goal, good for best in the league. Doing so resulted in an aPP% just 0.44% lower than their PP%. The Islander’s PP% ranked 29th in the league that year, but their ability to prevent short handed goals leapfrogged their aPP% into 22nd place.

The combination of these alterations leaves us with a new statistic called Effect Power Play (ePP), determined by (PP Goals – SHA)/(Game). This reflects not only a teams propensity to score when on the power play, but also their ability to draw the power play, and their ability to prevent short handed goals. Simply, ePP indicates how much goal differential a team’s power play generates per game. As a final alteration, we can normalize ePP to a league average of 100, creating ePP+. With ePP+, a number such as 170 indicates a team 70% better than average, whereas a number such as 60 indicates a team 40% worse than average.

Below is a table containing all of the teams from last season (2018/19), with information regarding their Power Play Percentage, Effective Power Play (ePP+ included), and their ranks in those respective categories. The final column shows the difference in those ranks.

![Powerplay percentage vs goals](/post-assets/effective-power-play/Long table.jpg)

Some of these results are pretty astounding. Take the Calgary Flames, whose PP% ranked 18th, but by generating a high volume of power plays and by preventing short handed goals, jumped their ePP to 7th place. Compare this to the Maple Leafs, whose 21.8% Power Play initially ranked 8th, but who also had an embarrassing 6.7 power play minutes per game, which dropped their ePP rank all the way to 17th.

As a final justification of the use of ePP and ePP+ instead of PP%, lets take a look at the two statistics’ effect on wins.

![Powerplay percentage vs goals](/post-assets/effective-power-play/ePP v W.png)

From a purely analytic standpoint, ePP+ and ePP do a better job of predicting a team’s season win total than does PP% (r^2 = .22 vs. r^2 = .15).

Overall, ePP and ePP+ offer a more simplistic, holistic, and representative quantification of a team’s power play unit.