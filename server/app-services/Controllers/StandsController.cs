using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using app_services.Context;
using System.Linq;

namespace app_services.Controllers
{
    public class StandsController : ODataController
    {
        
        protected DBContext _context;

        public StandsController(DBContext context)
        {
            _context = context;
        }

        // GET all stands
        [HttpGet]
        [EnableQuery()]
        public IActionResult Get()
        {
            return Ok(_context.Stands);
        }

        // GET one stand
        [EnableQuery]
        public IActionResult Get(int key)
        {
            return Ok(_context.Stands.First(x => x.Id == key));
        }

        // POST a new stand
        [HttpPost]
        public IActionResult Post([FromBody] Stand model)
        {
            _context.Stands.Add(model);
            _context.SaveChanges();
            return Created(model);
        }

        // PUT an updated stand
        [HttpPut]
        public IActionResult Put([FromODataUri] int key, [FromBody] Stand model)
        {
            var entity = _context.Stands.First(x => x.Id == key);
            _context.Entry(entity).CurrentValues.SetValues(model);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE a stand
        [HttpDelete]
        public IActionResult Delete(int key)
        {
            var entity = _context.Stands.First(x => x.Id == key);
            _context.Stands.Remove(entity);
            _context.SaveChanges();
            return Ok();
        }
    }
}
