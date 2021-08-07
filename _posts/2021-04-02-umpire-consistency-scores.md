---
layout: post
title:  "Umpire Consistency Scores (UCS 1.0)"
short-hand: "umpire-consistency-scores"
subtitle: "A new measure of umpire consistency for UmpScorecards."
tags: "sports baseball"
permalink: "articles/umpire-consistency-scores"
---

Last season, a section of my UmpScorecards FAQ titled "Do you take consistency into account?" read "Unfortunately, the answer is no. I have not yet figured out a way to measure an umpire’s consistency, at least in a way that can be easily interpreted. I would like to implement some sort of consistency score in the future, though, so let me know if you have any suggestions."

As of this season, however, the UmpScorecards graphics will include brand new Umpire Consistency Scores, or UCS. The general idea is to measure how consistent an umpire was in his calls, not just his accuracy.

The first step in generating an umpire's UCS is to find the umpire's established strike zone. The established strike zone is defined as the smallest polygonal area that contains all of the umpire's called strikes, otherwise known as the convex hull. Here is an example of what this may look like.

![established zone plot](/post-assets/umpire-consistency-scores/established-zone.png)

After the established zone is measured, the final step is to simply count the number of balls outside of this zone (considered consistent) and divide by the total number of balls. The average for MLB umpire's last season was around 96%. 

For more information on this process, and to see the inspiration behind this metric, read [this](https://community.fangraphs.com/a-metric-for-home-plate-umpire-consistency/) article from Fangraphs or [this](https://djhunter.github.io/inconsistency/HunterUmpireTalk18.pdf) research presentation. 