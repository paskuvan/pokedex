import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Details () {
    const params = useLocalSearchParams();

    console.log(params.name);

    useEffect(() => {}, [])

    async function fetchPokemonDetails() {
        // try {
            
        // } catch () {
    }
  
  return (
    <>
    <Stack.Screen options= {{ title: params.name as string}} />
   <ScrollView
   contentContainerStyle={{
    gap: 16,
    padding: 16,
   }}
   >
    <Text>{params.name}</Text>
   </ScrollView>
   </>
  );
}

const styles = StyleSheet.create({});
