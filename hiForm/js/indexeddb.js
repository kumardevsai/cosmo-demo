if (!window.indexedDB) {
	window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB || window.oIndexedDB;
}

var db = null;

// 打开数据库

function openDatabase(callback) {
	var request = indexedDB.open("hiformDB", 1);
	request.onerror = function(e) {
		console.log("Database error: " + e.target.errorCode);
	};
	// 数据库初始化
	request.onsuccess = function(e) {
		db = request.result;
		if (callback)
			callback();
	};
	request.onupgradeneeded = function(evt) {
		var db = (evt.target || evt.srcElement).result;
		if (!db.objectStoreNames.contains('list')) {
			var objectStore = evt.currentTarget.result.createObjectStore("list", {
				keyPath: "ssn",
				autoIncrement: true
			});

			objectStore.createIndex("httpIndex", "http", {
				unique: true,
				multientry: false
			});

			objectStore.createIndex("passwordIndex", "password", {
				unique: false,
				multientry: false
			});
			objectStore.createIndex("usernameIndex", "username", {
				unique: false,
				multientry: false
			});
			objectStore.createIndex("updateDateIndex", "updateDate", {
				unique: false,
				multientry: false
			});
			objectStore.createIndex("createDateIndex", "createDate", {
				unique: false,
				multientry: false
			});
		}
	};
};

// 获取连接是事物

function getTransaction(name) {
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
		READ_WRITE: 'readwrite'
	};
	var transaction = db.transaction([name], IDBTransaction.READ_WRITE || 'readwrite');
	return transaction;
};

// 删除数据库

function deleteDatabase(dbName, callback) {
	var deleteDbRequest = indexedDB.deleteDatabase(dbName);
	deleteDbRequest.onsuccess = function(event) {
		console.log("delete Database success!");
		if (callback)
			callback(true);
	};
	deleteDbRequest.onerror = function(e) {
		console.log("Database error: " + e.target.errorCode);
		if (callback)
			callback(false)
	};
};

// 根据http地址获取一条对应的记录

function fetchListByHttp(http, callback) {
	try {
		if (db != null) {
			var store = getTransaction("list").objectStore("list");
			store.get(http).onsuccess = function(event) {
				var item = event.target.result;
				if (item == null) {
					if (callback)
						callback(null);
				} else {
					if (callback)
						callback(item);
				}
			};
		}
	} catch (e) {
		console.log(e);
		if (callback)
			callback(null);
	}
};

// 根据索引获取数据记录

function fetchListByHttpIndex(http, callback) {
	try {
		if (db != null) {
			var range = IDBKeyRange.only(http);
			var store = getTransaction("list")
				.objectStore("list");
			var index = store.index("httpIndex");
			index.get(range).onsuccess = function(evt) {
				var item = evt.target.result;
				if (item == null) {
					if (callback)
						callback(null);
				} else {
					if (callback)
						callback(item);
				}
			};
		}
	} catch (e) {
		console.log(e);
		if (callback)
			callback(null);
	}
};

// 添加一条记录

function addListItem(item, callback) {
	try {
		var store = getTransaction("list").objectStore("list");
		if (db != null) {
			var request = store.add(item);
			request.onsuccess = function(e) {
				if (callback)
					callback(true);
			};
			request.onerror = function(e) {
				console.log(e.value);
				if (callback)
					callback(false);
			};
		}
	} catch (e) {
		console.log(e);
		if (callback)
			callback(false);
	}
};

// 更新记录信息

function updateListItemByHttp(item, callback) {
	try {
		var store = getTransaction("list").objectStore("list");
		if (db != null) {
			var keyRange = IDBKeyRange.only(item.http);
			var objCursor = store.openCursor(keyRange);
			objCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					var request = cursor.update(item);
					request.onsuccess = function() {
						callback(true);
					}
					request.onerror = function(e) {
						conosole.log("DBM.activitati.edit -> error " + e);
						callback(false);
					}
				} else
					callback(false);
			}
			objCursor.onerror = function(e) {
				conosole.log("DBM.activitati.edit -> error " + e);
				callback(false);
			}
		}
	} catch (e) {
		console.log(e);
		if (callback)
			callback(false);
	}
};


// 删除所有记录

function clearAllListItems(callback) {
	try {
		if (db != null) {
			var store = getTransaction("list").objectStore("list");
			store.clear().onsuccess = function(event) {
				if (callback)
					callback(true);
			};
		}
	} catch (e) {
		console.log(e);
		if (callback)
			callback(false);
	}
};

// 根据ss删除一个条目

function deleteListItem(ssn, callback) {
	var request = getTransaction("list").objectStore("list")
		.delete(ssn);
	request.onsuccess = function(event) {
		if (callback)
			callback(true);
	};
	request.onerror = function(event) {
		if (callback)
			callback(false);
	};
};

// 遍历所有数据,不使用索引

function fetchList(callback) {
	var store = getTransaction("list").objectStore("list");
	store.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			if (callback)
				callback(cursor.value);
			cursor.
			continue ();
		} else {
			console.log("No more entries!");
			if (callback)
				callback(null);
		}
	};
};