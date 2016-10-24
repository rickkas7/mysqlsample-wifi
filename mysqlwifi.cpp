#include "Particle.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(MANUAL);

const unsigned long EVENT_PERIOD_MS = 10000;
IPAddress serverAddr = IPAddress(192, 168, 2, 4);
int serverPort = 7123;

unsigned long lastPublish = 0;
TCPClient client;

void setup() {
	Serial.begin(9600);
	WiFi.on();
	WiFi.connect();
}

void loop() {

	if (millis() - lastPublish >= EVENT_PERIOD_MS) {
		lastPublish = millis();

		if (WiFi.ready()) {
			if (!client.connected()) {
				client.connect(serverAddr, serverPort);
			}

			if (client.connected()) {
				char data[256];

				// Just a random value for testing. You might use a sensor value here instead
				int a = rand() % 65536;

				// Prepare a buffer with JSON data
				snprintf(data, sizeof(data), "{\"a\":%d}", a);

				// Send to the server. Send only a LF line terminator because it makes parsing easier
				// on the node.js side
				client.printf("%s\n", data);

				Serial.println(data);
			}
		}
	}
}
