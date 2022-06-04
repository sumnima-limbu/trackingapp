import React, { useEffect, useContext } from "react";
import GlobalContext from './../Store/GlobalContext';
import {
  WelcomeContainer,
  InnerContainer,
} from "./../components/style";
import NotificationList from "./../components/NotificationList";

const Notification = () => {
  const store = useContext(GlobalContext);

  useEffect(() => {
    store.getNotifications()
      .catch(err => {
        console.log(err);
      });
  }, [store.notifications]);

  return (
    <>
      <InnerContainer>
        <WelcomeContainer>
          <NotificationList notifications={store.notifications}/>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Notification;
