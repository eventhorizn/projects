using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazorMovies.Shared.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Summary { get; set; }
        public bool InTheaters { get; set; }
        public string Trailer { get; set; }
        [Required]
        public DateTime? ReleaseDate { get; set; }
        public string Poster { get; set; }
        public string TitleBrief
        {
            get
            {
                if (string.IsNullOrEmpty(Title))
                    return null;

                if (Title.Length > 60)
                    return Title.Substring(0, 60) + "...";

                return Title;
            }
        }
        public List<MoviesGenres> MoviesGenres { get; set; } = new List<MoviesGenres>();
        public List<MovieActors> MovieActors { get; set; } = new List<MovieActors>();
        [NotMapped]
        public string MovieURL => $"movie/{Id}/{Title.Replace(" ", "-")}";
    }
}
