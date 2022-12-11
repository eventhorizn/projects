using Microsoft.EntityFrameworkCore.Migrations;

namespace BlazorMovies.Server.Migrations
{
    public partial class renamecolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_Movie_MovieId",
                table: "MovieActors");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors");

            migrationBuilder.DropForeignKey(
                name: "FK_MoviesGenres_Movie_MovieId",
                table: "MoviesGenres");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Person",
                table: "Person");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Movie",
                table: "Movie");

            migrationBuilder.RenameTable(
                name: "Person",
                newName: "People");

            migrationBuilder.RenameTable(
                name: "Movie",
                newName: "Movies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_People",
                table: "People",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Movies",
                table: "Movies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_Movies_MovieId",
                table: "MovieActors",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_People_PersonId",
                table: "MovieActors",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MoviesGenres_Movies_MovieId",
                table: "MoviesGenres",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_Movies_MovieId",
                table: "MovieActors");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_People_PersonId",
                table: "MovieActors");

            migrationBuilder.DropForeignKey(
                name: "FK_MoviesGenres_Movies_MovieId",
                table: "MoviesGenres");

            migrationBuilder.DropPrimaryKey(
                name: "PK_People",
                table: "People");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Movies",
                table: "Movies");

            migrationBuilder.RenameTable(
                name: "People",
                newName: "Person");

            migrationBuilder.RenameTable(
                name: "Movies",
                newName: "Movie");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Person",
                table: "Person",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Movie",
                table: "Movie",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_Movie_MovieId",
                table: "MovieActors",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MoviesGenres_Movie_MovieId",
                table: "MoviesGenres",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
