# Portfolio Mobile

This mobile application is designed to receive real-time push notifications and manage stored user messages.
Its main purpose is to provide a simple and efficient way for users (or the app owner) to view incoming messages that contain:

- `Name`
- `Email`
- `Message content`

The app integrates Firebase Cloud Messaging (FCM) to deliver push notifications whenever a new message is created. These notifications appear instantly on the device, even when the app is running in the background or closed.

In addition to receiving notifications, the app also displays previously received messages, allowing users to review older entries at any time. Each message is stored with its associated information and can be accessed through the app’s user interface.

Overall, the app functions as a lightweight, real-time messaging viewer with push notification support.

## Firebase Client Setup for Flutter (Android Only)

First install Firebase into your Application (App).

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/u/0/).

2. Click **Add project**.

3. Enter a project name (e.g., `portfolio-9d5a2`).

4. Enable or disable Firebase Analytics as needed.

5. Click **Create project**.

### 2. Add Android App to Firebase

1. Go to **Project Overview** > **Add App** > **Android**.

2. Enter your **Android package name** (e.g., `com.portfolio.mobile`).
    - ⚠️ Must match the `applicationId` in your Flutter project (`android/app/build.gradle`).

3. Download `google-services.json`.

4. Place the file in your Flutter project:
    ```bash
    android/app/google-services.json
    ```

### 3. Add Flutter Firebase Packages

In `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_messaging: ^16.0.4
  firebase_core: ^4.2.1
```


Then run:

```bash
flutter pub get
```

### 4. Initialize Firebase in Flutter

In `main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Firebase.initializeApp();
  ...
  runApp(const MyApp());
}
```

### 5. Setup Firebase Cloud Messaging (FCM)

```dart
import 'package:firebase_messaging/firebase_messaging.dart';

class PushNotificationService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  Future<void> init() async {
    // Get the FCM token
    String? token = await _messaging.getToken();
    print("FCM Token: $token");

    // Handle messages when app is in the foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Message received: ${message.notification?.title}');
    });

    // Handle messages when the app is opened via notification
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      print('Opened app from notification: ${message.notification?.title}');
    });
  }
}
```

The **FCM token** is required for sending push notifications from a server or Python script.

### 6. Add Required Permissions

**permission_handler**

Add permissions to project:

```bash
flutter pub add permission_handler
```

Request for permissions:

```dart
await Permission.notification.isDenied.then((value) {
    if (value) {
    Permission.notification.request();
    }
});
```

**android\app\src\main\AndroidManifest.xml**

Make sure your `applicationId` matches the package in Firebase:

```gradle
defaultConfig {
    applicationId "com.portfolio.mobile"
    minSdkVersion 21
    targetSdkVersion 33
    ...
}
```

**android\app\src\main\kotlin\com\example\mobile\MainActivity.kt**

Just in case errors occour, check this our:

```kt
package com.portfolio.mobile
...
```

### 7. Test FCM Token

```dart
In Flutter:

final fcmToken = await FirebaseMessaging.instance.getToken();
print("FCM Token: $fcmToken");
```

- Use this token in your **Python server script** or backend to send push notifications.

### 8. Troubleshooting

- `No matching client found` Ensure the package name in Firebase matches exactly your Android applicationId.

- `SENDER_ID_MISMATCH` The FCM token belongs to another project. Generate a new token with the correct Firebase config.

- `Push notifications not received` Check notification permissions and foreground/background handling.