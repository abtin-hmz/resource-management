// Updated dummyData.js
export const resources = {
  classes: [
    { id: 1, name: "Classroom A", status: "Available", type: "classroom" },
    { id: 2, name: "Classroom B", status: "Reserved", type: "classroom" },
    { id: 3, name: "Classroom C", status: "Unavailable", type: "classroom" },
  ],
  laptops: [
    { id: 4, name: "Laptop 1", status: "Available", type: "laptop" },
    { id: 5, name: "Laptop 2", status: "Reserved", type: "laptop" },
    { id: 6, name: "Laptop 3", status: "Unavailable", type: "laptop" },
  ],
};


export const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    requests: [], // New: Requests for this user
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    role: "user",
    requests: [], // New: Requests for this user
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "jane123",
    role: "user",
    requests: [], // New: Requests for this user
  },
  {
    id: 4,
    name: "Hesam",
    email: "hesam",
    password: "123",
    role: "user",
    requests: [], // New: Requests for this user
  },
  {
    id: 5,
    name: "Reza",
    email: "reza",
    password: "123",
    role: "admin",
    requests: [], // New: Requests for this user
  },
];
