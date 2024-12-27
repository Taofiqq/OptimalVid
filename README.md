This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

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
