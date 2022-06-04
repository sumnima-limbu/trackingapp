import React, { useContext } from 'react';
import GlobalContext from "../Store/GlobalContext";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "./../components/style";


const Profile = () => {
  const store = useContext(GlobalContext);

  return (
    <>
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{store.user && store.user.name}</SubTitle>
          <SubTitle welcome={true}>{store.user && store.user.email}</SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/img/img1.png")}
            />
            <Line />
            <StyledButton onPress={() => store.reset()}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Profile;
