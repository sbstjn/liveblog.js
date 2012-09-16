# liveblog.js

Work-in-progress Node.js application for creating *Live Event Coverages* with Express.js and Socket.IO. Create your own Liveblog/Ticker within seconds and stream new posts to your clients using Web Sockets. 

**Warning:** Work-in-Progress! Authentication is missing and some bugs when switching post order!

### Installation

Just clone the GitHub repository and install all needed dependencies using `npm`

```bash
git clone https://github.com/semu/liveblog.js.git
cd liveblog.js
npm install
```

**liveblog.js** stores all posts as single files within the `posts` folder, no database is needed for storage.

### Start liveblog.js

Use a custom port for each HTTP and Web Socket. This may be useful when using liveblog.js with nginx…

```bash
PORT=8080 PORT_SOCKET=8090 node app.js
```

Use the same custom port for HTTP and WebSocket (most common usage)

```bash
PORT=8080 node app.js
```

Use default/fallback port 3000 for HTTP and WebSocket

```bash
node app
```

### Add Users

Users are stored in the `users` file, just append your user accounts with

```bash
echo NAME:`echo -n "PASS" | md5` >> users
```
For example a user ***semu*** and password ***lorem123*** is added to the user accounts using:

```bash
echo semu:`echo -n "lorem123" | md5` >> users
```

When adding new users you have to resert liveblog.js!
