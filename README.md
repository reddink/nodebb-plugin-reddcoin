# NodeBB Reddcoin Tipping Plugin 

This repo serves as a staging ground for the nodebb reddcoin tipping plugin.

## Purpose

I wanted to create an easy method for users of nodebb to be able to tip each other.
This can be seen in action on [Reddcointalk](https://www.reddcointalk.org/)

Presently it uses the [BIP 21](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) to launch either:
[Reddcoin Browser Wallet - Chrome App plugin](https://chrome.google.com/webstore/detail/reddcoin-browser-wallet-b/alaadmjkbkmkhgdefdfeogneooblledf)

or

[Official QT Wallet](https://wallet.reddcoin.com/)
in order to transfer an amount of Reddcoin directly using your wallet, rather than relying on a 'tipbot'


## Installation

requires min nodeBB 0.6.0

git clone https://github.com/reddink/nodebb-plugin-reddcoin
cp nodebb-plugin-reddcoin ./nodebb/node_modules/

(have not yet submitted to NPM repo >> npm install nodebb-plugin-reddcoin)

goto the nodebb Admin

General reload

EXTEND

Plugins

Activate nodebb-plugin-reddcoin

