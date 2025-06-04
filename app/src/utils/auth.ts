export function getRolesFromToken(): string[] {
  const token = localStorage.getItem('jwt');
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  } catch (e) {
    console.error('Failed to decode token', e);
    return [];
  }
}

export function isAdmin(): boolean {
  const roles = getRolesFromToken();
  return roles.includes('admin');
}
