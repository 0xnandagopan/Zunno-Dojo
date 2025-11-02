use zunno_game::models::GameRoom;

#[starknet::interface]
pub trait IRoomActions<T> {
    fn create_game(ref self: T, with_bot: bool) -> u64;
    fn join_game(ref self: T, game_id: u64) -> u64;
    fn start_game(ref self: T, game_id: u64, initial_hands_hash: ByteArray) -> u64;
    fn cancel_game(ref self: T, game_id: u64) -> u64;
    fn finish_game(ref self: T, game_id: u64, move_sequence_hash: ByteArray) -> u64;
    fn get_game_count(self: @T) -> u64;
    fn get_specific_game(self: @T, game_id: u64) -> GameRoom;
    fn get_all_games(self: @T) -> Array<GameRoom>;
}
