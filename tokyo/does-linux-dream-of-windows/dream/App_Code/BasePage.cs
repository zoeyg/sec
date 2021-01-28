using System;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class BasePage : System.Web.UI.Page
{
    private static string keyEncryptionKeyHex =
        "***CENSORED*********************";

    private static int HexdigitToInteger(char c)
    {
        if ('0' <= c && c <= '9')
            return c - '0';
        else if ('a' <= c && c <= 'f')
            return c - 'a' + 10;
        else if ('A' <= c && c <= 'F')
            return c - 'A' + 10;
        else
            throw new ArgumentException("Invalid hex");
    }

    private static char IntegerToHexdigit(int x)
    {
        if (x < 0 || x >= 16)
            throw new ArgumentException("Out of range");
        else
            return "0123456789abcdef"[x];
    }

    private static byte[] HexToBytes(string hex)
    {
        if (hex.Length % 2 != 0) {
            throw new ArgumentException("Invalid hex");
        }
        byte[] result = new byte[hex.Length / 2];
        for (int i = 0; i < result.Length; i++) {
            result[i] = (byte)((HexdigitToInteger(hex[i * 2]) << 4) |
                               HexdigitToInteger(hex[i * 2 + 1]));
        }
        return result;
    }

    private static string BytesToHex(byte[] data)
    {
        var result = new StringBuilder();
        foreach (var b in data) {
            result.Append(IntegerToHexdigit(b >> 4));
            result.Append(IntegerToHexdigit(b & 0xf));
        }
        return result.ToString();
    }

    protected static byte[] DecryptKey(byte[] encryptedKey)
    {
        var keyEncryptionKey = HexToBytes(keyEncryptionKeyHex);
        using (var aes = new AesManaged()) {
            aes.BlockSize = 128;
            aes.KeySize = 128;
            aes.Mode = CipherMode.ECB;
            aes.Padding = PaddingMode.None;
            aes.Key = keyEncryptionKey;
            using (var decryptor = aes.CreateDecryptor()) {
                return decryptor.TransformFinalBlock(encryptedKey, 0, 16);
            }
        }
    }

    protected static string GenerateHmac(string data)
    {
        var encryptedHmacKeyHex =
            ConfigurationManager.AppSettings["EncryptedHmacKey"];
        var encryptedHmacKey = HexToBytes(encryptedHmacKeyHex);
        var hmacKey = DecryptKey(encryptedHmacKey);

        var dataBytes = Encoding.UTF8.GetBytes(data);
        using (var hmac = new HMACSHA256(hmacKey))
        {
            var tagBytes = hmac.ComputeHash(dataBytes);
            var tagString = Convert.ToBase64String(tagBytes);
            return tagString;
        }
    }

    protected static bool VerifyHmac(string data, string tag)
    {
        var expectedTag = GenerateHmac(data);
        return SecureEquals(tag, expectedTag);
    }

    protected static bool SecureEquals(string x, string y)
    {
        if (x.Length != y.Length)
            return false;
        bool result = true;
        int length = x.Length < y.Length ? x.Length : y.Length;
        for (int i = 0; i < length; i++) {
            result &= x[i] == y[i];
        }
        return result;
    }

    protected string GetUserSpace()
    {
        if (Session["userspace"] == null) {
            using(var rng = new RNGCryptoServiceProvider())
            {
                var token = new byte[16];
                rng.GetBytes(token);
                Session["userspace"] = BytesToHex(token);
            }
        }
        return (string)Session["userspace"];
    }

    protected string GetStoragePath(string path)
    {
        var rootPath = Request.PhysicalApplicationPath;
        var storagePath = Path.Combine(rootPath, "files");
        return Path.Combine(storagePath, path);
    }

    protected string GetUserDir()
    {
        return GetStoragePath(GetUserSpace());
    }

    protected string CompressFile(string workdir, string filename)
    {
        string command = ConfigurationManager.AppSettings["CompressionCommand"];
        string args = "\"" + filename  + "\"";
        ProcessStartInfo psInfo = new ProcessStartInfo();
        psInfo.FileName = command;
        psInfo.Arguments = args;
        psInfo.WorkingDirectory = workdir;
        psInfo.CreateNoWindow = true;
        psInfo.UseShellExecute = false;
        psInfo.RedirectStandardOutput = true;
        psInfo.RedirectStandardError = true;
        Process p = Process.Start(psInfo);
        return p.StandardOutput.ReadToEnd();
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        Response.Charset = "utf-8";
        Response.Expires = -1;
        Response.CacheControl = "No-Cache";
    }
}
