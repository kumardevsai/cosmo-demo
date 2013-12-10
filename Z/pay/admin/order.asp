<%
 if session("pass")="" then
response.redirect "login.asp"
end if
%>
<!--#include file="conn.asp"-->
<style type="text/css">
<!--
.STYLE1 {color: #FF0000}
-->
</style>

<a href="logout.asp">退出</a>
<TABLE width="900" border=0 align="center" cellPadding=3 cellSpacing=1  bgcolor="#CCCCCC">
  <TR bgcolor="EEF9FF">
    <TD height="32" align=right bgcolor="#F1F1F1"><div align="center">ID号</div></TD>
 
    <TD width="10%"  bgcolor="#F1F1F1"><div align="center">用户名</div></TD>
    <TD width="14%"  bgcolor="#F1F1F1"><div align="center">密码</div></TD>
 
  </TR>
    <% set rs=server.createobject("adodb.recordset")
	rs.Open "select * from [order] order by date desc",conn,1,3
	if rs.eof then 
	  response.write "没有数据！"
	 end if 
 rs.pagesize = 20
if request("page")=""  or isempty(request("page")) then
page = 1
else
page=int(request("page"))
end if
if page>rs.pagecount then
page=rs.pagecount
end if
if not rs.BOF then
Rs.Move Rs.PageSize*(page-1)
end if
i=1
do while not rs.eof and i<=rs.pagesize
%>
  <TR bgcolor="EEF9FF">
    <TD width="9%" height="36" align=right bordercolor="#0066FF"> <div align="center"><%=rs("id")%>&nbsp;&nbsp;  <a href="del.asp?id=<%=rs("id")%>">删除</a></div></TD>
  
    <TD  align=right bordercolor="#0066FF"><div align="center"><%=rs("name")%></div></TD>
    <TD align=right bordercolor="#0066FF"><div align="center"><%=rs("tel")%></div></TD> 
  </TR>
    
    <%
i=i+1
 rs.MoveNext                                              
 loop 
%>
  <TR bgcolor="EEF9FF">
    <TD height="26" colspan="8" align=right><div align="center">
      <%
if rs.recordcount<>0 then
if page-1 mod 10=0 then
		p=(page-1) \ 10
	else
		p=(page-1) \ 10
	end if

	response.write "页次："& page &"/"& rs.pagecount &"页 每页"& rs.pagesize &" 共"& rs.recordcount &"条记录"&_
					" 分页："

	if p*10>0 then response.write "<a href='?keywords="&keywords&"&keywords2="&keywords2&"&xs="&xs&"&page="&p*10&"' title=上十页>[&lt;&lt;]</a>   "
    uming_i=1
	for ii=p*10+1 to P*10+10
		   if ii=page then
	          response.write "<font color=#ff0000>["+Cstr(ii)+"]</font> "
		   else
		      response.write "<a href='?keywords="&keywords&"&keywords2="&keywords2&"&xs="&xs&"&page="&ii&"'>["+Cstr(ii)+"]</a>   "
		   end if
		if ii=rs.pagecount then exit for
		 uming_i=uming_i+1
	next
	if ii<=rs.pagecount and uming_i=11 then response.write "<a href='?keywords="&keywords&"&keywords2="&keywords2&"&xs="&xs&"&page="&ii&"' title=下十页>[&gt;&gt;]</a>   "
response.write(" 　跳页：<input type=text name=page size=2 maxlength=3 class=wenbenkuang> <input type=submit name=Submit value=Go class=go-wenbenkuang>")
end if%>
    </div></TD>
  </TR>
</TABLE>
 
