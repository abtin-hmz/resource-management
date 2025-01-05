import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { resources } from '../services/dummyData';

function UserRequestsPage({ currentUser }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'denied':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Resource Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUser.requests.map((req) => {
            const resource = resources.classes
              .concat(resources.laptops)
              .find((res) => res.id === req.resourceId);
            return (
              <TableRow key={req.id}>
                <TableCell>{resource?.name || 'Unknown Resource'}</TableCell>
                <TableCell>
                  <Chip label={req.status} color={getStatusColor(req.status)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

export default UserRequestsPage;
