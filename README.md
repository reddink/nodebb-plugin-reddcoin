# NodeBB Reddcoin Tipping Plugin 

This repo serves as a staging ground for the nodebb reddcoin tipping plugin.

## Purpose

The purpose of this plugin is to create an easy method for users of nodebb to be able to tip each other.
If you would like to see this in action, you can view at [Reddcointalk](https://www.reddcointalk.org/)

Presently it uses the [BIP 21](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) to launch one of the following wallets:

* [Reddcoin Browser Wallet - Chrome App plugin](https://chrome.google.com/webstore/detail/reddcoin-browser-wallet-b/alaadmjkbkmkhgdefdfeogneooblledf)
* [Official QT Wallet](https://wallet.reddcoin.com/)
* [Coinomi Android Wallet](https://coinomi.com/)

This allows the transfer of any amount of Reddcoin directly using your wallet, rather than relying on a 'tipbot'


## Installation

requires min nodeBB 0.6.0

The latest released version is available on NPM and can be downloaded within the Admin panel

Alternative if you want to experiment with more recent version you can access directly from GitHub

git clone https://github.com/reddink/nodebb-plugin-reddcoin

cp nodebb-plugin-reddcoin ./nodebb/node_modules/

goto the nodebb Admin

General reload

EXTEND

Plugins

Activate nodebb-plugin-reddcoin

