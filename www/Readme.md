Turned on:

    "development": {
        "tags": [
            // You can add this tag to enable Fashion when using app watch or
            // you can add "?platformTags=fashion:1" to the URL to enable Fashion
            // without changing this file.
            //
            "fashion"
        ]
    },
    
Also added a `js` entry:

        {
            "path" : "http://localhost:3000/socket.io/socket.io.js",
            "remote" : true,
            "bootstrap" : true
        }