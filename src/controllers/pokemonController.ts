import { NextFunction, Request, Response } from "express";
import { CreatePokemonRequest } from "../models/pokemonModel";
import { PokemonService } from "../services/pokemonService";

export class PokemonController {
  static async catchPokemon(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePokemonRequest = req.body as CreatePokemonRequest;
      const response = await PokemonService.catchPokemon(request);

      res.status(200).json({
        message: "Pokemon caught successfully!",
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNickname(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.pokemonId;
      const nickname = req.body.nickname;

      const response = await PokemonService.updateNickname(id, nickname);

      res.status(200).json({
        message: "Pokemon nickname updated successfully!",
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async releasePokemon(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.pokemonId;

      const { pokemon, primeNumber } = await PokemonService.releasePokemon(id);

      res.status(200).json({
        message: "Pokemon released successfully!",
        data: { pokemon, primeNumber }
      });
    } catch (error) {
      next(error);
    }
  }

  static async renamePokemon(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.pokemonId;

      const response = await PokemonService.renamePokemon(id);

      res.status(200).json({
        message: "Pokemon renamed successfully!",
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllPokemons(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { data } = await PokemonService.findAll();

      res.status(200).json({
        message: "Pokemons fetched successfully!",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}
