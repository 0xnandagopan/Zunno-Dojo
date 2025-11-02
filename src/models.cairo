use starknet::ContractAddress;

#[derive(Drop, Serde)]
#[dojo::model]
pub struct GameRoom {
    #[key]
    pub room_id: u64,
    pub host: ContractAddress,
    pub player_count: u8,
    pub max_players: u8, // 06
    pub min_players: u8, // 02
    pub game_state: GameState,
    pub created_at: u64,
    pub with_bot: bool,
    pub initial_hands_hash: ByteArray,
    pub move_sequence_hash: ByteArray,
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect, DojoStore, Default)]
pub enum GameState {
    #[default]
    LOBBY, // Waiting for players to join
    ACTIVE, // Game-play in progress
    FINISHED, // Game successfully finished
    CANCELLED // Game has been cancelled
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub room_id: u64,
    #[key]
    pub address: ContractAddress,
    pub ordinal: u8, // ordinal position in the game-play
    pub is_active: bool // player currently in the game
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Card {
    #[key]
    pub room_id: u64,
    #[key]
    pub card_id: u8,
    pub card_type: CardType,
    pub card_color: CardColor,
    pub value: u8 // Value of the card (for NUMBER type)
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect, DojoStore, Default)]
pub enum CardType {
    #[default]
    NUMBER, // 0-9
    SKIP, // Skip next player's turn
    REVERSE, // Reverse the direction of play
    DRAW_TWO, // Draw two cards
    DRAW_FOUR, // Draw four cards and change color
    COLOR_CHANGE // Change the color of the next card
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect, DojoStore, Default)]
pub enum CardColor {
    #[default]
    RED,
    BLUE,
    GREEN,
    YELLOW,
    WILD,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct DrawPile {
    #[key]
    pub room_id: u64,
    pub card_count: u8,
    pub top_card_id: u32 // 0 if empty
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct DiscardPile {
    #[key]
    pub room_id: u64,
    pub card_count: u8,
    pub top_card_id: u32, // 0 if empty
    pub active_color: CardColor // the current color in play
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Turn {
    #[key]
    pub room_id: u64,
    pub current_player: ContractAddress,
    pub current_player_ordinal: u8,
    pub direction: TurnDirection,
    pub active_color: CardColor,
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect, DojoStore, Default)]
pub enum TurnDirection {
    #[default]
    CLOCKWISE,
    COUNTERCLOCKWISE,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Reward {
    #[key]
    pub room_id: u64,
    pub winner: ContractAddress,
    pub token: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct GameSettings {
    #[key]
    pub item_id: u8, // Always 1
    pub room_count: u64,
}
