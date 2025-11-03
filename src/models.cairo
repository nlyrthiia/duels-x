use starknet::ContractAddress;

// ===== ARCANE DUELS MODELS =====

#[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug, DojoStore, Default)]
pub enum MatchStatus {
    #[default]
    Pending,
    Active,
    Ended,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub owner: ContractAddress,
    pub created: bool,
    pub hp: u32,
    pub atk: u32,
    pub def: u32,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Match {
    #[key]
    pub match_id: u32,
    pub player_a: ContractAddress,
    pub player_b: ContractAddress,
    pub active_player: ContractAddress,
    pub turn: u32,
    pub status: MatchStatus,
    pub seed: u64,
    pub winner: Option<ContractAddress>,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Hand {
    #[key]
    pub match_id: u32,
    #[key]
    pub owner: ContractAddress,
    #[key]
    pub slot: u8,
    pub card_id: u16,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct DeckEntry {
    #[key]
    pub owner: ContractAddress,
    #[key]
    pub index: u16,
    pub card_id: u16,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct MatchLog {
    #[key]
    pub match_id: u32,
    #[key]
    pub event_id: u32,
    pub action: felt252,
    pub desc: felt252,
}

// Legacy models (keep for starter template compatibility)
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Moves {
    #[key]
    pub player: ContractAddress,
    pub remaining: u8,
    pub last_direction: Option<Direction>,
    pub can_move: bool,
}

#[derive(Drop, Serde, Debug)]
#[dojo::model]
pub struct DirectionsAvailable {
    #[key]
    pub player: ContractAddress,
    pub directions: Array<Direction>,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Position {
    #[key]
    pub player: ContractAddress,
    pub vec: Vec2,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct PositionCount {
    #[key]
    pub identity: ContractAddress,
    pub position: Span<(u8, u128)>,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug, DojoStore, Default)]
pub enum Direction {
    #[default]
    Left,
    Right,
    Up,
    Down,
}

#[derive(Copy, Drop, Serde, IntrospectPacked, Debug, DojoStore)]
pub struct Vec2 {
    pub x: u32,
    pub y: u32,
}

impl DirectionIntoFelt252 of Into<Direction, felt252> {
    fn into(self: Direction) -> felt252 {
        match self {
            Direction::Left => 1,
            Direction::Right => 2,
            Direction::Up => 3,
            Direction::Down => 4,
        }
    }
}

impl OptionDirectionIntoFelt252 of Into<Option<Direction>, felt252> {
    fn into(self: Option<Direction>) -> felt252 {
        match self {
            Option::None => 0,
            Option::Some(d) => d.into(),
        }
    }
}

#[generate_trait]
impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}

#[cfg(test)]
mod tests {
    use super::{Vec2, Vec2Trait};

    #[test]
    fn test_vec_is_zero() {
        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    }

    #[test]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }
}
