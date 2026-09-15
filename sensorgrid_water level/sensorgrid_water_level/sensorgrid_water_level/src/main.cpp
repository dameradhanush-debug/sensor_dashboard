#include <Arduino.h>

// HC-SR04 connections: TRIG -> GPIO 5, ECHO -> GPIO 18
const int TRIG_PIN = 5;
const int ECHO_PIN = 18;
const float TANK_HEIGHT_CM = 30.0;

float getDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  const unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return -1.0;
  return (duration * 0.0343) / 2.0;
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.println("HC-SR04 Water Level Monitoring");
}

void loop() {
  const float distance = getDistanceCm();

  if (distance < 0) {
    Serial.println("Sensor timeout - check HC-SR04 wiring.");
    delay(1000);
    return;
  }

  // Water level = tank height - air distance from sensor to water surface.
  const float waterLevel = constrain(TANK_HEIGHT_CM - distance, 0.0, TANK_HEIGHT_CM);
  const float percentage = (waterLevel / TANK_HEIGHT_CM) * 100.0;

  Serial.print("Distance: ");
  Serial.print(distance, 2);
  Serial.println(" cm");
  Serial.print("Water level: ");
  Serial.print(waterLevel, 2);
  Serial.println(" cm");
  Serial.print("Percentage: ");
  Serial.print(percentage, 2);
  Serial.println(" %");

  if (percentage < 30) {
    Serial.println("Status: LOW");
  } else if (percentage <= 80) {
    Serial.println("Status: NORMAL");
  } else {
    Serial.println("Status: HIGH");
  }

  Serial.println("------------------------------");
  delay(1000);
}
