using BlazorMovies.Shared.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlazorMovies.Server
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieActors>().HasKey(x => new { x.MovieId, x.PersonId });
            modelBuilder.Entity<MoviesGenres>().HasKey(x => new { x.MovieId, x.GenreId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<MovieActors> MovieActors { get; set; }
    }
}
