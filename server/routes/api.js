const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { getDashboardStats } = require('../controllers/dashboardController');
const { getClients, createClient, getEmployees } = require('../controllers/managementController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Auth
router.post('/auth/login', login);
router.post('/auth/register', register);

// Dashboard (Protected)
router.get('/dashboard', authenticateToken, getDashboardStats);

// Management (Protected + RBAC for editing)
router.get('/management/clients', authenticateToken, getClients);
router.post('/management/clients', authenticateToken, authorizeRoles('Executive', 'Director'), createClient);

router.get('/management/employees', authenticateToken, getEmployees);

module.exports = router;
