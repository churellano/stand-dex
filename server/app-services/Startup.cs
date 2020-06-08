using System.Linq;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OData.Edm;

using app_services.Context;

namespace app_services
{
    public class Startup
    {

        readonly string FrontEndPolicy = "_frontEndPolicy";
        readonly string FrontEndOrigin = "http://localhost:4200";

        public IConfiguration configuration { get; }

        public Startup(IConfiguration Configuration) 
        {
            configuration = Configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services) 
        {
            // Add CORS policy to allow front-end to access back-end resources
            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: FrontEndPolicy,
                    builder =>
                    {
                        builder
                        .WithOrigins(FrontEndOrigin)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            });

            // This links your dbcontext to the database and sets the connection string.
            // This also allows the DBContext to be injected to classes using dependency injection
            services.AddDbContext<DBContext>(options => options.UseSqlServer(configuration.GetConnectionString("DBContextConnection")));

            // Setup REST Services and Setup OData Services
            services.AddControllers(mvcOptions => mvcOptions.EnableEndpointRouting = false);
            services.AddOData();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) 
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(FrontEndPolicy);

            app.UseMvc(routeBuilder =>
            {
                // This allows select and filter functionality for all OData queries
                routeBuilder.Select().Filter();

                // This sets the default route for the odata objects
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
            });

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapGet("/", async context =>
            //    {
            //        await context.Response.WriteAsync("Hello World!");
            //    });
            //});
        }

        private static IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();

            odataBuilder.EntitySet<Stand>("Stands");

            return odataBuilder.GetEdmModel();
        }
    }
}
