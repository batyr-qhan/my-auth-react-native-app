import { StyleSheet, Text, View } from "react-native";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://my-auth-react-native-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((response) => {
        console.log("this is res dat", response.data);
      })
      .catch((err) => console.log("Err: ", err));
    axios
      .get(
        "https://my-auth-react-native-default-rtdb.europe-west1.firebasedatabase.app/items.json?auth=" +
          token
      )
      .then((res) => {
        console.log(res.data)
        setItems(res.data);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <View>
        {items.map((item) => (
          <View>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
