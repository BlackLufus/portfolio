import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:portfolio/helper/options_dialog.dart';
import 'package:portfolio/service/fetch_data.dart';
import 'package:portfolio/widgets/app_theme_color.dart';

class MessageTile extends StatefulWidget {
  final int id;
  final DateTime createdAt;
  final String firstName;
  final String lastName;
  final String? email;
  final String message;
  final Function onDelete;
  
  const MessageTile({
    super.key,
    required this.id,
    required this.createdAt,
    required this.firstName, 
    required this.lastName, 
    required this.email, 
    required this.message,
    required this.onDelete,
  });

  @override
  State<StatefulWidget> createState() => _MessageTileState();
}

class _MessageTileState extends State<MessageTile> {

  _update() {
    setState(() {
      // Update Language UI!
    });
  }

  @override
  void initState() {
    super.initState();
    AppColorTheme.subscribe(_update);
  }

  @override
  void dispose() {
    super.dispose();
    AppColorTheme.unsubscribe(_update);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColorTheme.primaryBackground,
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Name
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "${widget.firstName} ${widget.lastName}",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColorTheme.primaryText,
                  ),
                ),
                Container(
                  alignment: Alignment.bottomRight,
                  child: GestureDetector(
                    onTap: () {
                      OptionsDialog.show(context, "Nachricht lösche", "Du bist dabei die Nachricht von ${widget.firstName} ${widget.lastName} zu löschen, fortfahren?", (OptionsDialogStatus status) async {
                        if (status == OptionsDialogStatus.apply) {
                          await FetchNotification.delete(widget.id);
                          widget.onDelete(widget.id);
                        }
                      });
                    },
                    child: Icon(
                      Icons.delete_outline, 
                      size: 22,
                      color: AppColorTheme.appIcon
                    ),
                  ),
                )
              ],
            ),

            SizedBox(height: 8),
            
            if (widget.email != null) ...[
              // Email
              Row(
                children: [
                  Text(
                    widget.email!,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: AppColorTheme.secondaryText,
                    ),
                  ),
                  SizedBox(width: 8),
                  GestureDetector(
                    onTap: () async {
                      await Clipboard.setData(ClipboardData(text: widget.email!));
                    },
                    child: Icon(
                      Icons.content_copy, 
                      size: 18,
                      color: AppColorTheme.appIcon
                    ),
                  ),
                ],
              ),
              SizedBox(height: 8)
            ],

            // Message
            Text(
              widget.message,
              style: TextStyle(
                fontSize: 15,
                color: AppColorTheme.secondaryText
              ),
            ),
            SizedBox(height: 8),

            // DateTime
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: EdgeInsets.only(left: 8),
                  child: GestureDetector(
                    onTap: () async {
                      await Clipboard.setData(ClipboardData(text: widget.message));
                    },
                    child: Icon(
                      Icons.content_copy, 
                      size: 18,
                      color: AppColorTheme.appIcon,
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.bottomRight,
                  child: Text(
                    "${widget.createdAt.hour.toString().padLeft(2,'0')}:${widget.createdAt.minute.toString().padLeft(2,'0')}",
                    style: TextStyle(
                      color: AppColorTheme.thirdText
                    ),
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }

  
}