import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import {
  ListItem,
  Colors,
  View,
  ActionSheet,
  PanningProvider,
} from "react-native-ui-lib";
import { useEvents } from "../../hooks/useEvents";
import { useDeleteEvents } from "../../hooks/useDeleteEvents";

const EventsList = () => {
  const { data, isLoading } = useEvents();
  const { mutate } = useDeleteEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderRow = ({ index, item }) => {
    return (
      <View>
        <ListItem
          // @ts-expect-error
          padding-15
          height={75}
          onLongPress={() => setSelectedEvent(item)}
          marginB-15
          activeBackgroundColor={Colors.grey60}
          backgroundColor={Colors.grey70}
        >
          <ListItem.Part left style={{ flex: 1 }}>
            <Text>Дата: {item.datetime}</Text>
            <Text>Комментарий: {item.comment}</Text>
            <Text>Тип: {item.type}</Text>
            <Text>Длительность: {item.duration}</Text>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  };

  return (
    <View height={"80%"}>
      <ActionSheet
        title={"Действия"}
        visible={selectedEvent}
        message={"Message goes here"}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        onDismiss={() => setSelectedEvent(false)}
        options={[
          { label: "Удалить", onPress: () => mutate(selectedEvent.id) },
        ]}
      />
      <FlatList data={data?.data} renderItem={(value) => renderRow(value)} />
    </View>
  );
};

export default EventsList;
