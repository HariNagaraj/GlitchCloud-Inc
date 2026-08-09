const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../server');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, roleTier: user.role_tier, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, roleTier: user.role_tier, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

const register = async (req, res) => {
  const { name, email, password, roleTier } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role_tier) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role_tier',
      [name, email, hashedPassword, roleTier || 'Associate']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error creating account' });
  }
};

module.exports = { login, register };
