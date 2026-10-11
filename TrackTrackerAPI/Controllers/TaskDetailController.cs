using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackTrackerAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class TaskDetailController : ControllerBase
{
    private readonly TaskDetailContext _context;
    public TaskDetailController(TaskDetailContext context)
    {
        _context = context;
    }

    // GET: api/TaskDetail
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDetail>>> GetTaskDetail()
    {
        return await _context.TaskDetails.ToListAsync();
    }

    // GET: api/TaskDetail/5
    [HttpGet("{taskid}")]
    public async Task<ActionResult<TaskDetail>> GetTaskDetail(int taskid)
    {
        var taskdetail = await _context.TaskDetails.FindAsync(taskid);

        if (taskdetail == null)
        {
            return NotFound();
        }

        return taskdetail;
    }

    // PUT: api/TaskDetail/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{taskid}")]
    public async Task<IActionResult> PutTaskDetail(int? taskid, TaskDetail taskdetail)
    {
        if (taskid != taskdetail.TaskID)
        {
            return BadRequest();
        }

        _context.Entry(taskdetail).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskDetailExists(taskid))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/TaskDetail
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<TaskDetail>> PostTaskDetail(TaskDetail taskdetail)
    {
        _context.TaskDetails.Add(taskdetail);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTaskDetail", new { taskid = taskdetail.TaskID }, taskdetail);
    }

    // DELETE: api/TaskDetail/5
    [HttpDelete("{taskid}")]
    public async Task<IActionResult> DeleteTaskDetail(int? taskid)
    {
        var taskdetail = await _context.TaskDetails.FindAsync(taskid);
        if (taskdetail == null)
        {
            return NotFound();
        }

        _context.TaskDetails.Remove(taskdetail);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TaskDetailExists(int? taskid)
    {
        return _context.TaskDetails.Any(e => e.TaskID == taskid);
    }
}
