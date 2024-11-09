# SONIC TX BOT

Sonic TX bot for adding more tx on chain

## BOT FEATURE

- Support PK and SEED
- Proxy Support
- Auto Check In
- Auto TX until 100 Times
- Auto Claim TX Milestone
- Auto Opening Mystery Box
- Support on testnet-v1

## PREREQUISITE

```
sudo apt update && apt upgrade -y
sudo apt install git
sudo apt install screen
sudo apt remove nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
nvm install 22.9.0
nvm use 22.9.0
nvm alias default 22.9.0
```

## SETUP

**1. Run:
```
git clone https://github.com/cjmahdi2/sonic-tx-bot.git
cd sonic-tx-bot
npm install
cp account_tmp.js account.js && cp proxy_list_tmp.js proxy_list.js
```

**2. Fill up:
- fill up account.js `nano account.js` fill with your account private key
- fill up proxy_list.js `nano proxy_list.js` fill with your proxy list
  
**3. Run:
```
screen -S Sonic_Bot_FrontierV1
npm run start
```
Then take Ctrl + A then D to leave the Screen



----------------------------------------------------------------------------------
## HOW TO UPDATE

to update just run `git pull` or if it failed because of unstaged commit, just run `git stash` and then `git pull`. after that do `npm install` or `npm update`.

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks.

## NOTE

Bot running using twister, so if you run multiple account maybe some account not showed on your terminal because it depens on your windows screen, but it still running. you can check on `app.log`.

## SUPPORT

want to support me for creating another bot ?
buy me a coffee on

EVM : `0x3437ac293296C43174278D90Ba08B25B36167aca`

SOLANA : `DhvXt1hSvkhMwyVvPVwTF5ge1qgKT1sHgnknS4wtnLsG`
