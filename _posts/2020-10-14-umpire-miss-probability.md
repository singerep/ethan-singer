---
layout: post
title:  "Umpire Miss Probability"
short-hand: "umpire-miss-probability"
subtitle: "A new way of classifying missed ball and strike calls for UmpScorecards."
tags: "sports baseball"
permalink: "articles/umpire-miss-probability"
old_css: "True"
---

When I started this account, I considered a pitch a strike when it came into any amount of contact with the zone, something I called the zero tolerance approach. I gave the umpire no room for error when determining whether a pitch was a ball or a strike. As of 10/14/2020, with the addition of Umpire Miss Probability (UMP) 1.0, that is no longer the case.

The zero tolerance approach is certainly the easiest way to determine the validity of ball and strike calls. The process goes like this: you take a pitch’s horizontal and vertical location, add in the radius of a baseball, and use collision geometry to determine if any part of the ball comes into contact with any part of the strike zone. If it did, the pitch is considered a strike; otherwise, it is considered a ball. And if this designation is mismatched with the umpire’s call, said call is considered to be incorrect.

The problem with this approach lies within the pitch tracking system itself. Despite the MLB making major improvements to their tracking systems, they still report an average of about 0.25 inches (the width of a pencil) of error in both the horizontal and vertical direction when measuring the location of a pitch. Unfortunately, 0.25 inches of error, or any error for that matter, is enough to change whether a pitch is a ball or a strike. As such, a zero tolerance approach has the potential to penalize umpires for making incorrect calls when, in reality, measurement error was the true culprit.

This is the problem UMP 1.0 is designed to solve. Instead of determining the designation of a pitch simply based on its measured location, I assign each pitch a *probability* that it was a strike  and a *probability* that it was a ball. And from there, I can easily derive the probability that a specific call was incorrect. Finally, only if the incorrect call probability is greater than 95% do I consider the call to truly be incorrect. With UMP 1.0, I can ensure that each call determined to be incorrect is legitimately incorrect, and is not just incorrect as a result of measurement error.

To learn more about how these probabilities are calculated, continue reading:

Again, the error within the MLB tracking system [Hawkeye](https://technology.mlblogs.com/introducing-statcast-2020-hawk-eye-and-google-cloud-a5f5c20321b8) is reported to be about 0.25 inches on average. Here is a plot depicting this error:
![accuracy plot](/post-assets/umpire-miss-probability/accuracy plot.png)

To determine the likelihood that each pitch is either a ball or a strike while adjusting for this error, I use what is called the simulation approach. Based on the measured position of each pitch (x, z), I generate 10,000 of that pitch's potential "true" locations. To do so, I begin with two 10,000 point sample distributions that represent the potential error within the tracking system (N(0, 0.25)). One of these distributions represents potential errors in the x direction (x_error1, x_error2, ..., x_error10000), and the other represents potential errors in the z direction (z_error1, z_error2, ..., z_error10000). These two sample distributions are then merged together to create 10,000 individual matched pairs that represent potential errors in both the x and z direction: [(x_error1, z_error1), (x_error2, z_error2), ..., (x_error10000, z_error10000)]. Then, to generate each of the potential true locations, I simply add the originally measured position (x, z) and each of the 10,000 possible adjustments. This results in a distribution that looks like this: [(x + x_error1, z + z_error1), (x + x_error2, z + z_error2), ..., (x + x_error10000, z + z_error10000)]. Lastly, I simply count how many of those 10,000 potential locations are within the strike zone using the collision geometry described above. This returns the probability that each pitch was a strike (P(s)). The probability that a pitch was a ball (P(b)) is just 1 - P(s). Finally, I can derive the probability that a call was incorrect (P(i)) from P(s) and P(b). If the umpire calls a ball, P(i) = P(s). If the umpire calls a strike, P(i) = P(b). If P(i) is greater than 0.95, the call is considered incorrect and is plotted.

To reiterate, using UMP 1.0 ensures that measurement error can no longer be the reason a call is found to be incorrect. As a result, switching to UMP 1.0 will make my work significantly more accurate.