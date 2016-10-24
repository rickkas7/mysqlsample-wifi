# mysqlsample-wifi
*Particle Photon sample for saving data with node.js and mysql using local Wi-Fi only (no cloud)*

This is a very simple example application for storing data in a local database using Node.js using only the local Wi-Fi network, not using the cloud. 

You may prefer to use the [other example using the cloud] instead which also works with the Electron and through firewalls without 

The idea is that your Particle Photon or Electron is generating data. This example only uses local Wi-Fi and does not require an Internet or a cloud connection, which may be helpful in some applications.

This example uses MySQL as the database because that's what was originally asked for in the [Particle Community Forum post] (https://community.particle.io/t/https-post-to-mysql-on-localhost/25545) but it might be even easier to use something like CouchDB or Mongo.

The code should be self-explanatory. The .cpp file is the code you flash to your Photon or Electron. It just generates random data; presumably you would normally use a sensor or something.

The mysqlwifi.js file contains the code. Make sure you follow the instructions to install the additional npm packages you need.

Also, edit the config.js file to contain your MySQL database name and credentials!



