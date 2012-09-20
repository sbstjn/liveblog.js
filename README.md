# liveblog.js

Node.js application for handling *Live Event Coverages* with Express.js and Socket.IO. Create your own Liveblog/Ticker within seconds and stream new posts to your clients using realtime Web Sockets. 

![Node.js Live Blogging system with Socket.IO and Express.JS](http://semu.mp/liveblog.png)

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

Users are stored in the `users` file, just append your user details with

```bash
echo NAME:`echo -n "PASS" | md5` >> users
```
For example a user ***semu*** and password ***lorem123*** is added to the user accounts using

```bash
echo semu:`echo -n "lorem123" | md5` >> users
```

Remember to restart liveblog.js after adding users!

## The MIT License (MIT)
Copyright 2012 semu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
