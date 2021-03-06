import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import PokedexScreen from "../screens/Pokedex";
import PokemonScreen from "../screens/Pokemon";

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: "", headerTransparent: true }}
      ></Stack.Screen>

      <Stack.Screen
        name="Pokemon"
        options={{ title: "", headerTransparent: true }}
        component={PokemonScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
