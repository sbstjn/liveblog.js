liveblog.js
===========

Node.js page for covering events with single site live blogging

usage
=====

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
