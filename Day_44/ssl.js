//what is SSL? and TSL?
//SSL stands for Secure Sockets Layer. It is a standard security technology for establishing an encrypted link between a web server and a web browser. This link ensures that all data passed between the web server and browser remains private and secure. SSL is commonly used to protect sensitive information such as credit card numbers, personal information, and login credentials when transmitted over the internet. Websites that use SSL have URLs that start with "https://" instead of "http://".
//TLS stands for Transport Layer Security. It is a cryptographic protocol that provides secure communication over a computer network. TLS is the successor to SSL and is more secure than its predecessor. Like SSL, TLS is used to encrypt data transmitted over the internet, ensuring that it remains private and secure. TLS is commonly used in web browsers, email clients, and other applications that require secure communication. Websites that use TLS also have URLs that start with "https://".
//generating SSL certificate you can use openssl command line tool to generate a self-signed SSL certificate for testing purposes. Here are the steps to generate an SSL certificate using openssl:

//1. Open a terminal or command prompt.
//2. Run the following command to generate a private key and a self-signed certificate:
//openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
//This command will generate a private key (key.pem) and a self-signed certificate (cert.pem) that is valid for 365 days. You will be prompted to enter some information about the certificate, such as the country, organization, and common name (domain name).
//3. After running the command, you will have two files: key.pem (the private key) and cert.pem (the self-signed certificate). You can use these files to enable SSL/TLS on your web server or application for testing purposes. Note that self-signed certificates are not trusted by browsers and will show a warning message, so they should only be used for testing and development. For production use, you should obtain a certificate from a trusted Certificate Authority (CA).   
//creating self-signed certificate for mongodb
//1. Open a terminal or command prompt.
//2. Run the following command to generate a private key and a self-signed certificate for MongoDB:
//openssl req -newkey rsa:4096 -nodes -keyout mongodb.key -x509 -days 365 -out mongodb.crt
//This command will generate a private key (mongodb.key) and a self-signed certificate (mongodb.crt) that is valid for 365 days. You will be prompted to enter some information about the certificate, such as the country, organization, and common name (domain name).
//3. After running the command, you will have two files: mongodb.key (the private key) and mongodb.crt (the self-signed certificate). You can use these files to enable SSL/TLS on your MongoDB server for testing purposes. Note that self-signed certificates are not trusted by clients and will show a warning message, so they should only be used for testing and development. For production
//combining the private key and certificate into a single file
//1. Open a terminal or command prompt.
//2. Run the following command to combine the private key and certificate into a single file:
//cat mongodb.key mongodb.crt > mongodb.pem
//This command will create a new file called mongodb.pem that contains both the private key and the self-signed certificate. You can use this file to enable SSL/TLS on your MongoDB server for testing purposes. Note that self-signed certificates are not trusted by clients and will show a warning message, so they should only be used for testing and development. For production use, you should obtain a certificate from a trusted Certificate Authority (CA).
// enabling SSL/TLS on MongoDB server
//1. Open the MongoDB configuration file (mongod.conf) in a text editor.
//2. Add the following lines to the configuration file to enable SSL/TLS:  
//net:
//  ssl:
//    mode: requireSSL
//    PEMKeyFile: /path/to/mongodb.pem
//3. Save the configuration file and restart the MongoDB server for the changes to take effect. Note that you will need to specify the path to the mongodb.pem file that you created earlier. After enabling SSL/TLS, clients will need to use the appropriate connection string to connect securely to the MongoDB server. For example, if you are using the MongoDB shell, you can use the following command to connect securely:
//mongo --ssl --sslCAFile /path/to/mongodb.crt --host <hostname> --port <port> -u <username> -p <password>    
//This command will connect to the MongoDB server securely using SSL/TLS. Note that you will need to specify the path to the mongodb.crt file that you created earlier, as well as the hostname, port, username, and password for your MongoDB server.  
//Encryption at rest
//Encryption at rest refers to the practice of encrypting data that is stored on disk or other storage media. This is done to protect sensitive data from unauthorized access in the event that the storage media is lost, stolen, or compromised. Encryption at rest can be implemented using various encryption algorithms and techniques, such as AES (Advanced Encryption Standard) or RSA (Rivest-Shamir-Adleman). By encrypting data at rest, organizations can ensure that even if the physical storage media is accessed by unauthorized individuals, the data remains protected and unreadable without the proper decryption keys. 
