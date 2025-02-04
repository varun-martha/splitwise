import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/context.tsx';

const SignOut = (props: {
    closeModal: (arg0: boolean) => void;
    open: boolean;
  }) => {

    const navigate = useNavigate();
    const {setUser} = useContext(GlobalContext);
    const handleClose = () => {
        props.closeModal(false);
    }
    
    const signOut = () => {
        navigate('/');
        setUser({
            username: '',
            email: '',
            mobileNumber: ''
        });
    }
  return (
    <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Are you sure want to sign out ?</DialogTitle>
        <DialogActions>
          <Button color="primary" variant='outlined' onClick={signOut}>
            sign out
          </Button>
          <Button color="error" onClick={handleClose} variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default SignOut;