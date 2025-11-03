import { DojoProvider, type DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, CairoCustomEnum } from "starknet";
import type { BigNumberish } from "starknet";

export function setupWorld(provider: DojoProvider) {

	const build_actions_move_calldata = (direction: CairoCustomEnum): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "move",
			calldata: [direction],
		};
	};

	const actions_move = async (snAccount: Account | AccountInterface, direction: CairoCustomEnum) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_actions_move_calldata(direction),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_spawn_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "spawn",
			calldata: [],
		};
	};

	const actions_spawn = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_actions_spawn_calldata(),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_concede_calldata = (matchId: BigNumberish): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "concede",
			calldata: [matchId],
		};
	};

	const arcane_game_concede = async (snAccount: Account | AccountInterface, matchId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_concede_calldata(matchId),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_endTurn_calldata = (matchId: BigNumberish): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "end_turn",
			calldata: [matchId],
		};
	};

	const arcane_game_endTurn = async (snAccount: Account | AccountInterface, matchId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_endTurn_calldata(matchId),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_playCard_calldata = (matchId: BigNumberish, handSlot: BigNumberish): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "play_card",
			calldata: [matchId, handSlot],
		};
	};

	const arcane_game_playCard = async (snAccount: Account | AccountInterface, matchId: BigNumberish, handSlot: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_playCard_calldata(matchId, handSlot),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_setDeck_calldata = (seed: BigNumberish, cards: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "set_deck",
			calldata: [seed, cards],
		};
	};

	const arcane_game_setDeck = async (snAccount: Account | AccountInterface, seed: BigNumberish, cards: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_setDeck_calldata(seed, cards),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_spawnPlayer_calldata = (): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "spawn_player",
			calldata: [],
		};
	};

	const arcane_game_spawnPlayer = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_spawnPlayer_calldata(),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_arcane_game_startMatch_calldata = (opponent: string): DojoCall => {
		return {
			contractName: "arcane_game",
			entrypoint: "start_match",
			calldata: [opponent],
		};
	};

	const arcane_game_startMatch = async (snAccount: Account | AccountInterface, opponent: string) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_arcane_game_startMatch_calldata(opponent),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			move: actions_move,
			buildMoveCalldata: build_actions_move_calldata,
			spawn: actions_spawn,
			buildSpawnCalldata: build_actions_spawn_calldata,
		},
		arcane_game: {
			concede: arcane_game_concede,
			buildConcedeCalldata: build_arcane_game_concede_calldata,
			endTurn: arcane_game_endTurn,
			buildEndTurnCalldata: build_arcane_game_endTurn_calldata,
			playCard: arcane_game_playCard,
			buildPlayCardCalldata: build_arcane_game_playCard_calldata,
			setDeck: arcane_game_setDeck,
			buildSetDeckCalldata: build_arcane_game_setDeck_calldata,
			spawnPlayer: arcane_game_spawnPlayer,
			buildSpawnPlayerCalldata: build_arcane_game_spawnPlayer_calldata,
			startMatch: arcane_game_startMatch,
			buildStartMatchCalldata: build_arcane_game_startMatch_calldata,
		},
	};
}