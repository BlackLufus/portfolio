import 'package:flutter/material.dart';
import 'package:portfolio/service/fetch_data.dart';
import 'package:portfolio/service/firebase_push_notification.dart';
import 'package:portfolio/widgets/MessageTile.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<StatefulWidget> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    getNotificationData();
    FirebasePushNotification.subscribe(onMessage);
  }

  onMessage(Map<String, dynamic> data) {
    if (!mounted) return;
    try {
      final notification = NotificationData.fromJson(data);
      print(notification.email);
      setState(() {
        notificationData.insert(0, notification);
      });
    } catch (e, st) {
      print("Fehler beim Parsen der Notification: $e");
      print(st);
    }
  }

  List<NotificationData> notificationData = [];

  getNotificationData() async {
    final data = await FetchNotification.get(); // Daten asynchron holen
    setState(() {
      notificationData = data; // State synchron aktualisieren
    });
  }

  String formatRelativeDate(DateTime date) {
    final now = DateTime.now().toLocal();
    final today = DateTime(now.year, now.month, now.day);
    final yesterday = today.subtract(const Duration(days: 1));
    final dateOnly = DateTime(date.year, date.month, date.day);

    if (dateOnly == today) {
      return "Heute";
    } else if (dateOnly == yesterday) {
      return "Gestern";
    } else {
      // Andere Tage: formatieren, z.B. "17.11.2025"
      return "${date.day.toString().padLeft(2,'0')}.${date.month.toString().padLeft(2,'0')}.${date.year}";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      key: _scaffoldKey,
      body: Column(
        children: [
          SizedBox(height: 30,),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: Text(
                "Nachricht",
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          if (notificationData.isEmpty)
            Text(
              "Keine Daten vorhanden",
              style: TextStyle(
                color: Colors.grey
              ),
            )
          else
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: notificationData.length,
              itemBuilder: (context, index) {
                final item = notificationData[index];
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 4),
                    dateLabel(item.createdAt, index == 0),
                    const SizedBox(height: 4),
                    MessageTile(
                      createdAt: item.createdAt,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      email: item.email,
                      message: item.message,
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      )
    );
  }

  DateTime? currentDate;
  Widget dateLabel(DateTime createdAt, bool reset) {
    if (reset) currentDate = null;
    if (currentDate == null || currentDate!.day != createdAt.day || currentDate!.month != createdAt.month || currentDate!.year != createdAt.year) {
      currentDate = createdAt;
      final relativeDate = formatRelativeDate(createdAt);
      return Container(
          alignment: Alignment.center,
          child: Text(
          relativeDate,
          style: const TextStyle(
            color: Color.fromARGB(255, 33, 149, 243),
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      );
    }
    else {
      return const SizedBox.shrink();
    }
  }
}