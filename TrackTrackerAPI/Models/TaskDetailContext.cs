using Microsoft.EntityFrameworkCore;

namespace TrackTrackerAPI.Models
{
    public class TaskDetailContext : DbContext
    {
        public TaskDetailContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<TaskDetail> TaskDetails { get; set; }
        protected TaskDetailContext()
        {
        }
    }
}
