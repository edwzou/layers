### To create a certificate:
Run these commands in the terminal within this directory:\
`openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`
Make sure to have filled in data when prompted to (password can be anything)
then run:\
`openssl rsa -in keytmp.pem -out key.pem`

From the communal Drive, drag the env file in bottomLayer

Then you should be good to go!
