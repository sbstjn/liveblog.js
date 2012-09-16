# liveblog.js

Node.js page for covering events with single site live blogging

### Installation

```bash
git clone https://github.com/semu/liveblog.js.git
cd liveblog.js
npm install
```

### Configure Ports

Use custom port for HTTP and WebSocket

```bash
PORT=8080 PORT_SOCKET=8090 node app.js
```

Use same custom port for HTTP and WebSocket

```bash
PORT=8080 node app.js
```

Use default/fallback port 3000 for HTTP and WebSocket

```bash
node app
```

### Managing Users

Users are stored within the `users` file. When adding new users you have to resert liveblog.js!

```bash
echo NAME:`echo -n "PASS" | md5` >> users
```

for example:

```bash
echo semu:`echo -n "lorem123" | md5` >> users
```