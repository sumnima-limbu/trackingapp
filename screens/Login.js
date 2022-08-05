import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import GlobalContext from "../Store/GlobalContext";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  DangerText,
} from "./../components/style";
import { View } from "react-native";

//Colors
const { brand, darkLight, darkGray, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const store = useContext(GlobalContext);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <PageTitle>FINDME</PageTitle>
        <StatusBar style="dark" />
        <SubTitle>Welcome Back !</SubTitle>
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/img/login.png")}
          />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              store
                .login(values)
                .then(() => {
                  setError("");
                })
                .catch((error) => {
                  if (error && error.response && error.response.data) {
                    setError(error.response.data.message);
                  } else {
                    setError("Something went wrong");
                  }
                  console.log(error);
                });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                {error !== "" && (
                  <DangerText style={{ color: "red" }}> {error} </DangerText>
                )}
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="sumnima@gmail.com"
                  placeholderTextColor={darkGray}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkGray}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Log In</ButtonText>
                </StyledButton>
                <Line />
                {/*<StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>*/}
                <ExtraView>
                  <ExtraText>Don't have an account ? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("signup")}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
