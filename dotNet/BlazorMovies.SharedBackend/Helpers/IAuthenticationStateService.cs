using System.Threading.Tasks;

namespace BlazorMovies.SharedBackend.Helpers
{
    public interface IAuthenticationStateService
    {
        Task<string> GetCurrentUserId();
    }
}
