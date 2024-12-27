This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Demo Video

Watch the demo of the app in action:

[![OptimalVid Demo](https://drive.google.com/file/d/1v7_lbHkirRE8MuGAx_MBiga1hZLAxmga/view?usp=sharing)]

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Project Overview

OptimalVid is a cross-platform mobile video streaming application built with React Native. The app enables users to:

- Browse a list of available videos.

- Search for specific videos by title.

- "Like" videos and view their liked videos in a separate tab.

- Play videos dynamically, with the ability to download one video for offline playback.

## Features

- Home Screen: Browse a list of videos with their thumbnails and descriptions.

- Search Functionality: Filter videos dynamically by entering search queries.

- Liked Videos: "Like" videos and save them persistently to AsyncStorage.

- Video Playback: Dynamically play videos with React Native Video Controls.

- Offline Playback: Download a video locally for offline viewing.

## Architecture

### Folder Structure

```
├── assets/                     # Static assets such as fonts and icons and json data
├── components/                 # Reusable UI components
│   ├── VideoCard.js
├── navigation/                 # Navigation setup
│   ├── AppNavigator.js
│   ├── BottomTabNavigator.js
├── screens/                    # Individual screens
│   ├── HomeScreen.js
│   ├── LikedVideosScreen.js
│   ├── SearchScreen.js
│   ├── VideoPlayerScreen.js
├── node_modules/               # Node dependencies
├── ios/                        # iOS-specific files and configurations
├── android/                    # Android-specific files and configurations
├── App.js                      # App entry point
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

## Key Libraries and Dependencies

- React Native Navigation: For managing navigation between screens.

- AsyncStorage: For persisting liked videos locally.

- React Native Video: For video playback.

- React Native Video Controls: To add customizable playback controls.

- React Native FS: For downloading videos locally

### Core Screens

1. `HomeScreen`:

- Displays a list of videos with options to "like" and navigate to the video player.

- Integrates AsyncStorage to persist liked videos.

2. `LikedVideosScreen`:

- Displays videos marked as liked by the user.

- Fetches liked video details from AsyncStorage.

3. `SearchScreen`:

- Allows dynamic searching of videos by title.

- Displays filtered results in real-time.

## Best Practices Followed

1. Separation of Concerns:

- Organized the project into dedicated folders for components, screens, and navigation.

2. Reusability:

- Created reusable components (e.g., VideoCard) for consistency and modularity.

3. Persistent Storage:

- Used AsyncStorage to ensure liked videos persist across app

##  Setup Instructions for OptimalVid

Follow these steps to set up and run the OptimalVid project locally:

### Prerequisites

1. Node.js: Ensure you have Node.js installed on your machine (version 14 or above recommended).

   Download from [Node.js Official Website](https://nodejs.org/en).
   
2. React Native CLI: Install React Native CLI globally.

   ```bash
   npm install -g react-native-cli
   ```
3. Xcode (macOS only): Required for iOS development. Install Xcode from the Mac App Store.
   
4. Android Studio: Required for Android development. Download and install from [Android Studio Official Website](https://developer.android.com/studio).
5. CocoaPods (macOS only): Ensure CocoaPods is installed for iOS dependencies.

   ```bash
   sudo gem install cocoapods
   ```

## Project Setup

### Step 1: Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Install Dependencies

Install all required project dependencies:

```bash
npm install
```

### step 3: Install iOS Pods (macOS only)

Navigate to the `ios` directory and install the necessary CocoaPods dependencies:

```bash
cd ios
npx pod-install
cd ..
```

## Runnig the App

### For iOS(macOS only)
Start the iOS simulator:

```bash
npm run ios
```
### For Android

Ensure an Android emulator or physical device is connected, then run:

```bash
npm run android
```

## Troubleshooting

### 1. Build Errors on iOS:

Clean the build folder:

```bash
cd ios
xcodebuild clean
rm -rf ~/Library/Developer/Xcode/DerivedData
cd ..
```
Then, Reinstall pods:

```bash
cd ios
npx pod-install
cd ..
```

### 2. Metro Bundler Issues:

Stop any running instances and start a new one:

```bash
npm start --reset-cache
```

### 3. Android Build Errors:

Clean the build folder:

```bash
cd android
./gradlew clean
cd ..
```
