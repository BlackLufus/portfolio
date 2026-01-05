import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';

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

    await Permission.notification.isDenied.then((value) {
      if (value) {
        Permission.notification.request();
      }
    });

    // Background handler on incoming notifications
    FirebaseMessaging.onBackgroundMessage((RemoteMessage message) async {
        _sendEvent(message);
    });

    // Foreground handler on incoming notifications
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      _sendEvent(message);
      await showLocalNotification(message);
    });

    // Notifications initial
    await setupLocalNotifications();
  }

  // Get fcm token
  static Future<void> fcmToken() async {
    final fcmToken = await FirebaseMessaging.instance.getToken();
    print("FCM Token: $fcmToken");
  }

  // Show local notification
  static Future<void> showLocalNotification(RemoteMessage message) async {
    final notification = message.notification;
    final android = notification?.android;
    if (notification != null && android != null) {
      await localNotifications.show(
        notification.hashCode,
        notification.title,
        notification.body,
        const NotificationDetails(
          android: AndroidNotificationDetails(
            'default_channel',
            'Default',
            importance: Importance.max,
            priority: Priority.high,
          ),
        ),
      );
    }
  }

  // Setup local notifications
  static Future<void> setupLocalNotifications() async { 
    const android = AndroidInitializationSettings('@mipmap/ic_launcher'); 
    const settings = InitializationSettings(android: android); 
    await localNotifications.initialize(settings); 
  }
}