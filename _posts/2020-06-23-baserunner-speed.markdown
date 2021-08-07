---
layout: post
title:  "Baserunner Speed"
short-hand: "baserunner-speed"
subtitle: "How valuable are the fastest runners in baseball? And do they always make good choices?"
tags: "sports baseball"
permalink: "articles/baserunner-speed"
old_css: "True"
---
Speed is undeniably one of the most important skills a player can have. Whether it’s by advancing as a runner and getting into scoring position, or by expertly tracking down a fly ball in center field, faster players provide their teams with certain outcomes that slower players simply cannot. Albert Pujols, likely our generation's slowest player, leads all of baseball history in one category: grounding into double plays. As a result of it’s importance, baseball scouts consider speed to be one of the 5 most crucial aspects when judging a prospect.

By Baseball Savant’s Sprint Speed metric, Tim Locastro, Trea Turner, and Byron Buxton are the most lethal baserunners in the game (respectively: 30.8, 30.4, 30.3 feet per second). They easily beat out the league average of 27 feet per second, while they dwarf last year’s league minimum of 22.2 feet per second set by Atlanta’s own Brian McCann. For some context, Locastro would beat McCann in a race to first by well over a second.

But do those seconds really matter? Over a season, can those seconds add up to runs scored or games won? And in what situations do they help the most?

To answer these questions, we need to look at how teams score runs when they have fast versus slow players. To do so, we can use an altered version of RE24, explained in depth here. The RE in RE24 stands for run expectancy, and the 24 indicates the 24 possible base-out combinations (0, 1, or 2 outs, and 8 different base situations). RE24 allows us to estimate how many runs will be scored from any given base-out combination until the end of an inning. For example, RE24 allows us to say that a team with the bases empty and one out is expected to score 0.243 runs before the inning is over. For this analysis, we need to add one other element into the mix: speed.

By doing so, we can find the run expectancy of a team based on how many outs there are, where the base runner(s) stand, and the speed of the base runner(s). That final category, “the speed of the base runner(s),” is defined as: the average speed of a team’s runners in scoring position, or the speed of the furthest runner if there is either only one runner is scoring position or no runners in scoring position, or the speed of the batter if the bases are empty. This outputs a speed variable that can be broken up into three categories: slower than average (less than 26 feet per second), average (26 to 28 feet per second), or faster than average (above 28 feet per second). This yields the table below.

![Differences in run expectancy](/post-assets/baserunner-speed/RE96.jpeg)

As expected, a team’s run expectancy tends to go up when that team has faster runners. To further analyze just how much of a difference speed can make, we can find how much a team would benefit from having fast runners instead of slow runners in each of those 24 situations. Below is a chart showing just that: for all 24 base-out combinations, how much does a team’s run expectancy change with fast versus slow runners.

![Differences in run expectancy](/post-assets/baserunner-speed/Differences.jpeg)

There are some pretty interesting results here. First, it seems that the speed of the runner on third is incredibly important. According to the analysis, having a faster runner on third versus a slow one consistently makes a big difference. My guess for why this is true is that faster runners on third can score on more sacrifice plays than can slow runners, and they can more easily score on ground balls. The next interesting pattern is that across the board, runner speed is most important with no outs. This is unsurprising, as teams and players take less risks with one or two outs, eliminating the role speed can play. The third and most interesting result is that big red spot in the top right corner. Yes, you are reading that correctly. When a team has the bases loaded and no outs, they are expected to score 0.25 more runs with slow runners instead of fast ones. Slow runners instead of fast ones.

Now obviously, it’s not a bad thing to have faster runners. But when the bases are loaded and there are no outs, faster runner start to make less than ideal decisions. To players, especially fast ones, this seems like the best time to take risks. For example, across the last two seasons, slow runners accounted for zero outs when there was a hit with the bases loaded and no outs. No rundowns, no outs on the throw to home, nothing. Fast runners, however, recorded an average of 0.2 outs per hit in the same situation. It seems that in this seemingly low risk scenario, faster runners make poorer decisions, and end up recording more outs.

However, faster runners also score more runs. Are the extra outs worth the extra runs? The data tells us no, and the reason why is pretty simple: with the bases loaded and no outs, a team’s run expectancy is already so high that there is little reason to risk an out.