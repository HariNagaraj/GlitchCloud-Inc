const { pool } = require('../server');
const { z } = require('zod');

// Validation Schemas
const clientSchema = z.object({
  name: z.string().min(1),
  videosRequired: z.number().int().nonnegative(),
  postersRequired: z.number().int().nonnegative(),
  retainerValue: z.number().nonnegative(),
  status: z.string().optional()
});

const getClients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

const createClient = async (req, res) => {
  try {
    const data = clientSchema.parse(req.body);
    const result = await pool.query(
      'INSERT INTO clients (name, videos_required, posters_required, retainer_value, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.name, data.videosRequired, data.postersRequired, data.retainerValue, data.status || 'Active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.errors || 'Validation failed' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, u.role_tier, u.status, u.is_clocked_in, d.name as department
      FROM users u
      LEFT JOIN departments d ON u.dept_id = d.id
      ORDER BY u.name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

module.exports = { getClients, createClient, getEmployees };
