import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/context.tsx'
import SignOut from '../Signout/SignOut.tsx';

const Navbar = () => {
    const {user} = useContext(GlobalContext);

    const [openSignOutModal, setOpenSignOutModal] = useState(false);

  return (
    <AppBar color='success' position={'sticky'} sx={{
        backgroundColor: '#716fe8', 
        color: 'white', 
      }}>
        <Toolbar>
            <Typography variant='h6' component={'div'} sx = {{flexGrow:1}} >
                Hello, {user.username}👋!
            </Typography>
            <Button variant="contained"
                size="small" 
                sx={{
                    textTransform: 'none', 
                    padding: '8px 15px', 
                    backgroundColor: '#fa0707', 
                    '&:hover': {
                        backgroundColor: '#c2185b', 
                    },
                }}
                onClick={() => setOpenSignOutModal(true)}
            > Sign out</Button>
        </Toolbar>
        <SignOut open={openSignOutModal} closeModal={setOpenSignOutModal} />
    </AppBar>
  )
}

export default Navbar;