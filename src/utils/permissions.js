import { ROLES, ROLE_NAV_PERMISSIONS, ROLE_FOLDER_PERMISSIONS } from '../context/roleConstants';

/**
 * Check if a role can access a specific sidebar navigation tab
 */
export function canAccessNav(role, navId) {
  if (!role) return false;
  const userRole = role.toLowerCase();
  if (userRole === ROLES.ADMIN) return true;
  const allowed = ROLE_NAV_PERMISSIONS[userRole];
  return allowed ? allowed.includes(navId) : false;
}

/**
 * Get folder access level for a given role and department tag
 * Returns: 'full' | 'assigned_only' | 'read_only' | 'partial' | 'none'
 */
export function getFolderAccessLevel(role, departmentTag) {
  if (!role) return 'none';
  const userRole = role.toLowerCase();
  if (userRole === ROLES.ADMIN) return 'full';
  const rolePermissions = ROLE_FOLDER_PERMISSIONS[userRole];
  if (!rolePermissions) return 'none';
  return rolePermissions[departmentTag] || 'none';
}

/**
 * Check if user has at least read visibility for a department tag
 */
export function canViewDepartment(role, departmentTag) {
  const level = getFolderAccessLevel(role, departmentTag);
  return level !== 'none';
}

/**
 * Check if user has full write/edit access for a department tag
 */
export function canEditDepartment(role, departmentTag) {
  const level = getFolderAccessLevel(role, departmentTag);
  return level === 'full' || level === 'assigned_only';
}

/**
 * Filter menu items for current role
 */
export function getMenuItemsForRole(menuItems, role) {
  return menuItems.filter(item => canAccessNav(role, item.id));
}
