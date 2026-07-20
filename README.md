# Using the AggreGATOR

### Installation Instructions
* install postgresql on your local machine (linux: sudo apt update sudo apt install postgresql postgresql-contrib)
* start postgres in the background: sudo service postgresql start
* create an empty database and make note of the connection URL
* create a .gatorconfig file with the db_url string.
### Commands
* **register [username]**: registers a new local user
* **login [username]**: login as an existing user
* **users**: list all current users
* **addfeed [feed Title] [url]**: add a new feed
* **follow [url]**: follow an already created feed as the current user
* **unfollow [url]**: stop following a url
* **following**: list all currently following feeds for the current user
* **agg [time_between_collection_between_5s_and_24h]**: scrape feeds for new posts continuously based on the provided time interval
* **feeds**: print details about all feeds a user follows
* **browse <number of feeds>**: show the newest 2 posts from the current users feeds.  Optionally show more or fewer posts.