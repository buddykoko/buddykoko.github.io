# ProfitProphet MoneyMachine

Live-capable Solana meme-coin bot control center with Practice Mode, Paper Trading, Live Wallet Mode, configurable risk modes, attribution, backtesting, and beginner-friendly dashboard controls.

## Quick Start

Run these commands from this folder:

```powershell
python -m pip install -r requirements.txt
python run_bot.py
```

Open the dashboard:

```text
http://127.0.0.1:8780/
```

Recommended first run:
1. Open the dashboard.
2. Keep **Practice Mode** selected.
3. Use **Medium Risk**.
4. Click **Run Safety Check**.
5. Click **Start Bot**.

## Dashboard Flow

The default Beginner View is organized as a guided control center:
1. Understand whether the bot is running.
2. Choose Practice, Paper Trading, or Live Wallet Mode.
3. Choose Low, Medium, High, or Extreme Risk.
4. Add or check API keys.
5. Run the safety check.
6. Start or stop the bot.
7. Use **Why No Trades?** to understand rejected candidates.

Advanced View keeps the expert controls available for risk settings, strategy toggles, discovery/API health, backtesting, logs, diagnostics, and attribution.

## Modes

### Practice Mode

Practice Mode uses fake money and simulated market behavior. It does not need API keys, wallet secrets, SOL, or USDC. Start here first.

### Paper Trading

Paper Trading uses live market data where available but simulates orders without signing or submitting transactions. A Jupiter API key improves quote quality, but Paper Mode can still run in limited/estimated mode without one.

### Live Wallet Mode

Live Wallet Mode can use real funds. It requires a proper wallet secret, RPC access, Jupiter setup, SOL for fees, and USDC for buys. The dashboard shows strong warnings and live-mode safety floors remain active even if High or Extreme Risk is selected.

Use Practice and Paper Mode before using Live Wallet Mode.

## Jupiter API Key

Paste the raw Jupiter key only. Do not paste `Bearer ...`, quotes, or extra spaces. If the key is missing, Practice Mode still works and Paper Mode can run with limited or estimated data.

## Risk Modes

- **Low Risk**: strict filters, small trades, fewer positions, lower slippage, lower loss limits.
- **Medium Risk**: balanced default and the recommended starting point.
- **High Risk**: more simulated trades with looser filters. Best used in Paper Mode first.
- **Extreme Risk**: aggressive stress testing. Paper Mode is strongly recommended; Live Wallet Mode remains capped by safety floors.

Use **Apply Risk Mode** to load preset values, **Save Custom Risk Settings** to persist non-secret overrides, and **Reset to Preset** to discard manual edits.

## Secrets and Runtime Files

Wallet secrets, private keys, Jupiter keys, Birdeye keys, Helius keys, and X bearer tokens are session-only. They are intentionally not written to saved dashboard settings or runtime state files.

Ignored local files include:
- `.env`
- `local_keys.json`
- `runtime/`
- `__pycache__/`
- `.pytest_cache/`
- `*.pyc`
- `*.log`
- `*.zip`

## Backtesting and Reports

The dashboard includes backtest tools and generated stress scenarios. Use Advanced View for deeper backtest, discovery, diagnostics, and attribution panels.

Safe exports:
- Paper report excludes wallet secrets and API keys.
- Debug report is redacted and excludes private keys, raw secret files, and unsafe runtime artifacts.

## Local Verification

Run:

```powershell
python -m pytest
python run_bot.py
```

Then open:

```text
http://127.0.0.1:8780/
```

## Live Trading Warning

This is live-capable trading software. Meme-coin trading is highly speculative. Live Wallet Mode can lose real money quickly. Start with Practice Mode, then Paper Trading, then use small Live Wallet sizes only after you understand the controls and risks.
