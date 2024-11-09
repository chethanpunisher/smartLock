import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  Typography, 
  Box, 
  Paper, 
  Container, 
  Grid,
  IconButton,
  Alert 
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import RfidIcon from '@mui/icons-material/RssFeed';

const SOCKET_SERVER_URL = "https://doorlocksmart.pagekite.me/";

const DoorControl = () => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [idValue, setIdValue] = useState('');
  const [enrollType, setEnrollType] = useState('fingerprint');
  const [fingerprintStatus, setFingerprintStatus] = useState('');
  const [rfidStatus, setRfidStatus] = useState('');
  const [unlockMessage, setUnlockMessage] = useState('');
  const [fingerPrintResponse, setFingerPrintResponce] = useState('');

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on('unlock_response', (data) => {
      setUnlockMessage(data.status);
    });

    socketInstance.on('fingerPrint_response', (data) => {
      setFingerPrintResponce(data.status);
    });

    socketInstance.on('enroll_response', (data) => {
      const message = data.name;
      if (data.type === 'fingerprint') {
        setFingerprintStatus(message);
        setFingerPrintResponce('');
      } else if (data.type === 'rfid') {
        setRfidStatus(message);
      }
    });

    socketInstance.on('rfid_response', (data) => {
      setRfidStatus(`RFID Tag Detected: ${data.id}, Name: ${data.name}`);
    });

    const pollingInterval = setInterval(() => {
      socketInstance.emit('poll_request');
    }, 500);

    return () => {
      clearInterval(pollingInterval);
      socketInstance.disconnect();
    };
  }, [enrollType]);

  useEffect(() => {
    if (socket) {
      socket.on('status_update', (data) => {
        setStatus(data.status);
        setFingerprintStatus(data.fingerprintStatus);
        setRfidStatus(data.rfidStatus);
      });
    }
  }, [socket]);

  const unlockDoor = () => {
    if (socket) {
      socket.emit('unlock_request', { action: 'unlock' });
    }
  };

  const enroll = () => {
    if (socket && name && idValue) {
      setFingerprintStatus('');
      setRfidStatus('');
      socket.emit('enroll_request', {
        name: name,
        id: idValue,
        type: enrollType
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Paper elevation={4} sx={{ padding: '30px', borderRadius: '15px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Door Lock Control
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton 
                color="primary" 
                onClick={unlockDoor} 
                size="large" 
                aria-label="Unlock Door"
              >
                <LockOpenIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Alert severity="info" style={{ marginTop: '10px' }}>
              {unlockMessage || "Door is locked"}
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Enroll Fingerprint or RFID</Typography>

            <TextField
              label="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            
            <TextField
              label="Enter ID"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Select
              value={enrollType}
              onChange={(e) => setEnrollType(e.target.value)}
              fullWidth
              displayEmpty
              style={{ marginTop: '10px', marginBottom: '20px' }}
            >
              <MenuItem value="fingerprint">
                <FingerprintIcon fontSize="small" style={{ marginRight: '8px' }} />
                Fingerprint
              </MenuItem>
              <MenuItem value="rfid">
                <RfidIcon fontSize="small" style={{ marginRight: '8px' }} />
                RFID
              </MenuItem>
            </Select>

            <Button 
              variant="contained" 
              color="secondary" 
              onClick={enroll} 
              fullWidth
            >
              Enroll
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Typography variant="h6">Enrollment Status:</Typography>
            <Alert severity="success">{fingerPrintResponse}</Alert>
            <Typography variant="body2">Fingerprint Status: {fingerprintStatus}</Typography>
            <Typography variant="body2">RFID Status: {rfidStatus}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DoorControl;
