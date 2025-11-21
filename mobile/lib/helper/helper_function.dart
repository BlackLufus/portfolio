// Authored by: Christoph Gerling & Michael Reischl

import 'package:shared_preferences/shared_preferences.dart';

class HelperFunctions {
  static String userDarkmodeKey = "USERDARKMODEKEY";
  static String userColorThemeKey = "USERCOLORTHEMEKEY";

  static Future<bool> savedDarkmode(bool isDarkmode) async {
    SharedPreferences sf = await SharedPreferences.getInstance();
    return await sf.setBool(userDarkmodeKey, isDarkmode);
  }

  static Future<bool?> getDarkmode() async {
    SharedPreferences sf = await SharedPreferences.getInstance();
    return sf.getBool(userDarkmodeKey);
  }

  static Future<bool> savedColorTheme(int colorTheme) async {
    SharedPreferences sf = await SharedPreferences.getInstance();
    return await sf.setInt(userColorThemeKey, colorTheme);
  }

  static Future<int?> getColorTheme() async {
    SharedPreferences sf = await SharedPreferences.getInstance();
    return sf.getInt(userColorThemeKey);
  }
}