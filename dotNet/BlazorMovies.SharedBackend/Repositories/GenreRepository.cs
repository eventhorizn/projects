using BlazorMovies.Shared.Entities;
using BlazorMovies.Shared.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlazorMovies.SharedBackend.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ApplicationDbContext context;

        public GenreRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Genre>> GetGenres()
        {
            return await context.Genres.ToListAsync();
        }

        public async Task<Genre> GetGenre(int Id)
        {
            return await context.Genres.FindAsync(Id);
        }

        public async Task CreateGenre(Genre genre)
        {
            context.Add(genre);
            await context.SaveChangesAsync();
        }

        public async Task UpdateGenre(Genre genre)
        {
            context.Attach(genre).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task DeleteGenre(int Id)
        {
            var genre = await GetGenre(Id);
            context.Remove(genre);
            await context.SaveChangesAsync();
        }
    }
}
