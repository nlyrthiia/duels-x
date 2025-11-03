#[starknet::interface]
pub trait IArcaneGame<T> {
    fn spawn_player(ref self: T);
    fn set_deck(ref self: T, seed: u64, cards: Span<u16>);
    fn start_match(ref self: T, opponent: starknet::ContractAddress) -> u32;
    fn play_card(ref self: T, match_id: u32, hand_slot: u8);
    fn end_turn(ref self: T, match_id: u32);
    fn concede(ref self: T, match_id: u32);
}

#[dojo::contract]
pub mod arcane_game {
    use dojo::model::ModelStorage;
    use dojo_starter::models::{Match, MatchStatus, Player, DeckEntry, MatchLog};
    use starknet::ContractAddress;
    use super::IArcaneGame;

    #[abi(embed_v0)]
    impl ArcaneGameImpl of IArcaneGame<ContractState> {
        fn spawn_player(ref self: ContractState) {
            let mut world = self.world_default();
            let owner = starknet::get_caller_address();
            let player = Player { owner, created: true, hp: 40, atk: 3, def: 3 };
            world.write_model(@player);
        }

        fn set_deck(ref self: ContractState, seed: u64, cards: Span<u16>) {
            let mut world = self.world_default();
            let owner = starknet::get_caller_address();
            let len = cards.len();
            let mut i: u16 = 0;
            loop {
                if i.into() >= len { break; }
                let cid = *cards.at(i.into());
                let entry = DeckEntry { owner, index: i, card_id: cid };
                world.write_model(@entry);
                i = i + 1;
            }
        }

        fn start_match(ref self: ContractState, opponent: ContractAddress) -> u32 {
            let mut world = self.world_default();
            let caller = starknet::get_caller_address();
            
            // Use a simple counter: match_id = 1 for first match (increment if exists)
            let id: u32 = 1;  // TODO: implement proper counter via Match model

            let m = Match {
                match_id: id,
                player_a: caller,
                player_b: opponent,
                active_player: caller,
                turn: 1,
                status: MatchStatus::Active,
                seed: 0_u64,
                winner: Option::None,
            };
            world.write_model(@m);

            let log = MatchLog {
                match_id: id,
                event_id: 1,
                action: 'start',
                desc: 'Match started'
            };
            world.write_model(@log);

            id
        }

        fn play_card(ref self: ContractState, match_id: u32, hand_slot: u8) {
            let mut world = self.world_default();
            let log = MatchLog {
                match_id,
                event_id: 2,
                action: 'play',
                desc: 'Card played'
            };
            world.write_model(@log);
        }

        fn end_turn(ref self: ContractState, match_id: u32) {
            let mut world = self.world_default();
            let mut m: Match = world.read_model(match_id);
            m.turn += 1;
            world.write_model(@m);

            let log = MatchLog {
                match_id,
                event_id: 3,
                action: 'end_turn',
                desc: 'Turn ended'
            };
            world.write_model(@log);
        }

        fn concede(ref self: ContractState, match_id: u32) {
            let mut world = self.world_default();
            let mut m: Match = world.read_model(match_id);
            m.status = MatchStatus::Ended;
            world.write_model(@m);

            let log = MatchLog {
                match_id,
                event_id: 4,
                action: 'concede',
                desc: 'Player conceded'
            };
            world.write_model(@log);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    }
}

