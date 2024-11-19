# SONIC TX BOT

Sonic TX bot for adding more tx on chain

## BOT FEATURE

- Support on Testnet-v1
- Support PrivetKey
- Proxy Support
- Auto Check In
- Auto TX until 100 Times
- Auto Claim TX Milestone
- Auto Opening Mystery Box
- Auto Run Every Day

## Prerequisites

How many solona Wallets should you make, preferably with a backpack wallet...
 
**Site link:**

https://odyssey.sonic.game/?join=PDfJoX

Log in to the site And Get faucet for them here:

https://faucet.sonic.game/#/?network=testnet.v1

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

Note1: It is not necessary to use a proxy and you can leave the `proxy_list.js` file empty.
But if you want to use a proxy, you must add a proxy to the number of wallets in the file!

Note2: You can use Free Proxy List:

https://raw.githubusercontent.com/cjmahdi2/sonic-tx-bot/refs/heads/master/Active_proxies.txt


**3. Run:
```
screen -S Sonic_Bot_FrontierV1
```
```
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

EVM : `0x83F129E662B21cF035bc9510f65eb29C75b69155`

SOLANA : ``
