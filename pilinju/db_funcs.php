<?php
	require_once("config.php");

	$odb_conn=mssql_connect(constant("DB_HOST"),constant("DB_USER"),constant("DB_PASSWORD"));
    mssql_select_db(constant("DB_NAME"),$odb_conn);
	

	function fetchUsers(){
		$query="select * from test1";
		$odb_comm=mssql_query($query);
		$odb_row_num=mssql_num_rows($odb_comm);
		for($i=0;$i<$odb_row_num;$i++)
		{
			 $row=mssql_fetch_array($odb_comm);
		}
	}

	function insertUser(){
		$query = "insert into users";
	}

?>