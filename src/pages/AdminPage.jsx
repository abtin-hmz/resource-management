import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { resources, users } from '../services/dummyData';

function AdminPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [resourceData, setResourceData] = useState(resources.classes.concat(resources.laptops));
  const [userData, setUserData] = useState(users);
  const [requests, setRequests] = useState(
    users.flatMap((user) => user.requests || []) // Combine all user requests
  );
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(''); // 'resource' or 'user'
  const [currentItem, setCurrentItem] = useState(null); // Item being edited or added

  const resourceTypes = ['classes', 'laptops', 'other'];
  const resourceStatuses = ['Available', 'Reserved', 'Unavailable'];
  const userRoles = ['admin', 'user'];

  // Open Form Modal
  const handleOpen = (type, item = null) => {
    setFormType(type);
    setCurrentItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentItem(null);
  };

  // Handle Request Action
  const handleRequestAction = (requestId, action) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: action } : req
    );
    setRequests(updatedRequests);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    if (formType === 'resource') {
      if (currentItem?.id) {
        // Edit existing resource
        setResourceData(
          resourceData.map((resource) =>
            resource.id === currentItem.id ? currentItem : resource
          )
        );
      } else {
        // Add new resource
        setResourceData([
          ...resourceData,
          { ...currentItem, id: resourceData.length + 1 },
        ]);
      }
    } else if (formType === 'user') {
      if (currentItem?.id) {
        // Edit existing user
        setUserData(
          userData.map((user) =>
            user.id === currentItem.id ? currentItem : user
          )
        );
      } else {
        // Add new user
        setUserData([
          ...userData,
          { ...currentItem, id: userData.length + 1 },
        ]);
      }
    }
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
        <Tab label="Manage Resources" />
        <Tab label="Manage Users" />
        <Tab label="Manage Requests" />
      </Tabs>

      {/* Resources Tab */}
      <Box hidden={currentTab !== 0}>
        <Typography variant="h6">Resources</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceData.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.status}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen('resource', resource)}>Edit</Button>
                  <Button onClick={() => setResourceData(resourceData.filter((r) => r.id !== resource.id))}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => handleOpen('resource')}>Add Resource</Button>
      </Box>

      {/* Users Tab */}
      <Box hidden={currentTab !== 1}>
        <Typography variant="h6">Users</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen('user', user)}>Edit</Button>
                  <Button onClick={() => setUserData(userData.filter((u) => u.id !== user.id))}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => handleOpen('user')}>Add User</Button>
      </Box>

      {/* Requests Tab */}
      <Box hidden={currentTab !== 2}>
        <Typography variant="h6">Manage Requests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Resource ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{userData.find((u) => u.requests?.includes(req))?.name || 'Unknown'}</TableCell>
                <TableCell>{req.resourceId}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>
                  {req.status === 'pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRequestAction(req.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRequestAction(req.id, 'denied')}
                      >
                        Deny
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Add/Edit Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentItem ? 'Edit' : 'Add'} {formType === 'resource' ? 'Resource' : 'User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentItem?.name || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          {formType === 'resource' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={currentItem?.status || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                >
                  {resourceStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  value={currentItem?.type || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                >
                  {resourceTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {formType === 'user' && (
            <>
              <TextField
                label="Email"
                value={currentItem?.email || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  value={currentItem?.role || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
                >
                  {userRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
