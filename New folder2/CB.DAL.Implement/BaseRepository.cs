using System.Data;
using System.Data.SqlClient;

namespace CB.DAL.Implement
{
    public class BaseRepository
    {
        protected IDbConnection connection;
        public BaseRepository()
        {
            connection = new SqlConnection(@"Data Source=AITD201412002;Initial Catalog=Demo;Integrated Security=True");
        }
    }
}
