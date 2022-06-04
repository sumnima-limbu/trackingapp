import {View, Text} from "react-native";
import {BoldText} from "../style";

const CircleNotification = ({notification}) => {
  return (
    <View>
      <BoldText>{notification.from.name}</BoldText>
      <Text>{notification.message}</Text>
    </View>
  )

}

export default CircleNotification;
