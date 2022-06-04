import { FlatList } from 'react-native';
import {
  ListContainer,
} from "./../components/style";
import StressNotification from "./../components/notification-types/StressNotification";
import CircleNotification from "./../components/notification-types/CircleNotification";

const NotificationList = ({ notifications }) => {
  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => {
        return (
          <ListContainer>
            {item.type === 'stress' && <StressNotification notification={item} />}
            {item.type === 'circle' && <CircleNotification notification={item} />}
          </ListContainer>
        )
      }}
      style={{ paddingTop: 40, width: '100%' }}
    />
  );
}

export default NotificationList;
