import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}


interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

const colorsByType:Record<string, string> ={
  grass: '#74CB48',
  water: '#6493EB',
  fire: '#F57D31',
  electric: '#F9CF30',
  psychic: '#FB5584',
  poison: '#A43E9E',
  bug: '#A7B723',
  flying: '#A891EC',
  fighting: '#C12239',
  normal: '#AAA67F',
  rock: '#B69E31',
  ground: '#DEC16B',
  ghost: '#70559B',
  dark: '#75574C',
  steel: '#B7B9D0',
  fairy: '#E69EAC',
  dragon: '#7037FF',
  ice: '#9AD6DF',
  unknown: '#D8D8D8',
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemons[0], null, 2));
  useEffect(() => {
    //fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      );
      const data = await response.json();

      // fetch detailed info for each pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, //main sprite
            imageBack: details.sprites.back_default, //back sprite
            types: details.types, //types array
          };
        })
      );

    

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
   <ScrollView
   contentContainerStyle={{
    gap: 16,
    padding: 16,
   }}
   >
    {pokemons.map((pokemon: Pokemon) => (
      <Link key={pokemon.name} href={{ pathname: "/details", params: { name: pokemon.name } }}
      style={{

        // @ts-ignore
        backgroundColor: colorsByType[pokemon.types[0].type.name] + '50',
        padding: 20,
        borderRadius: 20,
      }}>
      <View>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
       <View style={{
        flexDirection: 'row',
       }}>
         <Image 
        source={{ uri: pokemon.image }}
        style={{ width: 150, height: 150 }}
        />
          <Image 
        source={{ uri: pokemon.imageBack }}
        style={{ width: 150, height: 150 }}
        />
       </View>

      </View>
      </Link>
    ))}
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
});
