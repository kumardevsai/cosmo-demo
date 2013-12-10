<!--#include file="conn.asp"-->
<%
   dim user,pass
 user=request.form("username")
 pass=request.form("password")
set rs=server.createobject("adodb.recordset")
rs.open "select * from admin where username='"&user&"' and password='"&pass&"'" ,conn,1,1
if rs.eof or rs.bof then
response.write "<script>alert('´í!');location.href='index.asp'</script>"
else
if not (rs.bof and rs.eof) then
if pass=rs("password") then
session("pass")=trim(rs("password"))
rs.close
set rs=nothing
response.redirect "order.asp"
 else
  response.write "´í"
end if 
end if
end if 
%>
