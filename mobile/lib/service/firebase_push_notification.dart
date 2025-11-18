import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class FirebasePushNotification {

  static List<Function(Map<String, dynamic>)> subscribtions = [];

  static subscribe(Function(Map<String, dynamic>) onMessage) {
    subscribtions.add(onMessage);
  }

  static unsubscribe(Function(Map<String, dynamic>) onMessage) {
    subscribtions.remove(onMessage);
  }

  static _sendEvent(RemoteMessage message) {
    print("Title: ${message.notification?.title}");
    print("Body: ${message.notification?.body}");
    print("Data: ${message.data}");
    for (Function(Map<String, dynamic>) onMessage in subscribtions) {
      onMessage(message.data);
    }
  }

  // Local notifications
  static final FlutterLocalNotificationsPlugin localNotifications = FlutterLocalNotificationsPlugin();

  static Future<void> init() async {

    // Firebase initial
    await Firebase.initializeApp();

    // Background handler on incoming notifications
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // Foreground handler on incoming notifications
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _sendEvent(message);
    });

    // Notifications initial
    await setupLocalNotifications();

    // Off handler on incoming notifications
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      final notification = message.notification;
      final android = notification?.android;
      if (notification != null && android != null) {
        await localNotifications.show(
          notification.hashCode,
          notification.title,
          notification.body,
          const NotificationDetails(
            android: AndroidNotificationDetails(
              "channelId",
              'High Importance Notifications',
              importance: Importance.max,
              priority: Priority.high,
            ),
          ),
        );
      }
    });
  }

  // Get fcm token
  static Future<void> fcmToken() async {
    final fcmToken = await FirebaseMessaging.instance.getToken();
    print("FCM Token: $fcmToken");
  }

  // Handle background message
  static Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async { 
    _sendEvent(message);
  }

  // Setup local notifications
  static Future<void> setupLocalNotifications() async { 
    const android = AndroidInitializationSettings('@mipmap/ic_launcher'); 
    const settings = InitializationSettings(android: android); 
    await localNotifications.initialize(settings); 
  }
}