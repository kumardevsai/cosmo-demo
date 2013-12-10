<%
 if session("pass")="" then
response.redirect "login.asp"
else
response.redirect "order.asp"
end if
%>