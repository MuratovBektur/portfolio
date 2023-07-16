## Before FIRST launching into production mode
1) Delete cerbot folder (nginx/certbot) if it exists
2) Change nginx settings to work only in http1 mode in nginx/prod/config.conf file (you can comment 5-18 line)
3) Run app with command "./restart"
4) Change the "server_name" field in nginx/prod to your domain names and and after the path /etc/letsencrypt/live/ to the ssl_certificate field and ssl_certificate_key field
5) Change the "init-letsencrypt.sh" file where you must change the "domains" field to your domain names and change the email field to your email
6) Run the command "./init-letsencrypt.sh" 
7) Revert old nginx settings with http 2.0 mode in nginx/prod/config.conf file
8) Run app with command "./restart"