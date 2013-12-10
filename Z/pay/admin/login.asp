<% if session("pass")<>"" then 
response.redirect "order.asp"
end if 
%>
<html><head>
<title>管理员登陆</title></head>
<body>
管理员登陆<font color=blue size=3></font>
<form method="post" action="chkadmin.asp">
user:
  <input type="text" name="username" size=20><br>
pass: 
<input type="password" name="password" size=20><br>
<input type="submit" value="登陆">
<input type="reset" value="取消">
</form>
</body>
</html>

