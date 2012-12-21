// ==UserScript==
// @name           change code review to Greenscreen
// @description    change code review to my theme
// @include        *codereview.maeagle.corp*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$($("link")[2]).attr("href", "http://devimages.marketamerica.com/stage/santoro/lib/styles/usa/cr/greenScreen.css");
