import {
  Text,
  InputItem,
  DatePicker,
  List,
  Provider,
} from "@ant-design/react-native";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-back-ios.svg";
import React from "react";
import { ScrollView } from "react-native";
import {
  DateTimePicker,
  TextField,
  Button,
  View,
  Dialog,
  PanningProvider,
  Icon,
  Assets,
  Picker,
} from "react-native-ui-lib";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import { useCreateEvents } from "../../hooks/useCreateEvents";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  date: Yup.date().required("Обязательное поле"),
  time: Yup.date().required("Обязательное поле"),
  type: Yup.object().required("Обязательное поле"),
});

const options = [
  { label: "Встреча с клиентом", value: "meeting" },
  { label: "Показ", value: "presentation" },
  { label: "Запланированный звонок", value: "phone_call" },
];

const Add = () => {
  const navigate = useNavigate();

  const { mutate } = useCreateEvents();

  const onSubmit = ({ date, comment, duration, time, type }) => {
    date.setUTCHours(0, 0, 0, 0);
    mutate({
      realtorId: "1",
      date:
        Math.floor(date.getTime() / 1000) +
        time.getMinutes() * 60 +
        time.getHours() * 60 * 60,
      type: type.value,
      duration: duration.getMinutes() * 60 + duration.getHours() * 60 * 60,
      comment,
    });
    navigate("/");
  };

  return (
    <ScrollView>
      <View padding-page>
        <Button
          style={{ width: 40, height: 40 }}
          link
          marginB-20
          onPress={() => navigate("/")}
        >
          <Ionicons name="md-arrow-back" size={40} color="black" />
        </Button>

        <Formik
          initialValues={{
            date: "",
            comment: "",
            duration: "",
            time: "",
            type: "",
          }}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
            touched,
          }) => (
            <View>
              <DateTimePicker
                placeholder={"Дата"}
                mode={"date"}
                value={values.date ? new Date(values.date) : null}
                onChange={(value) => setFieldValue("date", value)}
                error={touched.date && errors.date}
              />
              <DateTimePicker
                placeholder={"Время"}
                mode={"time"}
                value={values.time ? new Date(values.time) : null}
                onChange={(value) => setFieldValue("time", value)}
                error={touched.time && errors.time}
              />
              <DateTimePicker
                placeholder={"Длительность"}
                mode={"time"}
                value={values.duration ? new Date(values.duration) : null}
                onChange={(value) => setFieldValue("duration", value)}
                error={touched.duration && errors.duration}
              />
              <Picker
                value={values.type}
                placeholder={"Тип события"}
                error={touched.type && errors.type}
                onChange={(value) => setFieldValue("type", value)}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    disabled={option.disabled}
                  />
                ))}
              </Picker>
              <TextField
                error={touched.comment && errors.comment}
                placeholder="Комментарий"
                value={values.comment}
                onChangeText={handleChange("comment")}
              />

              <Button marginT-10 label="Добавить" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Add;
