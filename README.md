OSM diaries TOC
===============

This is a [Greasemonkey](http://www.greasespot.net/) user script for the
[OpenStreetMap diaries](http://www.openstreetmap.org/diary) page.
It adds a table of contents to that site and highlights the corresponding table
entry for new posts or comments since the last visit.

Since the OpenStreetMap website was lacking a notification feature for
the user diaries, this was a way to improve this situation to some degree.
But even now this script still has the advantage to work without having to log
into the website and might be sufficient for checking the latest diary posts.

The detection of new comments is implemented by storing and comparing the
language dependent comments link text. So it doesn't work if switching the
website language. In this case, all comments will appear to be new again.

To use this script in a web browser, you first need to install one of these
extensions:

  * Greasemonkey
  * Tampermonkey
  * Violentmonkey
