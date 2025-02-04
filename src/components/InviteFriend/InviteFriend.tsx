import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/context.tsx';

const InviteFriend = (props: {openInvite: boolean, closeModal: (arg0: boolean) => void;}) => {
    
    const {user} = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleCloseInvite = () => {
        props.closeModal(false);
    }

    const inviteFriend = async() => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${user.username}/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    description
                })
            });
            const result = await response.json();
            if(response.ok) {
                alert(result.message);
            }
        }catch(err) {
            alert("Some error occurred");
        }
    }

    return (
        <Dialog open={props.openInvite} onClose={handleCloseInvite}>
            <DialogTitle>Invite a Friend</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Friend's Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Message"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseInvite} color="secondary">
                Cancel
            </Button>
            <Button color="primary" onClick={() => {inviteFriend(); handleCloseInvite()}}>
                Send Email
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InviteFriend;