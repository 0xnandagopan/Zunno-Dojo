import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_game_room_cancelGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "cancel_game",
			calldata: [gameId],
		};
	};

	const game_room_cancelGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_room_cancelGame_calldata(gameId),
				"zunno_game",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_createGame_calldata = (withBot: boolean): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "create_game",
			calldata: [withBot],
		};
	};

	const game_room_createGame = async (snAccount: Account | AccountInterface, withBot: boolean) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_room_createGame_calldata(withBot),
				"zunno_game",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_finishGame_calldata = (gameId: BigNumberish, moveSequenceHash: string): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "finish_game",
			calldata: [gameId, moveSequenceHash],
		};
	};

	const game_room_finishGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish, moveSequenceHash: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_room_finishGame_calldata(gameId, moveSequenceHash),
				"zunno_game",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_getAllGames_calldata = (): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "get_all_games",
			calldata: [],
		};
	};

	const game_room_getAllGames = async () => {
		try {
			return await provider.call("zunno_game", build_game_room_getAllGames_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_getGameCount_calldata = (): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "get_game_count",
			calldata: [],
		};
	};

	const game_room_getGameCount = async () => {
		try {
			return await provider.call("zunno_game", build_game_room_getGameCount_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_getSpecificGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "get_specific_game",
			calldata: [gameId],
		};
	};

	const game_room_getSpecificGame = async (gameId: BigNumberish) => {
		try {
			return await provider.call("zunno_game", build_game_room_getSpecificGame_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_joinGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "join_game",
			calldata: [gameId],
		};
	};

	const game_room_joinGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_room_joinGame_calldata(gameId),
				"zunno_game",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_room_startGame_calldata = (gameId: BigNumberish, initialHandsHash: string): DojoCall => {
		return {
			contractName: "game_room",
			entrypoint: "start_game",
			calldata: [gameId, initialHandsHash],
		};
	};

	const game_room_startGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish, initialHandsHash: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_room_startGame_calldata(gameId, initialHandsHash),
				"zunno_game",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		game_room: {
			cancelGame: game_room_cancelGame,
			buildCancelGameCalldata: build_game_room_cancelGame_calldata,
			createGame: game_room_createGame,
			buildCreateGameCalldata: build_game_room_createGame_calldata,
			finishGame: game_room_finishGame,
			buildFinishGameCalldata: build_game_room_finishGame_calldata,
			getAllGames: game_room_getAllGames,
			buildGetAllGamesCalldata: build_game_room_getAllGames_calldata,
			getGameCount: game_room_getGameCount,
			buildGetGameCountCalldata: build_game_room_getGameCount_calldata,
			getSpecificGame: game_room_getSpecificGame,
			buildGetSpecificGameCalldata: build_game_room_getSpecificGame_calldata,
			joinGame: game_room_joinGame,
			buildJoinGameCalldata: build_game_room_joinGame_calldata,
			startGame: game_room_startGame,
			buildStartGameCalldata: build_game_room_startGame_calldata,
		},
	};
}