<%@ Page Language="C#" CodeFile="list.aspx.cs" Inherits="Page1" EnableViewState="false" %>
<html>
<head>
<title>Uploader</title>
</head>
<body>
<form runat="server">
<ul>
<asp:Repeater id="repeater1" runat="server">
<ItemTemplate>
<li><a href="files/<%# HttpUtility.HtmlEncode(Eval("Path")) %>"><%# HttpUtility.HtmlEncode(Eval("FileName")) %></a></li>
</ItemTemplate>
</asp:Repeater>
</ul>
<p>
<asp:Button runat="server" id="button1" Text="Remove all files" OnClick="button1_OnClick"/>
<br>
<asp:Label runat="server" id="label1" BackColor="#aaaaaa" /><br>
</p>
</form>
<a href="index.htm">Back To Top</a>
</body>
</html>
