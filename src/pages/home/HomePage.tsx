import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import { Button, Typography, List, ListItem } from "@mui/material";
import './HomePage.css'; 
import AddFriend from "../../components/AddFriend/AddFriend.tsx";
import InviteFriend from "../../components/InviteFriend/InviteFriend.tsx";
import { GlobalContext } from "../../context/context.tsx";

const HomePage = () => {
    const {user} = useContext(GlobalContext);
    const [openAddFriendModal, setAddFriendModal] = useState(false);
    const [openInvite, setOpenInvite] = useState(false);
    const [friends, setFriends] = useState<string[]>([]);

    const fetchFriends = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${user.username}/friends`, {
          method: 'GET'
        });
        const result = await response.json();
        if(response.ok) {
          setFriends(result.friends);
        }
      } catch(err) {
        alert("Error ocurred");
      }
    }

    useEffect(() => {
      fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
      <Navbar />
      <div className="box2">
        <div className="left-block">
          <div className="button-wrapper">
            <Button
              variant="contained"
              className="invite-friend-btn"
              onClick={() => setOpenInvite(true)}
            >
              Invite Friend
            </Button>
          </div>
          <div className="button-wrapper">
            <Button
              variant="contained"
              className="add-friend-btn"
              onClick={() => setAddFriendModal(true)}
            >
              Add Friend
            </Button>
          </div>
        </div>
        <div className="middle-block">
          <div className="button-wrapper">
            <Button variant="contained" color="primary">
              Add Expense
            </Button>
          </div>
          <div className="button-wrapper">
            <Button variant="outlined" color="secondary">
              Clear Expense
            </Button>
          </div>
        </div>
        <div className="right-block">
          <Typography variant="h6">Your Friends</Typography>
          <List>
            {friends.length !== 0 && friends.map((friend) => {
              return <ListItem key={friend}>{friend}</ListItem>
            })}
          </List>
        </div>
      </div>
      <AddFriend open={openAddFriendModal} closeModal={setAddFriendModal} fetchFriends={fetchFriends}/>
      <InviteFriend openInvite={openInvite} closeModal={setOpenInvite}/>
    </div>
  );
};

export default HomePage;