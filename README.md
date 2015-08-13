# pages-public-api
If you need a server to do public-facing things for you, add your code here! This express server will do whatever you can't do purely in client-side Javascript (i.e. CORS resource proxy stuff).

### How to run
1. Make sure you have npm (node) installed
2. Clone repo
3. `cd` to cloned directory, `npm install` to get dependencies.
4. Finally, `npm start` to get it running.

PagesPublicApi.json is a config file for logging to Sumo on the production box running this machine. You shouldn't need to modify it.

### Deploying
1. Put all files except node_modules/*, .gitignore, LICENSE, log files, config.js and this README into a zip titled pages-public-api-<today's date>
2. Create a directory with todays date in pages-public-api-deploys on the prod server
3. Copy the zip you just created to the directory you created (I use pscp)
4. Stop the old app by running `forever list`, get the pid id field and run `forever stop <pid id>`
5. Delete the public-pages-api directory and recreate it
6. Unzip your new code into this directory
7. Change directories to ~/pages-public-api 
8. Start the app by running `forever start ./bin/www`