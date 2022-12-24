import React from "react";

import EventsList from "../EventsList/EventsList";
import { Link, useNavigate } from "react-router-native";
import { Text, View } from "react-native-ui-lib";
import Button from "react-native-ui-lib/button";

const Events = ({ history }) => {
  const navigate = useNavigate();

  return (
    <View>
      <Text text30 marginB-20>
        События
      </Text>
      <Button
        label="Добавить событие"
        onPress={() => navigate("/add")}
        marginB-20
      />
      <EventsList />
    </View>
  );
};

export default Events;
