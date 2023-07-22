## Before FIRST launching into production mode
1) Delete cerbot folder (nginx/certbot) if it exists
2) Change nginx settings to work only in http1 mode in nginx/prod/config.conf file (you can comment 5-18 line)
3) Run app with command "./restart"
4) Change the "server_name" field in nginx/prod/config.conf to your domain names and and after the path /etc/letsencrypt/live/ to the ssl_certificate field and ssl_certificate_key field
5) Change the "init-letsencrypt.sh" file where you must change the "domains" field to your domain names and change the email field to your email
6) Run the command "./init-letsencrypt.sh" 
7) Revert old nginx settings with http 2.0 mode in nginx/prod/config.conf file
8) Run app with command "./restart"

## Run in production mode
1) Create .prod.env file if it doesn't exist
2) Fill .prod.env file as .example.file file (API_KEY and SECRET_KEY variables your can get from https://app.mailjet.com/)
3) Run app with command "./restart"

## Run in development mode
1) Create .dev.env file if it doesn't exist
2) Fill .dev.env file as .example.file file (API_KEY and SECRET_KEY variables your can get from https://app.mailjet.com/)
3) Run app with command "./restart-dev"
