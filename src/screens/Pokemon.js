import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { getPokemonDetailsApi } from "../api/pokemon";
import Header from "../components/Pokemon/Header";
import Stats from "../components/Pokemon/Stats";
import Type from "../components/Pokemon/Type";
import Icon from "react-native-vector-icons/FontAwesome5";
import Favorite from "../components/Pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const { auth } = useAuth();

  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  console.log("llegan params=>", params.id);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        auth ? <Favorite id={pokemon?.id} /> : <Favorite id={pokemon?.id} />,
      headerLeft: () => (
        <Icon
          style={{ marginLeft: 20 }}
          size={20}
          name="arrow-left"
          color="#fff"
          onPress={() => navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        // navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
