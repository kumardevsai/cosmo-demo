<% if session("pass")<>"" then 
response.redirect "order.asp"
end if 
%>
<html><head>
<title>����Ա��½</title></head>
<body>
����Ա��½<font color=blue size=3></font>
<form method="post" action="chkadmin.asp">
user:
  <input type="text" name="username" size=20><br>
pass: 
<input type="password" name="password" size=20><br>
<input type="submit" value="��½">
<input type="reset" value="ȡ��">
</form>
</body>
</html>

