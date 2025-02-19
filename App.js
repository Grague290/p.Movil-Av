import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox'; 

const App = () => {
  const [pokemonList, setPokemonList] = useState([]); 
  const [selectedPokemon, setSelectedPokemon] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3000');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const handleSelectPokemon = (pokemon) => {
    if (selectedPokemon.includes(pokemon)) {
      setSelectedPokemon(selectedPokemon.filter((item) => item !== pokemon));
    } else {
      setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select your Pokémon</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {filteredPokemonList.map((pokemon, index) => (
        <View key={index} style={styles.pokemonContainer}>
          <Checkbox
            value={selectedPokemon.includes(pokemon.name)}
            onValueChange={() => handleSelectPokemon(pokemon.name)}
            style={styles.checkbox} 
          />
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  pokemonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
  },
  selectedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedPokemon: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
