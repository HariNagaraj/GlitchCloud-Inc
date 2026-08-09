const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const migrate = async () => {
  console.log('\x1b[35m[MIGRATION]\x1b[0m Starting Data Migration...');

  try {
    // 1. Roles
    console.log('Inserting Roles...');
    await pool.query(`
      INSERT INTO roles (tier_name, permissions, color_gradient) VALUES
      ('Executive', 'Full Access', 'from-blue-500 to-indigo-600'),
      ('Director', 'Management', 'from-purple-500 to-pink-600'),
      ('Associate', 'Standard', 'from-cyan-500 to-blue-600'),
      ('Contributor', 'Limited', 'from-orange-500 to-amber-600')
      ON CONFLICT (tier_name) DO NOTHING;
    `);

    // 2. Departments
    console.log('Inserting Departments...');
    const depts = await pool.query(`
      INSERT INTO departments (name) VALUES
      ('Leadership'), ('Operations'), ('Engineering'), ('Video Production'), ('Marketing')
      RETURNING id, name;
    `);
    const deptMap = {};
    depts.rows.forEach(d => deptMap[d.name] = d.id);

    // 3. Users (Employees)
    console.log('Inserting Users...');
    const pass = await bcrypt.hash('glitch2024', 10);
    const users = [
      { name: 'Alice CEO', email: 'alice@glitchcloud.com', role: 'Executive', dept: 'Leadership' },
      { name: 'Bob Director', email: 'bob@glitchcloud.com', role: 'Director', dept: 'Operations' },
      { name: 'Charlie Dev', email: 'charlie@glitchcloud.com', role: 'Associate', dept: 'Engineering' },
      { name: 'David Editor', email: 'david@glitchcloud.com', role: 'Associate', dept: 'Video Production' },
      { name: 'Eve Designer', email: 'eve@glitchcloud.com', role: 'Associate', dept: 'Marketing' }
    ];

    for (const u of users) {
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role_tier, dept_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING',
        [u.name, u.email, pass, u.role, deptMap[u.dept]]
      );
    }

    // 4. Clients
    console.log('Inserting Clients...');
    const clients = [
      { name: 'Alpha Brand', v: 6, p: 12, val: 5000, status: 'Active' },
      { name: 'Beta Tech', v: 4, p: 8, val: 3500, status: 'Active' },
      { name: 'Gamma Corp', v: 10, p: 20, val: 8000, status: 'Inactive' },
      { name: 'Zeta Fashion', v: 8, p: 15, val: 6500, status: 'Active' }
    ];

    for (const c of clients) {
      await pool.query(
        'INSERT INTO clients (name, videos_required, posters_required, retainer_value, status) VALUES ($1, $2, $3, $4, $5)',
        [c.name, c.v, c.p, c.val, c.status]
      );
    }

    console.log('\x1b[32m[SUCCESS]\x1b[0m Migration Complete. GlitchCloud OS is now fully populated.');
    process.exit(0);
  } catch (err) {
    console.error('\x1b[31m[ERROR]\x1b[0m Migration failed:', err);
    process.exit(1);
  }
};

migrate();
