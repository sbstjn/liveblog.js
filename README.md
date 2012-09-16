# liveblog.js

Most live coverage sites are more than worse. **liveblog.js** is a Node.js Application using Express.js and Socket.IO for providing a simple and reliable plattform for **Live Event Coverages**. Create your own Liveblog withing seconds and stream new posts to your readers using modern Web Sockets…

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