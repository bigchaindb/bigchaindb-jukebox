# BigchainDB Jukebox

The Jukebox is a pay-as-you-stream demo for mediastreams using micropayments 

## Getting started

Only works with python3.4+, node v6.2.2

Install the requirements
```bash
$ npm install
$ pip install -r server/requirements.txt
```

Make sure that rethinkdb and bigchaindb is configured and initalized
```bash
$ bigchaindb configure
$ bigchaindb init
```

Start all services
```bash
$ python -m server.serve
```

In a new console start node
```bash
$ npm start
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

## Test sending between ledgers
In a new console run the following script
```bash
$ ./node_modules/.bin/babel-node scripts/send.js 
```

