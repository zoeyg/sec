using System;
using System.IO;

// flag1 part2: ***CENSORED*********

public partial class Page1 : BasePage
{
    protected string Sanitize(string filename)
    {
        string badchars = "!\"#$%&'()~=^\\|@`[]{};:+*,<>/?";
        var chars = filename.ToCharArray();
        for (int i = 0; i < chars.Length; i++) {
            if (chars[i] <= 0x20 || badchars.Contains(chars[i]))
                chars[i] = '_';
        }
        return new String(chars);
    }

    protected bool SecurityCheck(string filename)
    {
        string lower = filename.ToLower();
        if (lower.Contains(".aspx")) return false;
        if (lower.Contains(".asmx")) return false;
        if (lower.Contains(".ashx")) return false;
        if (lower.Contains(".asax")) return false;
        if (lower.Contains(".ascx")) return false;
        if (lower.Contains(".soap")) return false;
        if (lower.Contains(".rem")) return false;
        if (lower.Contains(".axd")) return false;
        if (lower.Contains(".cs")) return false;
        if (lower.Contains(".config")) return false;
        if (lower.Contains(".dll")) return false;

        if (lower.Contains(".php")) return false;
        if (lower.Contains(".phtml")) return false;
        if (lower.Contains(".shtml")) return false;
        if (lower.Contains(".cgi")) return false;
        return true;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        button2.Enabled = false;
    }

    protected void button1_OnClick(object sender, EventArgs e)
    {
        var userDir = GetUserDir();
        if (!Directory.Exists(userDir)) {
            Directory.CreateDirectory(userDir);
        }
        if (!file1.HasFile) {
            label1.Text = "No file";
            return;
        }
        var filename = Sanitize(Path.GetFileName(filename1.Text));
        if (!SecurityCheck(filename)) {
            label1.Text = "Security Error";
            return;
        }
        file1.SaveAs(Path.Combine(userDir, filename));
        label1.Text = "Uploaded: " + filename;
        uploadedFilename.Value = filename;
        uploadedFilenameTag.Value = GenerateHmac(filename);
        button2.Enabled = true;
    }

    protected void button2_OnClick(object sender, EventArgs e)
    {
        var filename = uploadedFilename.Value;
        if (!VerifyHmac(filename, uploadedFilenameTag.Value)) {
            label1.Text = "Security Error";
            return;
        }
        if (filename.Contains("/")) {
            label1.Text = "Security Error";
            return;
        }
        var userDir = GetUserDir();
        var filepath = Path.Combine(userDir, filename);
        if (!File.Exists(filepath)) {
            label1.Text = "Security Error: not exists";
            return;
        }

        var zipFilename = CompressFile(userDir, filename);
        label1.Text = "Compressed: " + zipFilename;

        File.Delete(filepath);
    }
}
