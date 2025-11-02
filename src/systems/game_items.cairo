// dojo decorator
#[dojo::contract]
pub mod game_room {
    use dojo::event::EventStorage;
    use dojo::model::{Model, ModelStorage};
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};
    use zunno_game::errors::Errors;
    use zunno_game::events::{GameCancelled, GameFinished, GameStarted, PlayerInRoom, RoomCreated};
    use zunno_game::interfaces::IRoomActions;
    use zunno_game::models::{GameRoom, GameSettings, GameState, Player};

    pub const BOT: felt252 = 'PLAY_WITH_BOT';
    pub const BOT_ADDRESS: ContractAddress = BOT.try_into().unwrap();

    #[abi(embed_v0)]
    impl IRoomActionsImpl of IRoomActions<ContractState> {
        fn create_game(ref self: ContractState, with_bot: bool) -> u64 {
            let mut world = self.world(@"zunno_game");
            let player_address = get_caller_address();

            let item_id: u8 = 01;
            let game: GameSettings = world.read_model(item_id);
            let room_count = game.room_count + 1;

            let room_id: u64 = room_count;
            let timestamp: u64 = get_block_timestamp();

            let mut room: GameRoom = GameRoom {
                room_id,
                host: player_address,
                player_count: 1_u8,
                max_players: 6_u8,
                min_players: 2_u8,
                game_state: GameState::LOBBY,
                created_at: timestamp,
                with_bot,
                initial_hands_hash: "",
                move_sequence_hash: "",
            };

            if with_bot {
                room.player_count += 1;
            }

            world.write_model(@room);
            world.emit_event(@RoomCreated { room_id, host: player_address });

            let player: Player = Player {
                room_id, address: player_address, ordinal: 01_u8, is_active: true,
            };
            world.write_model(@player);
            world
                .emit_event(
                    @PlayerInRoom { room_id, address: player_address, ordinal: 01_u8, timestamp },
                );

            world
                .write_member(
                    Model::<GameSettings>::ptr_from_keys(item_id),
                    selector!("room_count"),
                    room_count,
                );

            room_id
        }

        fn join_game(ref self: ContractState, game_id: u64) -> u64 {
            let mut world = self.world(@"zunno_game");
            let player_address = get_caller_address();

            let mut room: GameRoom = world.read_model(game_id);

            assert(room.player_count < 6, Errors::INVALID_PLAYER_ENTRY_REQUEST);
            assert(room.game_state == GameState::LOBBY, Errors::INVALID_PLAYER_ENTRY_REQUEST);

            let count = room.player_count + 1;

            let player: Player = Player {
                room_id: game_id, address: player_address, ordinal: count, is_active: true,
            };
            world.write_model(@player);
            world
                .emit_event(
                    @PlayerInRoom {
                        room_id: game_id,
                        address: player_address,
                        ordinal: room.player_count,
                        timestamp: get_block_timestamp(),
                    },
                );

            world
                .write_member(
                    Model::<GameRoom>::ptr_from_keys(game_id), selector!("player_count"), count,
                );

            game_id
        }

        fn start_game(ref self: ContractState, game_id: u64, initial_hands_hash: ByteArray) -> u64 {
            let mut world = self.world(@"zunno_game");

            let mut room: GameRoom = world.read_model(game_id);

            assert(room.player_count >= room.min_players, Errors::NOT_ENOUGH_PLAYERS);
            assert(room.game_state == GameState::LOBBY, Errors::INVALID_GAME_STATE);

            let room_id = room.room_id;
            let timestamp = get_block_timestamp();

            room.game_state = GameState::ACTIVE;
            room.initial_hands_hash.append(@initial_hands_hash);
            world.write_model(@room);

            world.emit_event(@GameStarted { room_id, timestamp });

            game_id
        }

        fn cancel_game(ref self: ContractState, game_id: u64) -> u64 {
            let mut world = self.world(@"zunno_game");
            let player_address = get_caller_address();

            let mut room: GameRoom = world.read_model(game_id);

            assert(room.game_state == GameState::ACTIVE, Errors::INVALID_GAME_STATE);

            let room_id = room.room_id;
            let timestamp = get_block_timestamp();

            let state: GameState = GameState::ACTIVE;
            world
                .write_member(
                    Model::<GameRoom>::ptr_from_keys(game_id), selector!("game_state"), state,
                );

            world
                .write_member(
                    Model::<Player>::ptr_from_keys((room_id, player_address)),
                    selector!("is_active"),
                    false,
                );

            world.emit_event(@GameCancelled { room_id, player: player_address, timestamp });

            game_id
        }

        fn finish_game(
            ref self: ContractState, game_id: u64, move_sequence_hash: ByteArray,
        ) -> u64 {
            let mut world = self.world(@"zunno_game");
            let player_address = get_caller_address();

            let mut room: GameRoom = world.read_model(game_id);

            assert(room.game_state == GameState::ACTIVE, Errors::INVALID_GAME_STATE);

            let room_id = room.room_id;
            let timestamp = get_block_timestamp();

            room.game_state = GameState::FINISHED;
            room.move_sequence_hash.append(@move_sequence_hash);
            world.write_model(@room);

            world.emit_event(@GameFinished { room_id, winner: player_address, timestamp });

            game_id
        }

        fn get_game_count(self: @ContractState) -> u64 {
            let mut world = self.world(@"zunno_game");
            let item_id: u8 = 01;
            let room_count: u64 = world
                .read_member(
                    Model::<GameSettings>::ptr_from_keys(item_id), selector!("room_count"),
                );

            room_count
        }

        fn get_specific_game(self: @ContractState, game_id: u64) -> GameRoom {
            let mut world = self.world(@"zunno_game");
            let room: GameRoom = world.read_model(game_id);

            room
        }

        fn get_all_games(self: @ContractState) -> Array<GameRoom> {
            let room_count = self.get_game_count() + 1;
            let mut game_rooms: Array<GameRoom> = ArrayTrait::new();
            for i in 1..room_count {
                let room = self.get_specific_game(i);
                game_rooms.append(room);
            }

            game_rooms
        }
    }
}
