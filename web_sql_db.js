function openDB() {
	this.db = openDatabase('pagemarks', '1.1', 'PageMarks', 8192);
	this.db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS pagemarks(id integer primary key asc, url string, title string, scrollValue float)");
	});
	console.log("opened db");
}

function addPageMark(url, title, scrollValue) {
	openDB();
	
	this.db.transaction(function(tx) {
		tx.executeSql("INSERT INTO pagemarks (url, title, scrollValue) values ('"+url+"', '"+title+"', "+scrollValue+")");
	});
}

function getPageMarks() {
	openDB();
	
	this.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM pagemarks", [], 
			function(tx, results) {
		    for (var i = 0; i < results.rows.length; i++) {
		    	pagemark = results.rows.item(i);
		    	document.getElementById("list").innerHTML += "<li><a href='"+pagemark.url+"' pre-data='"+pagemark.id+"' onclick='newTabWithScroll(this.href, "+pagemark.scrollValue+")' >"+pagemark.title+"</a></li>";
		    }
		  }, 
		  function (tx, err) {
				document.innerHTML += '<p>failed: <em>' + err.message + '</em></p>';
			});
	});
	
}
