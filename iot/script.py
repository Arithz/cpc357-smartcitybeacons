import pymongo
import paho.mqtt.client as mqtt
from datetime import datetime, timezone
import json

# MongoDB configuration
mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["smart-streetlight"]
collection = db["iot"]

# MQTT configuration
mqtt_broker_address = "34.56.242.216"
mqtt_topic = "iot"

# Define the callback function for connection
def on_connect(client, userdata, flags, reason_code, properties):
  if reason_code == 0:
    print("Successfully connected")
    client.subscribe(mqtt_topic)

# Define the callback function for ingesting data into MongoDB
def on_message(client, userdata, message):
  payload = message.payload.decode("utf-8")
  print(f"Received message: {payload}")

  # Convert MQTT timestamp to datetime
  timestamp = datetime.now(timezone.utc)
  datetime_obj = timestamp.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

  # Process the payload and insert into MongoDB with proper timestamp
  try:
    # Parse the payload as JSON
    payload_data = json.loads(payload)

    # Extract the inner 'data' and spread it directly into the 'data' field
    if 'data' in payload_data:
      document = {
          "timestamp": datetime_obj,
          "data": payload_data["data"]  # Directly assign the inner 'data'
      }
      collection.insert_one(document)
      print("Data ingested into MongoDB")
    else:
      print("No 'data' field found in payload")

  except Exception as e:
    print(f"Error processing message: {e}")
  

# Create an MQTT client instance
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

# Attach the callbacks using explicit methods
client.on_connect = on_connect
client.on_message = on_message

# Connect to the MQTT broker
client.connect(mqtt_broker_address, 1883, 60)

# Start the MQTT loop
client.loop_forever()