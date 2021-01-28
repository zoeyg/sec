<html>
<head>
<title>docx 2 pdf</title>
</head>
<body>
<!-- remember to import settings from config.php -->
<!-- The data encoding type, enctype, MUST be specified as below -->
<form enctype="multipart/form-data" action="convert.php" method="POST">
    <!-- MAX_FILE_SIZE must precede the file input field -->
    <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
    <!-- Name of input element determines name in $_FILES array -->
    Docx to upload: <input name="userfile" type="file" />
    <br />
    <input type="submit" value="Generate pdf" name="submit" />
</form>
</body>
