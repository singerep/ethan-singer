---
layout: "post"
title:  "Umpire Runs Created"
subtitle: "An in depth analysis of how missed ball and strike calls can affect the game of baseball."
short-hand: "umpire-runs-created"
tags: "sports baseball"
permalink: "articles/umpire-runs-created" 
old_css: "True"
---

It’s a cool and breezy April afternoon down by Baltimore’s Inner Harbor, and the mid-rebuild Orioles are taking on the division-winning and record-breaking Minnesota Twins. Trying to salvage the final contest of a three-game series, the O’s — to no one’s surprise — find themselves trailing in the bottom of the ninth. But not all hope is lost. The Twins’ lead is small — two runs — and the Orioles have some of their best players due up. Out of the gate, Twins pitcher Taylor Rogers hits the first Orioles batter, Joey Rickard, in the foot. Then, after a Chris Davis lineout, Jesús Sucre resurrects the inning with a single to left that advances Rickard to third. The comeback is on.

Hanser Alberto then plunges the Orioles hopes back down to earth with a swinging strikeout that gives his team just one more out with which to work. But then comes Jonathan Villar, who rips a double to deep left, scoring Rickard and advancing Sucre to third. The Twins lead is cut in half. After an intentional walk to Trey Mancini that loads the bases, the game now rests in Pedro Severino’s hands. With two outs and the bases loaded, still down by one, Severino manages to work the count to 3-0. His team is one pitch away. The crowd is on its feet. Rogers winds and delivers his pitch. It’s outside! “Ball 4!” the commentator exclaims. The fans cheer, Severino begins to walk towards first, and the tying run starts his trot towards home. But suddenly, the umpire punches his arm through the air. He called it a strike. Severino walks back towards home plate, distraught. He pops up the very next pitch, and just like that, the game is over.

Using data from Baseball Savant’s pitch-by-pitch library, we can begin to understand the role that these incorrect calls play in baseball. By matching up the database’s pitch locations to the calls associated with those pitches, we can see which calls were supposedly correct, and more importantly, which were not. The results are pretty astounding. Last year, by this data, MLB umpires made a total of 33,277 incorrect calls. That’s good for 13.8 per game, or just over 1.5 per inning. While not every bad call is a comeback-killer, these mistakes have the ability to greatly alter an at-bat, a game, and maybe even a season.

For some perspective, a total of 731,778 pitches were thrown last year. Now, keep in mind that umpires don’t make calls on every pitch. Calls are only made on pitches that the batter decides not to swing at — a category that makes up just over 50% of all thrown pitches. Thus, those 33,277 bad calls represent almost 9% of all called pitches, a remarkably high rate. Even within all of those bad calls, however, a large amount of variation exists. For example, while only 7.4% of actual balls were called strikes, over 11% of actual strikes were called balls (most likely because when a pitch is taken, there is an implicit assumption that it is a ball). And while only 4.1% of 0-2 pitches were called incorrectly, 11.3% of 2-0 pitches were called incorrectly.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart1.png)

Documenting the frequency of these mistakes has been a topic for years. In what is likely the most popular umpire analysis, a team of researchers at Boston University analyzed how often bad calls are made, in what situations they are most likely, and how we can attempt to eliminate them from baseball. However, little work has been done in the realm of estimating the impact of these errors.

This article examines two methods of estimating the impact of an incorrect call: an outcome-dependent analysis and an outcome-independent analysis. In the outcome-dependent analysis, the result of an at-bat is credited to a specific missed call. For example, imagine a batter has two strikes. A pitch is thrown that was incorrectly called a ball. In other words, the batter should have been out on a called third strike but was instead given another chance. Now let’s imagine that this batter hits a home run later in the at-bat. Using this method, we could say that this specific bad call was worth one home run. On the season, we could find out which at-bats should have been strikeouts but instead resulted in the batter getting on base. This happens more often than you might think. Below is an analysis showing how often batters should have been struck out instead of reaching base, broken down by the outcome of their at-bat.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart2.png)

As seen above, in 2019, about 4% of the time that a batter reaches base they should have already been called out on strikes.

One problem with the outcome-dependent approach is that it determines the value of a bad call based upon the result of the at-bat. This means that two bad calls, in the exact same scenario, could be worth different amounts. If player A and player B were both kept alive due to bad calls, but only player A ends up scoring, should those missed calls really be valued differently? A second problem is that it can only value missed calls based on what did happen, not on what didn’t. Imagine a different scenario in which a bad call ends an at-bat, instead of keeping it alive — the batter should have had another chance but was instead out. We will never know what would have happened had the at-bat continued, so there is no way for us to value the missed call. A third problem is that it does not value scenarios in which the outcome of the at-bat does not directly follow the missed call. How do we value a missed call when the count is 0-0?

In the outcome-independent analysis, however, the result of the at-bat does not determine the value of the missed call. Each bad call, in any given scenario, is valued equally. To create these values, every possible scenario needs to be ascribed its own run expectancy, or how many runs are expected to be scored from that scenario until the end of the inning. To find these expected values, we start with a variation of RE24 (explained in depth here). The RE in RE24 stands for run expectancy, and the 24 indicates the 24 possible base-out combinations (0, 1, or 2 outs, and 8 different base situations). RE24 allows us to estimate how many runs will be scored from any given base-out combination until the end of an inning. For example, RE24 allows us to say that a team with the bases empty and one out is expected to score 0.243 runs before the inning is over.

However, for an analysis of bad calls, we need more than just the 24 possible base-out combinations. We need to add the count of the at-bat into the equation. Doing so yields RE288, which gives us the run expectancy for all 288 base-out-count combinations (0, 1, or 2 outs, 8 different base situations, and 12 possible counts). With RE288, we can estimate how many runs any given scenario is worth based on the count, the placement of base runners, and the number of outs. Below is a table summarizing the results over the last two seasons. For Base Situation, each character represents a base: _ _ _ is bases empty, 1 2 3 is bases loaded.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart3.png)

From this, we can determine the run expectancy of any given scenario. For example, a team is expected to score 2.81 more runs in an inning if they have the bases loaded with no outs on a 3-0 count. In contrast, a team is only expected to score 0.06 more runs in an inning if the bases are empty with two outs and the count is 0-2. Once the run expectancy for all 288 possible scenarios is determined, calculating the effect of a bad call is relatively easy. You simply look at how much the run expectancy would change if a ball was thrown versus a strike and find the net difference between the two.

This difference is called the Run Expectancy Delta, or RED, of a given scenario. For example, imagine the count is 0-0 with the bases empty and no outs. This situation has a run expectancy of 0.51 runs. Now imagine a ball is called. The new run expectancy (1-0 count, bases empty, no outs) is 0.56 runs. However, the umpire made a mistake, and the pitch should have been called a strike. Well, in a world in which the umpire made the correct decision (0-1 count, bases empty, no outs), the run expectancy would have been 0.46 runs. We can then conclude that this specific bad call was worth 0.1 runs (0.56 – 0.46), and that the RED of an 0-0 count with the bases empty and no outs is also 0.1 runs. Because it is the difference between an extra ball and an extra strike, RED is always positive.

This method becomes tricky when you consider more complex scenarios. What if a ball or strike would change the base situation, change the number of outs, change the score of the game, or potentially end the inning? For example, imagine the count is 3-2 with two outs and the bases loaded. The run expectancy for this given scenario is 1.04 runs. If a ball is called, the count does not go to 4-2. Instead, the count becomes 0-0, the bases are still loaded, there are still two outs (RE = 0.74), but an additional runs also scores. However, if a strike is thrown instead, the count does not go to 3-3, but instead, the inning is over. Thus, based on RE288, the Leverage of a 3-2 pitch with the bases loaded and two outs is 1.74 runs. Here is a similar chart to before, except it now shows the RED of a pitch based on the situation. All of the considerations explained above are controlled for.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart4.png)

Unsurprisingly, the highest RED situations are those with 3 balls, 2 strikes, and the bases loaded, as the next pitch determines whether a runs scores or the at-bat is over. A histogram of all Run Expectancy Deltas can be seen below. The mean RED of all pitches was 0.32 runs, while the median was 0.24 runs.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart5.png)

Over the course of an at-bat, an inning, a game, or a season, we can add these Run Expectancy Deltas together to create Umpire Runs Created, or uRC. uRC is simply the summation of all incorrect calls and their respective REDs in a given time period. For example, let’s take a look at uRC in a single game context. Imagine an umpire makes two bad calls, one that takes 0.25 runs in value away from the home team and another that gives the away team 0.25 runs in value. The Net Umpire Runs Created (NuRC), defined as the difference between the home uRC and the away uRC (-0.25 – 0.25 = -0.5 in the above scenario) can be used to describe which team was helped more by umpires and by how much. We can also create GuRC, or Game Umpire Runs Created, which is simply the absolute value of NuRC (0.5 in the above scenario). GuRC reflects more on the umpire, as it only shows how much a team was favored, not which specific team was favored.

Last year, the average umpire intervention was worth about half a run per game. In some games, however, the umpire was worth much more. In 2019, there were 346 games that had a GuRC of more than one run, 27 with a GuRC more than two runs, and five with a GuRC of more than three runs. The histogram of GuRC can be seen below.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart6.png)

In fact, last year there were 58 games where if each team’s uRC was added to their final score, the winner of the game would have changed.

Interestingly, on the season, umpires actually depress scoring. As discussed before, umpires like to help batters on a pitch-by-pitch basis at a higher rate than they like to hurt them (11% vs 7.4%), but umpires actually hurt batters at a much higher volume. This is because the overwhelming majority of taken pitches (70%) are balls, so an umpire only has the ability to help a batter with a wrong call 30% of the time.

These bad calls add up to significantly decrease the total amount of runs each team can score in a season. Below is a histogram showing how uRC affected each team last year. The horizontal axis indicates how much a team lost in terms of run expectancy over the season.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart7.png)

The average team lost about 24 runs due to umpires last year. This adds to about 733 total runs lost in the season.

Out of all teams, it just so happens that the Washington Nationals, reigning World Series champions, were hurt the most by incorrect calls (-43.3 runs on the season). The Rangers fared the best, with umpires only decreasing their season run total by about 4 runs. Here is how uRC affected each team last year.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart8.png)

Finally, we can use Umpire Runs Created to asses the performance of umpires across baseball. Here are the 15 best and worst umpires in terms of Average uRC per game.

![percent of pitches called incorrectly](/post-assets/umpire-runs-created/chart9.png)

Baseball fans love to blame a devastating loss on an umpire, and Umpire Runs Created allows us to do just that. Hopefully Orioles fans will take solace in the fact that they could have defeated the mighty Minnesota Twins that fateful April afternoon if not for the umpire and his bad call in the bottom of the ninth.