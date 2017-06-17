using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.IO;
using System.Web.UI.WebControls;

namespace fileUpload
{
    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler
    {
        private static string UploadDirectory = System.Configuration.ConfigurationSettings.AppSettings["UploadDirectory"];//文件存放根目录
       
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile postFile = context.Request.Files["img_content"];

            string fileName = context.Request["file_name"];
            if (postFile == null)
            {
                context.Response.Write("{\"msg\": \"文件为空！\"}");
            }
            else
            {
                Stream stream = postFile.InputStream;
                byte[] bytes = new byte[stream.Length];
                stream.Read(bytes, 0, bytes.Length);
                //// 设置当前流的位置为流的开始 
                //stream.Seek(0, SeekOrigin.Begin);
                stream.Close();
                stream.Dispose();

                string errMsg;

                if (bytes == null || string.IsNullOrEmpty(fileName))
                {
                    errMsg = "上传文件为空";
                }
                //if (bytes.Length > AudioMaxSize)
                //{
                //    errMsg = "文件大小超过限制";
                //    return false;
                //}
                string extName = Path.GetExtension(fileName);
                //if (string.IsNullOrEmpty(extName) || !AudioAllowExts.Contains(extName))
                //{
                //    errMsg = "文件类型不正确";
                //}
                fileName = GetFileName(extName);
                string fileDir = string.Format("{0}\\{1}", UploadDirectory, DateTime.Now.ToString("yyyy-MM-dd"));
                if (!Directory.Exists(fileDir))
                {
                    Directory.CreateDirectory(fileDir);
                }

                FileStream fs = new FileStream(fileDir + "\\" + fileName, FileMode.Create);
                try
                {
                    fs.Write(bytes, 0, bytes.Length);//开始写字节流
                }
                catch (Exception ex)
                {
                    errMsg = ex.ToString();
                }
                finally
                {
                    fs.Close();
                    fs.Dispose();
                }
                context.Response.Write("{\"url\": \"http://img10.360buyimg.com/n7/jfs/t2980/224/1098086213/458686/99785fc3/5774efa2N720255ad.jpg!q70.jpg\"}");
                context.Response.End();
            }
        }

        /// <summary>
        /// 取得文件名
        /// </summary>
        /// <param name="extName">后缀名</param>
        /// <returns></returns>
        public string GetFileName(string extName)
        {
            Random rd = new Random();
            int randomNum = 1000 + rd.Next(8999);
            string _fileExtension = extName;
            string newFileName = string.Format("{0}{1}{2}", DateTime.Now.ToString("yyyyMMddhhmmss"), randomNum, _fileExtension);
            return newFileName;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}