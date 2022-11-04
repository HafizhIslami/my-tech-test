import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen(){
  const [collections, setCollections] = useState({})

  useEffect(() => {
    fetch("https://api-generator.retool.com/j3Iz08/collections")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => console.log(err));
  });
  
  return(
    <>
    <View>This is home</View>
    </>
  )
}