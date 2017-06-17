using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace fileUpload
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            long sss = DateTime.Now.ToBinary();
            string bbbb = Request.Url.ToString();
            string bb = sss.ToString();
        }
    }
}