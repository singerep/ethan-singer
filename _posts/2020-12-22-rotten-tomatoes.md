---
layout: post
title:  "Audiences vs. Critics on Rotten Tomatoes"
subtitle: "How audiences and critics reviewed 2020's top grossing movies."
short-hand: "rotten-tomatoes"
tags: "arts"
permalink: "articles/rotten-tomatoes"
old_css: "True"
---

Audiences members and critics perceive movies through drastically different lenses. The former picks the movie apart; she analyzes its cinematography, direction, production, and much more. The latter, on the other hand, simply sits back and enjoys the show (or the movie, in this case).

Because of these differences in perspective, critics and audiences will often differ in how they appraise movies. To analyze this difference, I built a dataset of the Rotten Tomatoes scores of the top 100 grossing movies of 2020.

I found that the average audience rating for these movies was 5.56 points higher than the average critics rating (70.32 vs. 64.76), and that the audience rating was higher than the critics rating for 60% of the 100 movies. Here is how different movies were scored by audiences and critics:

<div class='article-image'><img src='/post-assets/rotten-tomatoes/aud-vs-crit.jpg'></div>

The movie "2 Hearts," directed by Lance Hool, had the greatest difference between its critic and audience score (19 and 83, respectively). The top verified audience review, written by "Movie Goer 2020", asserts that "[the movie] was a moving story. Since it was based upon a true story, it made it even more impactful. On the other hand, it was also kind of sad and depression due to the topic and outcome." Meanwhile, the critical consensus describes the movie as a "treacly melodrama," and the top verified critic writes, "[this] is the sort of film for which the term 'tearjerker' was invented, but this one jerks them so violently you may need medical attention afterwards."

I also analyzed the tendency for audiences to rate movies higher than critics at the genre level. Here is a breakdown of how often either audiences or critics rated a movie higher, by genre.

<div class='article-image'><img src='/post-assets/rotten-tomatoes/winner-by-genre.jpg'></div>

The distributions of scores from audiences and critics also differed significantly. I found that audience ratings varied less than critics ratings (standard deviation of 19.8 vs. 25.4), and that audiences were much less willing than critics to give movies a score below 25. Here is how the two group's scores were distributed:

<div class='article-image'><img src='/post-assets/rotten-tomatoes/score-distributions.jpg'></div>