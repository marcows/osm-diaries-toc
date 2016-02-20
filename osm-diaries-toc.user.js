// ==UserScript==
// @name        OSM diaries TOC
// @namespace   https://github.com/marcows
// @description Adds a table of contents to the OpenStreetMap diaries page and highlights new posts and comments.
// @include     *://www.openstreetmap.org/diary*
// @version     0.1.0
// @icon        http://www.openstreetmap.org/assets/osm_logo.png
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var articleLinks = document.querySelectorAll(".diary_post h2 > a");
var commentLinks = document.querySelectorAll(".diary_post .secondary-actions a[href$=comments]");

var toc = document.createElement("table");

/* Create table of contents. */
for (var i = 0; i < articleLinks.length && i < commentLinks.length; i++) {
	var articleLink = articleLinks[i].cloneNode(true);
	var commentLink = commentLinks[i].cloneNode(true);

	var tablerow = document.createElement("tr");
	var cell, link;

	// Anchor name of the (original) article if not existing yet
	if (!articleLinks[i].name)
		articleLinks[i].name = "article" + i;

	/* Column 1: anchor link for scrolling down to article */
	link = document.createElement("a");
	link.innerHTML = "&dArr;";
	link.href = "#" + articleLinks[i].name;

	cell = document.createElement("td");
	cell.appendChild(link);
	tablerow.appendChild(cell);

	/* Column 2: link to article in own page */
	cell = document.createElement("td");
	cell.appendChild(articleLink);
	tablerow.appendChild(cell);

	/* Column 3: link to article comments in own page */

	// Highlighted if changed since last visit (new comments or entire new post)
	var key = commentLink.href;
	var newVal = commentLink.textContent;
	var oldVal = GM_getValue(key);

	if (newVal !== oldVal) {
		commentLink.style.color = "red";
		GM_setValue(key, newVal);
	}

	cell = document.createElement("td");
	cell.appendChild(commentLink);
	tablerow.appendChild(cell);

	toc.appendChild(tablerow);
}

document.querySelector(".content-body .content-inner").insertBefore(toc, document.querySelector(".diary_post"));
