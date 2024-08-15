import express from "express";
import { PokemonController } from "../controllers/pokemonController";
export const apiRouter = express.Router();

// Pokemon Router
apiRouter.post("/api/pokemons", PokemonController.catchPokemon);
apiRouter.put("/api/pokemons/:pokemonId/update-nickname", PokemonController.updateNickname);
apiRouter.post("/api/pokemons/:pokemonId", PokemonController.renamePokemon);
apiRouter.delete("/api/pokemons/:pokemonId", PokemonController.releasePokemon);
apiRouter.get("/api/pokemons", PokemonController.findAllPokemons);
