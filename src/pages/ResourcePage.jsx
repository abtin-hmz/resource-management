import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { resources } from '../services/dummyData';

function ResourcePage({ currentUser, setCurrentUser, users, setUsers }) {
  const handleRequestAccess = (resourceId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const updatedUser = {
          ...user,
          requests: [
            ...user.requests,
            {
              id: user.requests.length + 1, // Unique request ID
              resourceId, // Requested resource ID
              status: 'pending', // Initial status
            },
          ],
        };
        setCurrentUser(updatedUser); // Update the current user
        return updatedUser;
      }
      return user;
    });

    setUsers(updatedUsers); // Update the users array
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Reserved':
        return 'warning';
      case 'Unavailable':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resources
      </Typography>
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
          {resources.classes.concat(resources.laptops).map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>{resource.name}</TableCell>
              <TableCell>
                <Chip
                  label={resource.status}
                  color={getStatusColor(resource.status)}
                />
              </TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>
                {resource.status === 'Available' ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRequestAccess(resource.id)}
                    disabled={currentUser.requests.some(
                      (req) =>
                        req.resourceId === resource.id &&
                        req.status === 'pending'
                    )}
                  >
                    {currentUser.requests.some(
                      (req) =>
                        req.resourceId === resource.id &&
                        req.status === 'pending'
                    )
                      ? 'Pending Request'
                      : 'Request Access'}
                  </Button>
                ) : (
                  <Button variant="contained" color="secondary" disabled>
                    Unavailable
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default ResourcePage;
