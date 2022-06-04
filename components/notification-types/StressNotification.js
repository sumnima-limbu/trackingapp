import {View, Text} from "react-native";
import {BoldText} from "../style";
import Map from "../Map";

const StressNotification = ({notification}) => {
  return (
    <View>
      <BoldText>{notification.from.name}</BoldText>
      <Text>{notification.message}</Text>
      <Map locations={notification.locations} />
    </View>
  )

}

export default StressNotification;
