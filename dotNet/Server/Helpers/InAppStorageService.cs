using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BlazorMovies.Server.Helpers
{
    public class InAppStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccesor;

        public InAppStorageService(IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccesor)
        {
            this.env = env;
            this.httpContextAccesor = httpContextAccesor;
        }

        public Task DeleteFile(string fileRoute, string containerName)
        {
            var fileName = Path.GetFileName(fileRoute);
            string fileDirectory = Path.Combine(env.WebRootPath, containerName, fileName);

            if (File.Exists(fileDirectory))
                File.Delete(fileDirectory);

            return Task.FromResult(0);
        }

        public async Task<string> EditFile(byte[] content, string extension, string containerName, string fileRoute)
        {
            if (!string.IsNullOrEmpty(fileRoute))
            {
                await DeleteFile(fileRoute, containerName);
            }

            return await SaveFile(content, extension, containerName);
        }

        public async Task<string> SaveFile(byte[] content, string extension, string containerName)
        {
            var fileName = $"{Guid.NewGuid()}.{extension}";
            string folder = Path.Combine(env.WebRootPath, containerName);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string savingPath = Path.Combine(folder, fileName);
            await File.WriteAllBytesAsync(savingPath, content);

            var currentUrl = $"{httpContextAccesor.HttpContext.Request.Scheme}://{httpContextAccesor.HttpContext.Request.Host}";
            var pathForDb = Path.Combine(currentUrl, containerName, fileName);

            return pathForDb;
        }
    }
}
