# HOW IT WORKS

We encode an encrypted string in the QR Code and save the plain one in the database. When the QR Code is scanned, we send that string to the server, which decrypts it with out secret and checks if it corresponds to the one we have in the database.

# TO-DO

[] - Make the cloudinary folder and qr codes accessible only to certain people I give access to it. 