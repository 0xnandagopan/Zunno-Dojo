import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, BigNumberish } from 'starknet';

// Type definition for `zunno_game::models::Card` struct
export interface Card {
	room_id: BigNumberish;
	card_id: BigNumberish;
	card_type: CardTypeEnum;
	card_color: CardColorEnum;
	value: BigNumberish;
}

// Type definition for `zunno_game::models::DiscardPile` struct
export interface DiscardPile {
	room_id: BigNumberish;
	card_count: BigNumberish;
	top_card_id: BigNumberish;
	active_color: CardColorEnum;
}

// Type definition for `zunno_game::models::DrawPile` struct
export interface DrawPile {
	room_id: BigNumberish;
	card_count: BigNumberish;
	top_card_id: BigNumberish;
}

// Type definition for `zunno_game::models::GameRoom` struct
export interface GameRoom {
	room_id: BigNumberish;
	host: string;
	player_count: BigNumberish;
	max_players: BigNumberish;
	min_players: BigNumberish;
	game_state: GameStateEnum;
	created_at: BigNumberish;
	with_bot: boolean;
	initial_hands_hash: string;
	move_sequence_hash: string;
}

// Type definition for `zunno_game::models::GameSettings` struct
export interface GameSettings {
	item_id: BigNumberish;
	room_count: BigNumberish;
}

// Type definition for `zunno_game::models::Player` struct
export interface Player {
	room_id: BigNumberish;
	address: string;
	ordinal: BigNumberish;
	is_active: boolean;
}

// Type definition for `zunno_game::models::Reward` struct
export interface Reward {
	room_id: BigNumberish;
	winner: string;
	token: BigNumberish;
}

// Type definition for `zunno_game::models::Turn` struct
export interface Turn {
	room_id: BigNumberish;
	current_player: string;
	current_player_ordinal: BigNumberish;
	direction: TurnDirectionEnum;
	active_color: CardColorEnum;
}

// Type definition for `zunno_game::events::GameCancelled` struct
export interface GameCancelled {
	room_id: BigNumberish;
	player: string;
	timestamp: BigNumberish;
}

// Type definition for `zunno_game::events::GameFinished` struct
export interface GameFinished {
	room_id: BigNumberish;
	winner: string;
	timestamp: BigNumberish;
}

// Type definition for `zunno_game::events::GameStarted` struct
export interface GameStarted {
	room_id: BigNumberish;
	timestamp: BigNumberish;
}

// Type definition for `zunno_game::events::PlayerInRoom` struct
export interface PlayerInRoom {
	room_id: BigNumberish;
	address: string;
	ordinal: BigNumberish;
	timestamp: BigNumberish;
}

// Type definition for `zunno_game::events::RoomCreated` struct
export interface RoomCreated {
	room_id: BigNumberish;
	host: string;
}

// Type definition for `zunno_game::models::CardColor` enum
export const cardColor = [
	'RED',
	'BLUE',
	'GREEN',
	'YELLOW',
	'WILD',
] as const;
export type CardColor = { [key in typeof cardColor[number]]: string };
export type CardColorEnum = CairoCustomEnum;

// Type definition for `zunno_game::models::CardType` enum
export const cardType = [
	'NUMBER',
	'SKIP',
	'REVERSE',
	'DRAW_TWO',
	'DRAW_FOUR',
	'COLOR_CHANGE',
] as const;
export type CardType = { [key in typeof cardType[number]]: string };
export type CardTypeEnum = CairoCustomEnum;

// Type definition for `zunno_game::models::GameState` enum
export const gameState = [
	'LOBBY',
	'ACTIVE',
	'FINISHED',
	'CANCELLED',
] as const;
export type GameState = { [key in typeof gameState[number]]: string };
export type GameStateEnum = CairoCustomEnum;

// Type definition for `zunno_game::models::TurnDirection` enum
export const turnDirection = [
	'CLOCKWISE',
	'COUNTERCLOCKWISE',
] as const;
export type TurnDirection = { [key in typeof turnDirection[number]]: string };
export type TurnDirectionEnum = CairoCustomEnum;

export interface SchemaType extends ISchemaType {
	zunno_game: {
		Card: Card,
		DiscardPile: DiscardPile,
		DrawPile: DrawPile,
		GameRoom: GameRoom,
		GameSettings: GameSettings,
		Player: Player,
		Reward: Reward,
		Turn: Turn,
		GameCancelled: GameCancelled,
		GameFinished: GameFinished,
		GameStarted: GameStarted,
		PlayerInRoom: PlayerInRoom,
		RoomCreated: RoomCreated,
	},
}
export const schema: SchemaType = {
	zunno_game: {
		Card: {
			room_id: 0,
			card_id: 0,
		card_type: new CairoCustomEnum({ 
					NUMBER: "",
				SKIP: undefined,
				REVERSE: undefined,
				DRAW_TWO: undefined,
				DRAW_FOUR: undefined,
				COLOR_CHANGE: undefined, }),
		card_color: new CairoCustomEnum({ 
					RED: "",
				BLUE: undefined,
				GREEN: undefined,
				YELLOW: undefined,
				WILD: undefined, }),
			value: 0,
		},
		DiscardPile: {
			room_id: 0,
			card_count: 0,
			top_card_id: 0,
		active_color: new CairoCustomEnum({ 
					RED: "",
				BLUE: undefined,
				GREEN: undefined,
				YELLOW: undefined,
				WILD: undefined, }),
		},
		DrawPile: {
			room_id: 0,
			card_count: 0,
			top_card_id: 0,
		},
		GameRoom: {
			room_id: 0,
			host: "",
			player_count: 0,
			max_players: 0,
			min_players: 0,
		game_state: new CairoCustomEnum({ 
					LOBBY: "",
				ACTIVE: undefined,
				FINISHED: undefined,
				CANCELLED: undefined, }),
			created_at: 0,
			with_bot: false,
		initial_hands_hash: "",
		move_sequence_hash: "",
		},
		GameSettings: {
			item_id: 0,
			room_count: 0,
		},
		Player: {
			room_id: 0,
			address: "",
			ordinal: 0,
			is_active: false,
		},
		Reward: {
			room_id: 0,
			winner: "",
			token: 0,
		},
		Turn: {
			room_id: 0,
			current_player: "",
			current_player_ordinal: 0,
		direction: new CairoCustomEnum({ 
					CLOCKWISE: "",
				COUNTERCLOCKWISE: undefined, }),
		active_color: new CairoCustomEnum({ 
					RED: "",
				BLUE: undefined,
				GREEN: undefined,
				YELLOW: undefined,
				WILD: undefined, }),
		},
		GameCancelled: {
			room_id: 0,
			player: "",
			timestamp: 0,
		},
		GameFinished: {
			room_id: 0,
			winner: "",
			timestamp: 0,
		},
		GameStarted: {
			room_id: 0,
			timestamp: 0,
		},
		PlayerInRoom: {
			room_id: 0,
			address: "",
			ordinal: 0,
			timestamp: 0,
		},
		RoomCreated: {
			room_id: 0,
			host: "",
		},
	},
};
export enum ModelsMapping {
	Card = 'zunno_game-Card',
	CardColor = 'zunno_game-CardColor',
	CardType = 'zunno_game-CardType',
	DiscardPile = 'zunno_game-DiscardPile',
	DrawPile = 'zunno_game-DrawPile',
	GameRoom = 'zunno_game-GameRoom',
	GameSettings = 'zunno_game-GameSettings',
	GameState = 'zunno_game-GameState',
	Player = 'zunno_game-Player',
	Reward = 'zunno_game-Reward',
	Turn = 'zunno_game-Turn',
	TurnDirection = 'zunno_game-TurnDirection',
	GameCancelled = 'zunno_game-GameCancelled',
	GameFinished = 'zunno_game-GameFinished',
	GameStarted = 'zunno_game-GameStarted',
	PlayerInRoom = 'zunno_game-PlayerInRoom',
	RoomCreated = 'zunno_game-RoomCreated',
}