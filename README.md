# Top 20 Spotify Artists
Site that allows users to see their top 20 artists (by listening habits in the last six months) on Spotify.

**About**

This site uses Spotify's API (with the Oauth implicit grant type used for authorisation) to get a user's top 20 artists (determined from duration that the user listened to each artist).
Following login to Spotify (via a pop-up window), a fetch request to Spotify API is made with the authorisation token. The response is then used to dynamically populate
the UI with the artist's displayed in order with an external link to each artist on Spotify if the user wants more detail on any of the artists displayed.

**Purpose**

The site is built with a combination of html, css, and javascript.

I built this to reinforce the following key concepts:

* oAuth implicit grant type authorisation flow
* Fetch API to obtain third-party data (via Spotify's API)
* Responsive Design Principles
* Promise Chaining

**Site Link**: https://yourtop20artists.netlify.app
