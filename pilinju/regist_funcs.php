<?php
	header('Content-Type:text/html; charset=utf-8');
	require_once("db_funcs.php");

	function doRegist(){
		$email = $_POST["email"];
		$username = $_POST["username"];
		$password = $_POST["password"];
	}

	$action = $_GET["action"];
	if($action == "regist")
		doRegist();
?>