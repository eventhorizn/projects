using Microsoft.EntityFrameworkCore.Migrations;

namespace BlazorMovies.Server.Migrations
{
    public partial class RemoveExtraColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieActors",
                table: "MovieActors");

            migrationBuilder.DropColumn(
                name: "PersionId",
                table: "MovieActors");

            migrationBuilder.AlterColumn<int>(
                name: "PersonId",
                table: "MovieActors",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieActors",
                table: "MovieActors",
                columns: new[] { "MovieId", "PersonId" });

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieActors",
                table: "MovieActors");

            migrationBuilder.AlterColumn<int>(
                name: "PersonId",
                table: "MovieActors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "PersionId",
                table: "MovieActors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieActors",
                table: "MovieActors",
                columns: new[] { "MovieId", "PersionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_MovieActors_Person_PersonId",
                table: "MovieActors",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
