// ==UserScript==
// @name       Dev Personal Area Redirect
// @version    0.1
// @description personal dev area redirect
// @include        *dev*.unfranchise.co*
// @include        *dev*.marketamerica.co*
// @include        *dev*.shop.co*
// @copyright  2012, Mike Santoro
// ==/UserScript==
setTimeout("$.getScript('//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js', function(){$.getScript('//devImages.marketamerica.com/stage/santoro/lib/js/devAreaRedirect.js?call=' + Math.floor(Math.random()*1100));});", 500);

