const { pool } = require('../server');

const getDashboardStats = async (req, res) => {
  try {
    // 1. Client Metrics
    const clientStats = await pool.query(`
      SELECT 
        COUNT(*) as total_clients,
        SUM(retainer_value) as total_revenue,
        SUM(videos_required) as total_videos_goal,
        SUM(posters_required) as total_posters_goal
      FROM clients
      WHERE status = 'Active'
    `);

    // 2. Production Progress (Production Gap)
    const completedStats = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE item_type = 'Video') as videos_completed,
        COUNT(*) FILTER (WHERE item_type = 'Poster') as posters_completed
      FROM production_logs
      WHERE completed_at >= date_trunc('month', CURRENT_DATE)
    `);

    // 3. Team Status
    const teamStats = await pool.query(`
      SELECT 
        COUNT(*) as total_employees,
        COUNT(*) FILTER (WHERE is_clocked_in = true) as active_now
      FROM users
    `);

    res.json({
      metrics: clientStats.rows[0],
      production: completedStats.rows[0],
      team: teamStats.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to aggregate dashboard data' });
  }
};

module.exports = { getDashboardStats };
