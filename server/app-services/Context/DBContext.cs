using Microsoft.EntityFrameworkCore;

namespace app_services.Context
{
    // Copy this to your DBContext File
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        // Update this to your object 
        public virtual DbSet<Stand> Stands { get; set; }
    }

}
