INSERT INTO devices (name, type, location)
VALUES
  ('Temperature Sensor 01', 'temperature', 'Server Room'),
  ('Humidity Sensor 01', 'humidity', 'Greenhouse');

INSERT INTO readings (device_id, value)
VALUES
  (1, 22.5),
  (2, 58.0);
