import React, { useState, useEffect, useContext } from "react";
import { FlatList, Text } from "react-native";
import { Formik } from "formik";
import PushNotification from "../components/PushNotification";
import InputField from "../components/InputField";
import GlobalContext from "./../Store/GlobalContext";
import {
  WelcomeContainer,
  InnerContainer,
  StyledFormArea,
  StyledButton,
  Button,
  ListContainer,
  ListMainContent,
  BoldText,
} from "./../components/style";
import tw from "twrnc";

const Circle = () => {
  const store = useContext(GlobalContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (store.circle && store.circle.length > 0) return;

    getCircle();
  });

  const getCircle = () => {
    store.getCircle().catch((err) => {
      console.log(err);
    });
  };

  const requestCircle = (values) => {
    store
      .requestCircle(values)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Something went wrong");
        }
      });
  };

  return (
    <>
      <InnerContainer>
        <WelcomeContainer>
          <FlatList
            data={store.circle}
            renderItem={({ item }) => {
              return (
                <ListContainer>
                  <ListMainContent>
                    <BoldText style={tw`text-xl font-bold text-orange-500`}>
                      {item.friend.name}
                    </BoldText>
                    <Text style={tw`font-bold text-base mt-2`}>
                      {item.friend.email}
                    </Text>
                    <Text style={tw`font-bold text-base`}>
                      {item.friend.phone_number}
                    </Text>
                  </ListMainContent>
                </ListContainer>
              );
            }}
            style={{ paddingTop: 40, width: "100%" }}
          />

          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              requestCircle(values);
              getCircle();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                {message !== "" && <Text> {message} </Text>}
                <InputField
                  label=""
                  icon="mail"
                  placeholder="sumnima@gmail.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <StyledButton onPress={handleSubmit}>
                  <Button>Add to Circle</Button>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
          <PushNotification />
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Circle;
