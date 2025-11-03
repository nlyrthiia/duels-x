import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, CairoOption, CairoOptionVariant } from 'starknet';
import type { BigNumberish } from 'starknet';

// Type definition for `dojo_starter::models::DeckEntry` struct
export interface DeckEntry {
	owner: string;
	index: BigNumberish;
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::models::DirectionsAvailable` struct
export interface DirectionsAvailable {
	player: string;
	directions: Array<DirectionEnum>;
}

// Type definition for `dojo_starter::models::Hand` struct
export interface Hand {
	match_id: BigNumberish;
	owner: string;
	slot: BigNumberish;
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::models::Match` struct
export interface Match {
	match_id: BigNumberish;
	player_a: string;
	player_b: string;
	active_player: string;
	turn: BigNumberish;
	status: MatchStatusEnum;
	seed: BigNumberish;
	winner: CairoOption<string>;
}

// Type definition for `dojo_starter::models::MatchLog` struct
export interface MatchLog {
	match_id: BigNumberish;
	event_id: BigNumberish;
	action: BigNumberish;
	desc: BigNumberish;
}

// Type definition for `dojo_starter::models::Moves` struct
export interface Moves {
	player: string;
	remaining: BigNumberish;
	last_direction: CairoOption<DirectionEnum>;
	can_move: boolean;
}

// Type definition for `dojo_starter::models::Player` struct
export interface Player {
	owner: string;
	created: boolean;
	hp: BigNumberish;
	atk: BigNumberish;
	def: BigNumberish;
}

// Type definition for `dojo_starter::models::Position` struct
export interface Position {
	player: string;
	vec: Vec2;
}

// Type definition for `dojo_starter::models::PositionCount` struct
export interface PositionCount {
	identity: string;
	position: Array<[BigNumberish, BigNumberish]>;
}

// Type definition for `dojo_starter::models::Vec2` struct
export interface Vec2 {
	x: BigNumberish;
	y: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::Moved` struct
export interface Moved {
	player: string;
	direction: DirectionEnum;
}

// Type definition for `dojo_starter::models::Direction` enum
export const direction = [
	'Left',
	'Right',
	'Up',
	'Down',
] as const;
export type Direction = { [key in typeof direction[number]]: string };
export type DirectionEnum = CairoCustomEnum;

// Type definition for `dojo_starter::models::MatchStatus` enum
export const matchStatus = [
	'Pending',
	'Active',
	'Ended',
] as const;
export type MatchStatus = { [key in typeof matchStatus[number]]: string };
export type MatchStatusEnum = CairoCustomEnum;

export interface SchemaType extends ISchemaType {
	dojo_starter: {
		DeckEntry: DeckEntry,
		DirectionsAvailable: DirectionsAvailable,
		Hand: Hand,
		Match: Match,
		MatchLog: MatchLog,
		Moves: Moves,
		Player: Player,
		Position: Position,
		PositionCount: PositionCount,
		Vec2: Vec2,
		Moved: Moved,
	},
}
export const schema: SchemaType = {
	dojo_starter: {
		DeckEntry: {
			owner: "",
			index: 0,
			card_id: 0,
		},
		DirectionsAvailable: {
			player: "",
			directions: [new CairoCustomEnum({ 
					Left: "",
				Right: undefined,
				Up: undefined,
				Down: undefined, })],
		},
		Hand: {
			match_id: 0,
			owner: "",
			slot: 0,
			card_id: 0,
		},
		Match: {
			match_id: 0,
			player_a: "",
			player_b: "",
			active_player: "",
			turn: 0,
		status: new CairoCustomEnum({ 
					Pending: "",
				Active: undefined,
				Ended: undefined, }),
			seed: 0,
			winner: new CairoOption(CairoOptionVariant.None),
		},
		MatchLog: {
			match_id: 0,
			event_id: 0,
			action: 0,
			desc: 0,
		},
		Moves: {
			player: "",
			remaining: 0,
			last_direction: new CairoOption(CairoOptionVariant.None),
			can_move: false,
		},
		Player: {
			owner: "",
			created: false,
			hp: 0,
			atk: 0,
			def: 0,
		},
		Position: {
			player: "",
		vec: { x: 0, y: 0, },
		},
		PositionCount: {
			identity: "",
			position: [[0, 0]],
		},
		Vec2: {
			x: 0,
			y: 0,
		},
		Moved: {
			player: "",
		direction: new CairoCustomEnum({ 
					Left: "",
				Right: undefined,
				Up: undefined,
				Down: undefined, }),
		},
	},
};
export enum ModelsMapping {
	DeckEntry = 'dojo_starter-DeckEntry',
	Direction = 'dojo_starter-Direction',
	DirectionsAvailable = 'dojo_starter-DirectionsAvailable',
	Hand = 'dojo_starter-Hand',
	Match = 'dojo_starter-Match',
	MatchLog = 'dojo_starter-MatchLog',
	MatchStatus = 'dojo_starter-MatchStatus',
	Moves = 'dojo_starter-Moves',
	Player = 'dojo_starter-Player',
	Position = 'dojo_starter-Position',
	PositionCount = 'dojo_starter-PositionCount',
	Vec2 = 'dojo_starter-Vec2',
	Moved = 'dojo_starter-Moved',
}