# San Mateo Church App

This repository contains the **San Mateo Church App**, a mobile application designed to enhance community engagement, provide church-related resources, and streamline communication for the San Mateo Church community.

## Features

- **Event Management**: View upcoming church events and RSVP.
- **Prayer Requests**: Submit and view prayer requests.
- **Media**: View recorded sermons.
- **Announcements**: Stay updated with the latest church news.
- **Donation Integration**: Support the church through secure online donations.
- **User Authentication**: Secure login and registration for members.

## File Structure

```
sm-church-app/
├── components/           # Reusable UI components
├── screens/              # Application screens
├── navigation/           # Navigation configuration
├── services/             # API and backend services
├── utils/                # Utility functions
|── assets/               # Images, fonts, and other static assets
├── tests/                # Unit and integration tests
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Tech Stack

The project leverages the following technologies:

- **Frontend**: React Native
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Backend**: Firebase (Authentication, Firestore, and Cloud Functions)
- **Styling**: Tamagui UI
- **Testing**: Jest and React Native Testing Library
- **Build Tools**: Expo CLI

### Key Dependencies (from `package.json`)

- `react-native`
- `expo`
- `zustand`
- `react-navigation`
- `firebase`
- `tamagui`
- `jest`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sm-church-app.git
   cd sm-church-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   expo start
   ```

4. Scan the QR code with the Expo Go app to run the app on your device.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) and adhere to the code of conduct.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please contact the project maintainers at **sanmateochurch@example.com**.
