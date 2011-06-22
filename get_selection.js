/*
*	Script Name:
*	get_selection.js
*
* Description:
*	This script is injected into a web page in order to return the position of
*	the text selection.
*	
*	License:
*	MIT
*/

// Listen for messages
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
		            "from a content script:" + sender.tab.url :
		            "from the extension");
		            
		if (request.action == "position") {
			
			// Get the selected text
			var range = window.getSelection().getRangeAt(0);

			// Create a dummy element with the id 'pagerank' and insert this into the range
			var dummy = document.createElement("span");
			dummy.id = "pagemark";
			range.insertNode(dummy);

			// Get the dummy element
			var box = document.getElementById("pagemark");
			// Find it's position in the page
			var y = box.offsetTop;

			// Remove the dummy element
			dummy.parentNode.removeChild(dummy);
			
			// Return the y variable
			sendResponse({position: y});
			
		} else {
		  sendResponse({});
		}
});
