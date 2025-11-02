use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct RoomCreated {
    #[key]
    pub room_id: u64,
    pub host: ContractAddress,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct PlayerInRoom {
    #[key]
    pub room_id: u64,
    pub address: ContractAddress,
    pub ordinal: u8,
    pub timestamp: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct GameStarted {
    #[key]
    pub room_id: u64,
    pub timestamp: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct GameCancelled {
    #[key]
    pub room_id: u64,
    pub player: ContractAddress,
    pub timestamp: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct GameFinished {
    #[key]
    pub room_id: u64,
    pub winner: ContractAddress,
    pub timestamp: u64,
}
