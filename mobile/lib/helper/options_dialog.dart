// Authored by: Michael Reischl

import 'package:flutter/material.dart';
import 'package:portfolio/widgets/app_theme_color.dart';

enum OptionsDialogStatus {
  apply,
  cancle,
}

class OptionsDialog extends StatefulWidget {
  final String title;
  final String description;
  final Function? callback;

  const OptionsDialog({
    super.key,
    required this.title,
    required this.description,
    required this.callback,
  });

  static Future<void> show(BuildContext context, String title,
      String description, void Function(OptionsDialogStatus)? callback) {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return OptionsDialog(
            title: title, description: description, callback: callback);
      },
    );
  }

  @override
  State<OptionsDialog> createState() => _OptionsDialogState();
}

class _OptionsDialogState extends State<OptionsDialog> {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: AppColorTheme.secondaryBackground,
      title: Text(
        widget.title,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: AppColorTheme.primaryText,
          fontWeight: FontWeight.bold,
          fontSize: 22,
        ),
      ),
      content: SingleChildScrollView(
        child: Column(
          children: [
            Text(
              widget.description,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColorTheme.secondaryText,
                fontSize: 16,
              ),
            ),
          ],
        ),
      ),
      actions: <Widget>[
        Row(
          children: [
            Expanded(
              child: TextButton(
                style: TextButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.labelLarge,
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                  if (widget.callback != null)
                    widget.callback!(OptionsDialogStatus.apply);
                },
                child: Text(
                  "Ok",
                  style: TextStyle(
                    color: AppColorTheme.preferredColorTheme,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            Expanded(
              child: TextButton(
                style: TextButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.labelLarge,
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                  if (widget.callback != null)
                    widget.callback!(OptionsDialogStatus.cancle);
                },
                child: Text(
                  "Abbruch",
                  style: TextStyle(
                    color: AppColorTheme.preferredColorTheme,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}