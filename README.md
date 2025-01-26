# Smart Streetlight System

The **Smart Streetlight System** is an IoT-based solution designed to optimize energy consumption and enhance road safety. It dynamically adjusts streetlight intensity based on real-time data from motion and weather sensors.

---

## Features

- **Dynamic Lighting Control**: Adjusts LED intensity based on motion and environmental conditions (e.g., rain, fog).
- **Energy Efficiency**: Reduces unnecessary energy consumption through adaptive lighting.
- **Real-Time Monitoring**: Provides real-time data on system health, energy usage, and traffic patterns.
- **Dashboard Analytics**: Accessible admin dashboard to visualize performance metrics.
- **Secure Authentication**: Protected with JSON Web Tokens (JWT) for admin-only access.

---

## Hardware Components

| Component                     | Quantity |
| ----------------------------- | -------- |
| PIR Sensor                    | 1 unit   |
| DHT11 Sensor                  | 1 unit   |
| Raindrop Sensor               | 1 unit   |
| LED                           | 2 units  |
| ESP32 Microcontroller         | 1 unit   |
| Male-to-Male Jumper Wires     | 6 units  |
| Male-to-Female Jumper Wires   | 9 units  |
| Female-to-Female Jumper Wires | 2 units  |
| Resistors                     | 2 units  |

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (https://nodejs.org)
- **npm** (comes with Node.js installation)

---

## Getting Started

1. Clone the repository
2. Install the dependencies for the frontend

```bash
npm install
```

3. Run the frontend

```bash
npm run dev
```

4. Install the dependencies for the backend

```bash
cd backend
npm install
```

5. Run the backend

```bash
npm run dev
```
