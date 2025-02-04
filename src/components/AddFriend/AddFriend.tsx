import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useState} from "react";
import { GlobalContext } from "../../context/context.tsx";

const AddFriend = (props: {
  closeModal: (arg0: boolean) => void;
  open: boolean;
  fetchFriends: () => void;
}) => {
  const [friendName, setFriendName] = useState("");
  const {user} = useContext(GlobalContext);

  const handleClose = () => {
    props.closeModal(false);
    setFriendName("");
  };

  const addFriend = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${user.username}/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friendName: friendName
        })
      });
      const result = await response.json();
      if(response.ok) {
        alert("Successfully added friend");
        props.fetchFriends();
        handleClose();
      } else{
        alert(result.message);
        setFriendName("");
      }

    } catch(err) {
      alert("Error occurred");
    }
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Add a Friend</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Friend's Username"
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => addFriend()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriend;
