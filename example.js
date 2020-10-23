require('./static-file-server')(8080);
/* This is the same as 
const staticFileServer = require('./static-file-server');
staticFileServer(8080);

The module function can take 2 arguments, both of which are optional (and default to 8080 and the current directory respectively),

Argument 1 specifies what port to run on (by default it checks for the function argument, then it checks for process.env.PORT, and defaults to 8080)

Argument 2 specifies what directory the files should come from. So if you have some files in a directory public you can host them on the server with
require('./static-file-server')(8080, 'public');
This argument defaults to the current directory
*/