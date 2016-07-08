# Pay-As-You-Stream Platform

## Getting started

Only works with python3.4+, node v6.2.2

Install the requirements
```bash
$ npm install
$ cd server
$ pip install -r requirements.txt
```

In console 1 start bigchaindb
```bash
$ bigchaindb start
```

In console 2 start http server
```bash
$ cd public
$ python -m http.server
```

In console 3 start tornado
```bash
$ cd server
$ python tornado_server.py
```

In console 4 start five-bells-ledger
```bash
$ ./node_modules/.bin/babel-node ledger/five_bells.js
```

Point the browser to `http://localhost:8000/jukebox.html`

Inside a python shell mint and send coins to the jukebox
```bash
$ cd server
```
```python
from bigchaindb import crypto
from stream_coin import *

# create a user
user_sk, user_vk = crypto.generate_key_pair()

# mint coins for the user
mint_coin(user_vk)
mint_coin(user_vk)

# after the transactions go through retrieve the coins
get_owned_coins(user_vk).keys()
dict_keys(['59bf7fc3-777a-4c80-8d4a-dc742a940799','821112aa-8b2e-4978-83cf-b0a1c82aa6f4'])

# transfer a coin to the jukebox
transfer_coin(user_vk, user_sk, '59bf7fc3-777a-4c80-8d4a-dc742a940799')
```
