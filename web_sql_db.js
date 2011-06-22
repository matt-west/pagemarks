function openDB() {
	this.db = openDatabase('pagemarks', '1.1', 'PageMarks', 8192);
	this.db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS pagemarks(id integer primary key asc, url string, title string, scrollValue float)");
	});
	// console.log("opened db");
}

function addPageMark(url, title, scrollValue) {
	openDB();
	
	this.db.transaction(function(tx) {
		tx.executeSql("INSERT INTO pagemarks (url, title, scrollValue) values ('"+url+"', '"+title+"', "+scrollValue+")");
		// console.log("added new pagemark: " + title);
	});
}

function deletePageMark(id) {
	openDB();
	
	this.db.transaction(function(tx) {
		tx.executeSql("DELETE FROM pagemarks WHERE id='"+id+"'");
		console.log("deleted pagemark: "+id);
	});
}

function getPageMarks() {
	openDB();
	
	this.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM pagemarks", [], 
			function(tx, results) {
				
				if (results.rows.length == 0) {
					document.getElementById("list").innerHTML = "<li class='noItems'>You currently have no PageMarks!</li>";
				}
				
		    for (var i = 0; i < results.rows.length; i++) {
		    	pagemark = results.rows.item(i);
		    	document.getElementById("list").innerHTML += "<li><a href='"+pagemark.url+"' pre-data='"+pagemark.id+"' onclick='newTabWithScroll(this.href, "+pagemark.scrollValue+")' >"+pagemark.title+"</a><a href='#' class='deletePM' onclick='deletePM("+pagemark.id+")'>x</a></li>";
		    }
		  }, 
		  function (tx, err) {
				document.innerHTML += '<p>failed: <em>' + err.message + '</em></p>';
			});
	});
	
}
