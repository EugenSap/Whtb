using System;
using System.Security.Cryptography;

namespace Whtb.Extensions
{
    public static class StringExtensions
    {
        public static string GetHash(this string input) 
        {
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hashBytes;
            using (var MD5 = new MD5CryptoServiceProvider())
            {
                hashBytes = MD5.ComputeHash(inputBytes);
            }
            

            return Convert.ToHexString(hashBytes); 
        }
    }
}
