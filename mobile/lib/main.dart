import 'package:flutter/material.dart';
import 'package:portfolio/helper/helper_function.dart';
import 'package:portfolio/pages/home_page.dart';
import 'package:portfolio/service/firebase_push_notification.dart';
import 'package:portfolio/shared/constants.dart';
import 'package:portfolio/widgets/app_theme_color.dart';

Future<void> main() async {

  WidgetsFlutterBinding.ensureInitialized();

  await FirebasePushNotification.init();
  await FirebasePushNotification.fcmToken();

  getSavedDarkmodeState() async {
    // get saved language
    await HelperFunctions.getDarkmode().then((value) {
      if (value != null) {
        AppColorTheme.setDarkmodeState(value);
      }
    });
  }

  await getSavedDarkmodeState();

  getSavedColorTheme() async {
    // get saved language
    await HelperFunctions.getColorTheme().then((value) {
      if (value != null) {
        AppColorTheme.setColorTheme(newIndex: value);
      }
    });
  }

  await getSavedColorTheme();

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  @override
  void initState() {
    super.initState();
    Constants.updateUI = () {
      setState(() {/*Update*/});
    };
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}