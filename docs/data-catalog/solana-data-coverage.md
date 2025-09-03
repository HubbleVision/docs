---
sidebar_position: 1
---

# Solana Data Coverage

### DEX Coverage

We parsed DEX transaction trades data from dominating DEX protocols and projects on Solana network.

See monitored programs and families below:

| Project | **Protocols** Program          | Is Bonding Curve? |
| ------- | ------------------------------ | ----------------- |
| PumpFun | PumpFun AMM                    |                   |
|         | Pump Program                   | YES               |
| Raydium | Raydium Liquidity Pool V4      |                   |
|         | Raydium Concentrated Liquidity |                   |
|         | Raydium CPMM                   |                   |
|         | Raydium Launchlab (BONK)       | YES               |
| Meteora | Meteora DLMM                   |                   |
|         | Meteora Dynamic                |                   |
| Orca    | Orca                           |                   |

### Aggregator Coverage

We actively monitored routers below:

- Jupiter Aggregator V6
- OKX DEX: Aggregation Router V2

All actively monitored routes will be automatically parsed as long as they go through the following DEX Programs:

| Project      | **Protocols** Program          |
| ------------ | ------------------------------ |
| Raydium      | RAYDIUM_AMM_PROGRAM            |
|              | RAYDIUM_CONCENTRATED_LIQUIDITY |
|              | RAYDIUM_CPMM                   |
|              | RAYDIUM_LIQUIDITY_POOL_V4      |
|              | BONK_SWAP_PROGRAM              |
| Meteora      | METEORA_DLMM_PROGRAM           |
|              | METEORA_DAMM_V2_PROGRAM        |
|              | METEORA_DYN_PROGRAM            |
| Orca         | ORCA_PROGRAM                   |
| PumpFun      | PUMP_PROGRAM_ADDRESS           |
|              | PUMP_FUN_AMM_PROGRAM           |
| OBIC         | OBIC_V2_PROGRAM                |
| GuacSwap     | GUAC_SWAP_PROGRAM              |
| Sanctum      | SANCTUM_PROGRAM                |
|              | SANCTUM_SOL_VAULT_PROGRAM      |
|              | SANCTUM_ROUTER_PROGRAM         |
| Aldrin       | ALDRIN_AMM_V2_PROGRAM          |
| Step Finance | STEP_FINANCE_SWAP_PROGRAM      |
| SolFi        | SOLFI_PROGRAM                  |
| GoonFi       | GOONFI_PROGRAM                 |
| Stable       | STABLE_VAULT_AUTHORITY_1       |
|              | STABBLE_WEIGHTED_SWAP_PROGRAM  |
|              | STABLE_STABLE_SWAP_PROGRAM     |
| Invariant    | INVARIANT_SWAP_PROGRAM         |
| Saber        | SABER_STABLE_SWAP_PROGRAM      |
| Cropper      | CROPPER_WHIRLPOOL_PROGRAM      |
| ZeroFi       | ZEROFI_PROGRAM                 |
| OpenBook     | OPENBOOK_V2_PROGRAM            |
| OneDex       | ONEDEX_PROGRAM                 |
| Saros        | SAROS_AMM_PROGRAM              |
| Mercurial    | MERCURIAL_STABLE_SWAP_PROGRAM  |
| Tess         | TESS_UNKNOWN_PROGRAM           |
| Phoenix      | PHOENIX_PROGRAM                |

Other routes are passively monitored:

- We parsed routing transactions as long as the routes are present (though we do not know which aggregator it is).
- We detect MEV transactions, bot or routing transactions, recording of who initiated them, and applying appropriate labels.
