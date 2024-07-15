import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';
import { Button } from '@chakra-ui/react';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const success = await dispatch(logout());
    if (success) {
      console.log('Logout successful');
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <Button variant={'ghost'} onClick={handleLogout}>Logout</Button>
  );
};

export default Logout;
