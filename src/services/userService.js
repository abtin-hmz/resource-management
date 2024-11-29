import { users } from './dummyData';

// Get user by ID
export function getUserById(id) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  return user;
}

// Authenticate user by email and password
export function authenticateUser(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
}

// Check user role
export function checkUserRole(id, role) {
  const user = getUserById(id);
  if (user.role !== role) {
    throw new Error(`Access denied. User does not have the ${role} role.`);
  }
  return true;
}

// Add a new user
export function addUser(newUser) {
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const newId = users.length ? Math.max(users.map((user) => user.id)) + 1 : 1;
  const userToAdd = { id: newId, ...newUser };
  users.push(userToAdd);
  return userToAdd;
}

// Update existing user
export function updateUser(id, updatedData) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    throw new Error(`User with ID ${id} not found`);
  }
  users[userIndex] = { ...users[userIndex], ...updatedData };
  return users[userIndex];
}
