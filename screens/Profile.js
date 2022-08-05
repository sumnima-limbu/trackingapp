import React, { useContext } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
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
        <WelcomeContainer style={tw`bg-gray-200 h-full`}>
          <StyledFormArea>
            <Avatar
              style={tw`mt-6 p-5`}
              resizeMode="cover"
              source={require("./../assets/profile.png")}
            />
            <PageTitle welcome={true}>Welcome!</PageTitle>

            <View style={tw`m-3 p-4`}>
              <Text style={tw`mt-2 text-lg text-center font-semibold`}>
                <Text style={tw`font-bold`}>Name: </Text>
                {store.user && store.user.name}
              </Text>
              <Text style={tw`mt-2 text-lg text-center font-semibold`}>
                <Text style={tw`font-bold`}>Email: </Text>
                {store.user && store.user.email}
              </Text>
            </View>

            {/* <SubTitle welcome={true}>{store.user && store.user.name}</SubTitle>
            <SubTitle welcome={true}>{store.user && store.user.email}</SubTitle> */}

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
