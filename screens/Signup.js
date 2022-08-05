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
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  DangerText,
  Line,
} from "./../components/style";
import { View, TouchableOpacity } from "react-native";
import tw from "twrnc";

//Colors
const { brand, darkLight, darkGray, green, tertiary, primary } = Colors;

import DateTimePicker from "@react-native-community/datetimepicker";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

const Signup = ({ navigation }) => {
  const store = useContext(GlobalContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [error, setError] = useState("");

  // Actual date of birth to be set
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <PageTitle>FINDME</PageTitle>
        <StatusBar style="dark" />
        <SubTitle style={tw`pb-5 mb-4`}>Welcome Onboard !</SubTitle>
        <InnerContainer style={tw`mt-1`}>
          {/* <PageLogo
          resizeMode="cover"
          source={require("./../assets/img/img1.png")}
        /> */}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={date}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateofBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              values.dob = dob;

              store
                .register(values)
                .then(() => {
                  setError("");
                })
                .catch((error) => {
                  if (error && error.response && error.response.data) {
                    setError(error.response.data.message);
                  } else {
                    setError("Something went wrong");
                  }
                  console.log(error, values);
                });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                {error !== "" && (
                  <DangerText style={{ color: "red" }}> {error} </DangerText>
                )}
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Richard Barnes"
                  placeholderTextColor={darkGray}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />

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
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkGray}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkGray}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("login")}>
                    <TextLinkContent>Log In</TextLinkContent>
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
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
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

export default Signup;
