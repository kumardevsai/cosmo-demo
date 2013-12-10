<%
 if session("pass")="" then
response.redirect "login.asp"
end if
%>
<!--#include file="conn.asp"-->

<%
 conn.execute("Delete from [order] where id="&Request("id")&" ")
 Response.redirect "order.asp"
%>