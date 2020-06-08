using Microsoft.OData.Edm;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app_services.Context
{
    [Table("Stand")]
    public class Stand
    {
        [Key] // This signifies the field as the primary key
        [Required] // This shows its required.
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Required]
        [Column("user")]
        public string User { get; set; }

        [Required]
        [Column("main_colour")]
        public string MainColour { get; set; }

        [Required]
        [Column("first_appearance")]
        public DateTime FirstAppearance { get; set; }

        [Required]
        [Column("long_range")]
        public Boolean LongRange { get; set; }

        [Column("image_url")]
        public string ImageUrl { get; set; }

        // For use with temporal tables
        [Column("SysStartTime")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime StartDate { get; set; }

        // For use with temporal tables
        [Column("SysEndTime")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime EndDate { get; set; }

        // Used for concurrency checks
        [Timestamp]
        [NotMapped]
        public byte[] RowVersion { get; set; }
    }
}
