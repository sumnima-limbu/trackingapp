import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, Alert } from "react-native";
import tw from "twrnc";
import GlobalContext from "../Store/GlobalContext";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  Button,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "./../components/style";

const Profile = ({ route, navigation }) => {
  const store = useContext(GlobalContext);

  return (
    <>
      <View>
        <ScrollView>
          <View style={{padding:10, width:'100%', backgroundColor:'#000f', height:150}}>
          </View>
          <View style={tw`flex justify-center items-center h-screen`}>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/profile.png")}
            />
            <Text style={tw`font-bold text-3xl pt-6 pb-6`}>User Name</Text>
            <Text style={tw`text-xl font-bold text-gray-600`}>age, Name</Text>
          </View>

          <View style={{
            width:"90%", 
            justifyContent:'center',
            alignSelf: 'center',
            flexDirection: 'column'}}>
              
            <TouchableOpacity style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '90%',
                padding: 20,
                paddingBottom: 22,
                borderRadius:10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 40,
                }}>
              <Text style={{fontSize:15, color:'#818181', fontWeight:'bold', marginLeft:10 }}>Edit Profile Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '90%',
                padding: 20,
                paddingBottom: 22,
                borderRadius:10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 20,
              }}>
            <Text style={{fontSize:15, color:'#818181', fontWeight:'bold', marginLeft:10}}>
                Location History
              </Text>
          </TouchableOpacity>

          <View style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: '90%',
            padding: 20,
            paddingBottom: 22,
            borderRadius:10,
            shadowOpacity: 80,
            elevation: 15,
            marginTop: 20,
            marginBottom:30,
          }}>
          <Text style={{fontSize:15, color:'#818181', fontWeight:'bold', marginLeft:10  }}>Button</Text>
          </View>

          <View>
            <Line />
            <StyledButton style={{marginLeft:20, marginRight: 20}} onPress={()=>store.reset()}>
              <Button>Logout</Button>
            </StyledButton>
          </View>
          </View>
      
        </ScrollView>
      </View>

      
    </>
  );
};

export default Profile;
