import { updateNickname } from "./../models/pokemonModel";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";
import { Pageable } from "../models/page";
import {
  CreatePokemonRequest,
  PokemonResponse,
  toPokemonResponse
} from "../models/pokemonModel";

export class PokemonService {
  static async catchPokemon(
    req: CreatePokemonRequest
  ): Promise<PokemonResponse> {
    const random = Math.random()
    if (random < 0.5) {
      throw new ResponseError(417, "Upps, Failed to catch pokemon!");
    }

    const pokemon = await prismaClient.myPokemon.create({
      data: {
        name: req.name,
        pokemon_id: Number(req.pokemonId),
        profile_url: req.profileUrl
      }
    });
    return toPokemonResponse(pokemon);
  }

  static async updateNickname(
    id: string,
    nickname: string
  ): Promise<PokemonResponse> {
    const pokemon = await prismaClient.myPokemon.findFirst({
      where: {
        id: id
      }
    });

    if (!pokemon) {
      throw new ResponseError(404, "Pokemon not found");
    }

    const updatedPokemon = await prismaClient.myPokemon.update({
      where: {
        id: id
      },
      data: {
        nickname: nickname
      }
    });

    return toPokemonResponse(updatedPokemon);
  }

  static async isPrimeNumber(num: number): Promise<boolean> {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }

  static async getRandomNumber(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static async releasePokemon(
    id: string
  ): Promise<{ pokemon: PokemonResponse; primeNumber: number }> {
    const pokemon = await prismaClient.myPokemon.findFirst({
      where: {
        id: id
      }
    });

    if (!pokemon) {
      throw new ResponseError(404, "Pokemon not found");
    }

    const randomNumber = await this.getRandomNumber(1, 100);

    const primeNumber = await this.isPrimeNumber(randomNumber);

    if (!primeNumber) {
      throw new ResponseError(
        417,
        "Failed to release pokemon! Number was not prime"
      );
    }
    await prismaClient.myPokemon.delete({
      where: {
        id: id
      }
    });

    return {
      pokemon: toPokemonResponse(pokemon),
      primeNumber: randomNumber
    };
  }

  static nextFibonacci(n: number): number {
    let current = 0,
      next = 1;
    let double = false;

    if (n == next) {
      double = true;
    }

    while (current <= n) {
      [current, next] = [next, current + next];
    }

    return current;
  }

  static async renamePokemon(id: string): Promise<PokemonResponse> {
    const pokemon = await prismaClient.myPokemon.findFirst({
      where: {
        id: id
      }
    });
    if (!pokemon) {
      throw new ResponseError(404, "Pokemon not found");
    }
    const nickname = pokemon.nickname;
    const lastNumberMatch = nickname?.match(/-(\d+)$/);
    let newNickname;
    if (lastNumberMatch) {
      const lastNumber = parseInt(lastNumberMatch[1]);
      let nextNumber = this.nextFibonacci(lastNumber);
      newNickname = nickname?.replace(/-\d+$/, `-${nextNumber}`);
    } else {
      newNickname = `${nickname}-0`;
    }
    // }
    const newPokemon = await prismaClient.myPokemon.update({
      where: {
        id: id
      },
      data: {
        nickname: newNickname
      }
    });

    return toPokemonResponse(newPokemon);
  }

  static async findAll(): Promise<Pageable<PokemonResponse>> {
    const pokemons = await prismaClient.myPokemon.findMany();

    return {
      data: pokemons.map((pokemon) => toPokemonResponse(pokemon))
    };
  }
}
