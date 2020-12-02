using BlazorMovies.Shared.Entities;
using BlazorMovies.Shared.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlazorMovies.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreRepository genreRepository;

        public GenresController(IGenreRepository genreRepository)
        {
            this.genreRepository = genreRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return await genreRepository.GetGenres();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> Get(int id)
        {
            var genre = await genreRepository.GetGenre(id);
            if (genre == null) { return NotFound(); }
            return genre;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Genre genre)
        {
            await genreRepository.CreateGenre(genre);
            return genre.Id;
        }

        [HttpPut]
        public async Task<ActionResult> Put(Genre genre)
        {
            await genreRepository.UpdateGenre(genre);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var genre = await genreRepository.GetGenre(id);
            if (genre == null)
            {
                return NotFound();
            }

            await genreRepository.DeleteGenre(id);
            return NoContent();
        }
    }
}
