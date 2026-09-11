#include <Arduino.h>

// ===============================
// PIN DEFINITIONS
// ===============================

#define TRIG_PIN 5
#define ECHO_PIN 18

#define GREEN_LED 25
#define YELLOW_LED 26
#define RED_LED 27

#define BUZZER_PIN 23

// ===============================
// TANK SETTINGS
// ===============================

const float TANK_HEIGHT = 100.0;

// ===============================
// SETUP
// ===============================

void setup()
{
    Serial.begin(115200);

    // HC-SR04
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);

    // LEDs
    pinMode(GREEN_LED, OUTPUT);
    pinMode(YELLOW_LED, OUTPUT);
    pinMode(RED_LED, OUTPUT);

    // Buzzer
    pinMode(BUZZER_PIN, OUTPUT);

    // Initial state
    digitalWrite(TRIG_PIN, LOW);

    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, LOW);

    noTone(BUZZER_PIN);

    Serial.println();
    Serial.println("======================================");
    Serial.println("      SensorGrid Water Level");
    Serial.println("          ESP32 Project 1");
    Serial.println("======================================");
    Serial.println();

    delay(1000);
}

// ===============================
// MEASURE DISTANCE
// ===============================

float measureDistance()
{
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);

    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);

    digitalWrite(TRIG_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH, 30000);

    if (duration == 0)
    {
        return -1;
    }

    float distance = duration * 0.0343 / 2.0;

    return distance;
}

// ===============================
// WATER LEVEL
// ===============================

float calculateWaterLevel(float distance)
{
    float waterLevel = TANK_HEIGHT - distance;

    if (waterLevel < 0)
    {
        waterLevel = 0;
    }

    if (waterLevel > TANK_HEIGHT)
    {
        waterLevel = TANK_HEIGHT;
    }

    return waterLevel;
}

// ===============================
// WATER PERCENTAGE
// ===============================

float calculatePercentage(float waterLevel)
{
    return (waterLevel / TANK_HEIGHT) * 100.0;
}

// ===============================
// LED + BUZZER CONTROL
// ===============================

void updateIndicators(float percentage, float distance)
{
    // Turn everything OFF first
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, LOW);
    digitalWrite(RED_LED, LOW);

    noTone(BUZZER_PIN);

    if (percentage > 80)
    {
        digitalWrite(GREEN_LED, HIGH);

        Serial.println("Status      : HIGH");
        Serial.println("BUZZER      : OFF");
    }

    else if (percentage >= 30)
    {
        digitalWrite(YELLOW_LED, HIGH);

        Serial.println("Status      : NORMAL");
        Serial.println("BUZZER      : OFF");
    }

    // -------------------------------
    // LOW
    // -------------------------------

    else
    {
        digitalWrite(RED_LED, HIGH);

        Serial.println("Status      : LOW");
        Serial.println("BUZZER      : OFF");
    }
}

// ===============================
// MAIN LOOP
// ===============================

void loop()
{
    float distance = measureDistance();

    // Sensor error
    if (distance < 0)
    {
        Serial.println("ERROR: Ultrasonic sensor timeout");

        noTone(BUZZER_PIN);

        delay(2000);
        return;
    }

    // Calculate water level
    float waterLevel = calculateWaterLevel(distance);

    // Calculate percentage
    float percentage = calculatePercentage(waterLevel);

    // Serial output
    Serial.println("--------------------------------------");

    Serial.print("Distance    : ");
    Serial.print(distance, 2);
    Serial.println(" cm");

    Serial.print("Water Level : ");
    Serial.print(waterLevel, 2);
    Serial.println(" cm");

    Serial.print("Percentage  : ");
    Serial.print(percentage, 2);
    Serial.println(" %");

    // Control LEDs and buzzer
    updateIndicators(percentage, distance);

    Serial.println("--------------------------------------");

    delay(1000);
}