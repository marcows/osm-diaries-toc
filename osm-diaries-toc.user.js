// ==UserScript==
// @name        OSM diaries TOC
// @namespace   https://github.com/marcows
// @description Adds a table of contents to the OpenStreetMap diaries page and highlights new posts and comments.
// @include     *://www.openstreetmap.org/diary*
// @version     0.1.0
// @icon        http://www.openstreetmap.org/assets/osm_logo.png
// @grant       none
// ==/UserScript==

var articleLinks = document.querySelectorAll(".diary_post h2 > a");
var commentLinks = document.querySelectorAll(".diary_post .secondary-actions a[href$=comments]");

var toc = document.createElement("table");

/* Create table of contents. */
for (var i = 0; i < articleLinks.length && i < commentLinks.length; i++) {
	var tablerow = document.createElement("tr");
	var cell, link, anchor;

	/* Column 1: anchor link for scrolling down to article */
	anchor = "article" + i;
	link = document.createElement("a");
	link.innerHTML = "&dArr;";
	link.href = "#" + anchor;

	cell = document.createElement("td");
	cell.appendChild(link);
	tablerow.appendChild(cell);

	/* Column 2: link to article in own page */
	cell = document.createElement("td");
	cell.appendChild(articleLinks[i].cloneNode(true));
	tablerow.appendChild(cell);

	/* Column 3: link to article comments in own page */
	cell = document.createElement("td");
	cell.appendChild(commentLinks[i].cloneNode(true));
	tablerow.appendChild(cell);

	// Anchor name of the article if not existing yet
	if (!articleLinks[i].name)
		articleLinks[i].name = anchor;

	toc.appendChild(tablerow);
}

document.querySelector(".content-body .content-inner").insertBefore(toc, document.querySelector(".diary_post"));
