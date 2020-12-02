using BlazorMovies.Shared.DTO;
using BlazorMovies.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorMovies.Client.Repository
{
    public interface IMoviesRepository
    {
        Task<int> CreateMovie(Movie movie);
        Task DeleteMovie(int id);
        Task<DetailsMovieDTO> GetDetatilsMovieDTO(int id);
        Task<IndexPageDTO> GetIndexPageDTO();
        Task<MovieUpdateDTO> GetMovieForUpdate(int id);
        Task<PaginatedResponse<List<Movie>>> GetMoviesFiltered(FilterMoviesDTO filterMoviesDTO);
        Task UpdateMovie(Movie movie);
    }
}
