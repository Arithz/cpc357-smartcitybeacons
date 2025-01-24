#include <PubSubClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include "DHT.h"
#define DHTTYPE DHT11

// Define used pin
const int pirPin = 14;  // PIR sensor pin
const int ledPinG = 19; // Green LED pin
const int ledPinR = 18; // Red LED pin
const int tempPin = 17; // DHT11 sensor pin
const int rainDigitalPin = 21; // Raindrop digital pin
const int ledTiming = 10 * 1000; // LED on time in milliseconds

// Define MQTT setup
const char* WIFI_SSID = "WIFI_SSID"; // Your WiFi SSID
const char* WIFI_PASSWORD = "WIFI_PASSWORD"; // Your WiFi password
const char* MQTT_SERVER = "35.222.128.220"; // Your VM instance public IP address
const char* MQTT_TOPIC = "iot"; // MQTT topic for subscription
const int MQTT_PORT = 1883; // Non-TLS communication port
char buffer[256] = ""; // Text buffer

DHT dht(tempPin, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

volatile bool motionDetected = false; // Flag for motion detection
unsigned long motionStartTime = 0;    // Track when motion was detected
bool isLightOn = false;               // Track LED state
bool isMotionTracked = false;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void IRAM_ATTR turnLightOn() {
  motionDetected = true; // Set motion flag
  isMotionTracked = true;
}

void setup() {
  Serial.begin(9600);

  // Initialize pins
  pinMode(pirPin, INPUT);
  pinMode(rainDigitalPin, INPUT);
  pinMode(ledPinG, OUTPUT);
  pinMode(ledPinR, OUTPUT);

  // Initialize components
  digitalWrite(ledPinG, LOW);
  digitalWrite(ledPinR, LOW);
  dht.begin();
  setup_wifi(); // Connect to the WiFi network
  client.setServer(MQTT_SERVER, MQTT_PORT); // Set up the MQTT client

  // Attach interrupt for PIR motion detection
  attachInterrupt(digitalPinToInterrupt(pirPin), turnLightOn, RISING);
}

void loop() {

  if(!client.connected()) {
    reconnect();
  }

  client.loop();

  // Check temperature
  float temperature = dht.readTemperature();

  // Check raindrop sensor readings
  int rainDigital = digitalRead(rainDigitalPin);
  int motion = digitalRead(pirPin);

  // Count active LEDs
  int activeLEDs = 0;
  if (digitalRead(ledPinG) == HIGH) activeLEDs++;
  if (digitalRead(ledPinR) == HIGH) activeLEDs++;

  // Prepare JSON object
  StaticJsonDocument<200> doc; // Adjust size as needed
  JsonObject data = doc.createNestedObject("data");
  data["temperature"] = temperature;
  data["motion_detected"] = (millis() - motionStartTime <= ledTiming) && isMotionTracked ? 1 : 0;
  data["is_raining"] = (rainDigital == LOW) ? 1 : 0;
  data["active_led"] = activeLEDs;

  // Serialize JSON to string
  serializeJson(doc, buffer);
  client.publish(MQTT_TOPIC, buffer);
  Serial.println("Published to MQTT:");
  Serial.println(buffer);

  // Handle motion detection
  if (motionDetected) { // Reevaluate even if already on
    motionStartTime = millis(); // Update motion start time
    motionDetected = false; // Reset motion flag

    // Evaluate conditions for turning on LEDs
    if (temperature < 26.5) {
      if (rainDigital == LOW) { // Wet condition
        digitalWrite(ledPinG, HIGH);
        digitalWrite(ledPinR, HIGH);
      } else { // Dry condition
        digitalWrite(ledPinG, HIGH);
        digitalWrite(ledPinR, LOW);
      }
      isLightOn = true;
    } else {
      digitalWrite(ledPinG, LOW);
      digitalWrite(ledPinR, LOW);
      isLightOn = false;
    }
  }

  // Turn off LEDs after the specified duration if no further motion is detected
  if (isLightOn && (millis() - motionStartTime >= ledTiming)) {
    if (digitalRead(pirPin) == LOW) { // Recheck motion
      digitalWrite(ledPinG, LOW);
      digitalWrite(ledPinR, LOW);
      isLightOn = false;
      isMotionTracked = false;
    } else {
      // Extend light duration if motion persists
      motionStartTime = millis();
    }
  }

  // Small delay for smoother execution
  delay(1000);
}

void reconnect() {
  while (!client.connected())
  {
    Serial.println("Attempting MQTT connection...");

    if(client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT server");
    }

    else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
} 
