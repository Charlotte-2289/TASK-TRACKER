using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackTrackerAPI.Models
{
    public class TaskDetail
    {
        [Key]
        public int TaskID { get; set; }
        [Column(TypeName ="nvarchar(700)")]
        public string Title { get; set; } = "";
        [Column(TypeName ="nvarchar(12)")]
        public string CreatedAt { get; set; } = "";

        public bool IsCompleted { get; set; } =false;
    }
}
