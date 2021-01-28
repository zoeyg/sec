<%@ Page Language="C#" CodeFile="upload.aspx.cs" Inherits="Page1" EnableViewState="false" %>
<%-- flag1 part1: TWCTF{***CENSORED********* --%>
<html>
<head>
<title>Uploader</title>
</head>
<body>
<form runat="server">
<p>
<asp:FileUpload id="file1" runat="server" onchange="document.getElementById('filename1').value = this.value.split(/(\\|\/)/g).pop()" /><br>
filename: <asp:TextBox id="filename1" runat="server" /><br>
<asp:Button runat="server" id="button1" Text="Upload" OnClick="button1_OnClick"/>
<br>
<asp:Label runat="server" id="label1" BackColor="#aaaaaa" /><br>
<asp:HiddenField id="uploadedFilename" runat="server" />
<asp:HiddenField id="uploadedFilenameTag" runat="server" />
<asp:Button runat="server" id="button2" Text="Compress" OnClick="button2_OnClick"/><br>
</p>
</form>
<a href="INDEX.HTM">Back To Top</a>
</body>
</html>
