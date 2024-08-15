import { MyPokemon } from "@prisma/client";

export type PokemonResponse = {
  id: string;
  pokemonId: number;
  name: string;
  nickname: string | null;
  profileUrl: string;
};

export type CreatePokemonRequest = {
  pokemonId: number;
  name: string;
  profileUrl: string;
};

export type updateNickname = {
    nickname: string;
}

export function toPokemonResponse(myPokemon: MyPokemon): PokemonResponse {
  return {
    id: myPokemon.id,
    pokemonId: Number(myPokemon.pokemon_id),
    name: myPokemon.name,
    nickname: myPokemon.nickname,
    profileUrl: myPokemon.profile_url,
  };
}
