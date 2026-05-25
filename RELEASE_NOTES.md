# Release Notes

## Current Official Build

This release stabilizes the current ProfitProphet MoneyMachine build for GitHub distribution. It keeps the existing Flask dashboard, Practice Mode, Paper Trading, Live Wallet Mode, configurable risk modes, attribution, backtesting, safety checks, and beginner-friendly dashboard flow.

## What Changed

- Verified the full pytest suite.
- Verified the Flask dashboard boots at `http://127.0.0.1:8780/`.
- Verified the main dashboard backend workflow routes for settings, readiness checks, safety checks, start/stop, risk mode apply, Jupiter market-data test, paper watchlist seed, paper report, debug report, and backtest sample.
- Tightened `.gitignore` for secrets, runtime files, caches, logs, ZIPs, and backup files.
- Replaced the README with a clean release quick-start and safety-focused operating guide.
- Added these release notes for the official GitHub-ready version.

## Current Features

- Beginner-first dashboard with guided mode/risk/start workflow.
- Practice Mode with no credential requirements.
- Paper Trading with live-market data where available and estimated fills when credentials are missing.
- Live Wallet Mode with real-money warnings and hard safety floors.
- Low, Medium, High, and Extreme Risk presets with editable advanced settings.
- Why No Trades panel with plain-English rejection explanations.
- Jupiter, DEX Screener, Birdeye, watchlist, cache, and proxy-social discovery support.
- Attribution, telemetry, SQLite storage, paper reports, debug exports, and backtesting tools.
- Secret redaction and session-only handling for wallet/API secrets.

## How To Run

```powershell
python -m pip install -r requirements.txt
python run_bot.py
```

Then open:

```text
http://127.0.0.1:8780/
```

## Known Limitations

- Paper Mode without API keys uses limited public/cached data and estimated fills.
- Jupiter status can show missing or degraded when no API key is configured; Practice Mode still works.
- Live Wallet Mode requires correct wallet, RPC, SOL, USDC, and Jupiter setup.
- In-app browser smoke testing may be blocked by local browser policy even when the Flask app responds successfully to local HTTP checks.
- Backtests and simulations are useful for tuning, but they cannot guarantee live performance in fast meme-coin markets.

## Future Improvement Targets

- Deeper real-market historical dataset support.
- More exchange/RPC provider health comparisons.
- Longer-running soak tests for dashboard worker behavior.
- Expanded visual regression checks for the dashboard.
