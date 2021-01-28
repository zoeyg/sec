using System;
using System.Data;
using System.IO;

public partial class Page1 : BasePage
{
    private void ReloadFiles()
    {
        DataTable dt = new DataTable("Files");
        dt.Columns.Add("FileName", typeof(System.String));
        dt.Columns.Add("Path", typeof(System.String));
        var userDir = GetUserDir();
        var userSpace = GetUserSpace();
        if (Directory.Exists(userDir)) {
            foreach (var filepath in Directory.EnumerateFiles(userDir)) {
                var filename = Path.GetFileName(filepath);
                var path = Path.Combine(userSpace, filename);
                dt.Rows.Add(new object[] { filename, path });
            }
        }
        repeater1.DataSource = dt;
        repeater1.DataBind();
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        ReloadFiles();
    }

    protected void button1_OnClick(object sender, EventArgs e)
    {
        var userDir = GetUserDir();
        if (Directory.Exists(userDir)) {
            Directory.Delete(userDir, true);
            ReloadFiles();
        }
    }
}
