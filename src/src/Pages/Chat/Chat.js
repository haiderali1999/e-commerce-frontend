/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-duplicates */
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { API_URL } from 'src/Redux/api/http-common';
import { fetchSellers } from 'src/Redux/slice/userSlice';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [seller, setSeller] = useState({});
  const dispatch = useDispatch();
  const {
    data: { data: sellers },
    loading,
    error,
  } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  useEffect(() => {
    const _socket = io(API_URL);

    _socket?.on('connect', () => {
      console.log(_socket);
    });

    setSocket(_socket);

    return () => {
      _socket.disconnect();
    };
  }, []);

  function sendMsg() {
    socket.emit('user-message', { sender: 'user1@gmail.com', receiver: '', message: input });
    setInput('');
  }

  socket?.on('user-message', (message) => {
    setMessages([...messages, message]);
  });
  return (
    <>
      <Typography variant="h4">Sellers</Typography>
      <Stack p={2} direction="row" gap={2}>
        <Paper sx={{ width: '25%' }}>
          <List>
            {sellers.map((_seller) => (
              <ListItemButton
                onClick={() => setSeller(_seller)}
                component="button"
                key={_seller._id}
                sx={{ width: '100%', backgroundColor: seller._id === _seller._id ? '#eeeeee' : '' }}
              >
                <img
                  style={{ height: '20px', width: '20px', borderRadius: 1000, marginRight: 5 }}
                  src={_seller.img}
                  alt={_seller.username}
                  loading="lazy"
                />
                <ListItemText sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} primary={_seller.username} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Paper sx={{ width: '75%', padding: 2 }}>
          <Stack height={{ md: '40vh' }} sx={{ backgroundColor: '#eeeeee' }}>
            {messages.map((message) => (
              <Typography key={message}>{message}</Typography>
            ))}
          </Stack>
          <OutlinedInput
            sx={{ mt: 2 }}
            disabled={!seller?._id}
            fullWidth
            name="chat"
            value={input}
            endAdornment={
              <Button disabled={!input} variant="outlined" onClick={sendMsg}>
                send
              </Button>
            }
            onChange={(e) => setInput(e.target.value)}
          />
        </Paper>
      </Stack>
    </>
  );
};

export default Chat;
