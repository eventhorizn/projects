using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazorMovies.Shared.Entities
{
    public class Person
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Biography { get; set; }
        public string Picture { get; set; }
        [Required]
        public DateTime? DateOfBirth { get; set; }
        [NotMapped]
        public string Character { get; set; }
        public List<MovieActors> MovieActors { get; set; } = new List<MovieActors>();

        public override bool Equals(object obj)
        {
            if (obj is Person p2)
            {
                return Id == p2.Id;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
