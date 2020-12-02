using BlazorMovies.Shared.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlazorMovies.Client.Repository
{
    public interface IGenreRepository
    {
        Task CreateGenre(Genre genre);
        Task<Genre> GetGenre(int id);
        Task<List<Genre>> GetGenres();
        Task UpdateGenre(Genre genre);
        Task DeleteGenre(int Id);
    }
}
