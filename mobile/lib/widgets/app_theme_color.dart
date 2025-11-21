// Authored by: Michael Reischl

import 'package:flutter/services.dart';
import 'package:portfolio/helper/helper_function.dart';
import 'package:portfolio/shared/constants.dart';

class AppColorTheme {
  static bool _isDarkmode = true;
  static int _colorThemeIndex = 4;

  static List<Function> callbacks = [];

  static subscribe(Function callback) {
    callbacks.add(callback);
  }

  static unsubscribe(Function callback) {
    callbacks.remove(callback);
  }

  static _sendEvent() {
    for (Function callback in callbacks) {
      if (Constants.updateUI != null) {
        Constants.updateUI!();
      }
      callback();
    }
  }

  static bool get darkmodeState => _isDarkmode;
  static setDarkmodeState(value) {
        _isDarkmode = value;
        _sendEvent();
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
          systemNavigationBarColor: AppColorTheme.primaryBackground,
          systemNavigationBarIconBrightness:
              value ? Brightness.dark : Brightness.light,
        ));
      }

  static int get colorThemeIndex => _colorThemeIndex;
  static void setColorTheme({int newIndex = -1}) {
    if (newIndex >= 0 && newIndex < preferredColorThemes.length) {
      _colorThemeIndex = newIndex;
    } else {
      _colorThemeIndex = (_colorThemeIndex + 1) % preferredColorThemes.length;
    }
    _sendEvent();
  }

  static List<Color> preferredColorThemes = [
    const Color.fromARGB(255, 172, 83, 83),
    const Color.fromARGB(255, 172, 142, 83),
    const Color.fromARGB(255, 128, 155, 75),
    const Color.fromARGB(255, 83, 172, 83),
    const Color.fromARGB(255, 83, 172, 142),
    const Color.fromARGB(255, 83, 142, 172),
    const Color.fromARGB(255, 83, 83, 172),
    const Color.fromARGB(255, 142, 83, 172),
    const Color.fromARGB(255, 172, 83, 142),
  ];

  static Color get preferredColorTheme =>
      preferredColorThemes[_colorThemeIndex];

  static Color get primaryText => _isDarkmode
      ? const Color.fromARGB(255, 255, 255, 255)
      : const Color.fromARGB(255, 0, 0, 0);
  static Color get secondaryText => _isDarkmode
      ? const Color.fromARGB(255, 192, 192, 192)
      : const Color.fromARGB(222, 12, 12, 12);
  static Color get thirdText => _isDarkmode
      ? const Color.fromARGB(255, 158, 158, 158)
      : const Color.fromARGB(255, 158, 158, 158);

  static Color get primaryBackground => _isDarkmode
      ? const Color.fromARGB(255, 28, 28, 28)
      : const Color.fromARGB(255, 255, 255, 255);
  static Color get secondaryBackground => _isDarkmode
      ? const Color.fromARGB(255, 42, 42, 42)
      : const Color.fromARGB(255, 255, 255, 255);
  static Color get thirdBackground => _isDarkmode
      ? const Color.fromARGB(255, 56, 56, 56)
      : const Color.fromARGB(255, 220, 220, 220);

  static Color get primaryButton => _isDarkmode
      ? const Color.fromARGB(255, 42, 42, 42)
      : const Color.fromARGB(255, 255, 255, 255);
  static Color get secondaryButton => _isDarkmode
      ? const Color.fromARGB(255, 56, 56, 56)
      : const Color.fromARGB(255, 255, 255, 255);

  static Color get primaryButtonText => _isDarkmode
      ? const Color.fromARGB(255, 192, 192, 192)
      : AppColorTheme.preferredColorThemes[_colorThemeIndex];
  static Color get secondaryButtonText => _isDarkmode
      ? const Color.fromARGB(255, 158, 158, 158)
      : const Color.fromARGB(255, 255, 255, 255);

  static Color get error => _isDarkmode
      ? const Color.fromARGB(255, 207, 102, 121)
      : const Color.fromARGB(255, 176, 0, 32);

  static Color get checkbox => _isDarkmode
      ? const Color.fromARGB(255, 56, 56, 56)
      : const Color.fromARGB(255, 255, 255, 255);
  static Color get appIcon => _isDarkmode
      ? const Color.fromARGB(255, 176, 176, 176)
      : const Color.fromARGB(255, 28, 28, 28);

  static Color get appNavigationIcon => _isDarkmode
      ? const Color.fromARGB(255, 176, 176, 176)
      : const Color.fromARGB(255, 28, 28, 28);
  static Color get selectedBottomNavigation => _isDarkmode
      ? const Color.fromARGB(255, 150, 150, 150)
      : const Color.fromARGB(222, 12, 12, 12);
  static Color get unselectedBottomNavigation => _isDarkmode
      ? const Color.fromARGB(255, 150, 150, 150)
      : const Color.fromARGB(222, 80, 80, 80);

  static Color get mapOverlay => _isDarkmode
      ? const Color.fromARGB(100, 28, 28, 28)
      : const Color.fromARGB(0, 0, 0, 0);
  static Color get mapAddressBackground => _isDarkmode
      ? const Color.fromARGB(255, 42, 42, 42)
      : AppColorTheme.preferredColorThemes[_colorThemeIndex];
  static Color get mapAddressText => _isDarkmode
      ? const Color.fromARGB(255, 255, 255, 255)
      : const Color.fromARGB(255, 255, 255, 255);
  static Color get mapAddressIcon => _isDarkmode
      ? const Color.fromARGB(255, 176, 176, 176)
      : const Color.fromARGB(255, 255, 255, 255);

  static Color get partnerMessageTile => _isDarkmode
      ? const Color.fromARGB(255, 124, 124, 124)
      : const Color.fromARGB(255, 158, 158, 158);
  static Color get chatMessageInput => _isDarkmode
      ? const Color.fromARGB(255, 66, 66, 66)
      : const Color.fromARGB(255, 97, 97, 97);
}