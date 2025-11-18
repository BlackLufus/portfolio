import 'package:flutter/material.dart';

class MessageTile extends StatefulWidget {
  final DateTime createdAt;
  final String firstName;
  final String lastName;
  final String? email;
  final String message;
  
  const MessageTile({
    super.key,
    required this.createdAt,
    required this.firstName, 
    required this.lastName, 
    required this.email, 
    required this.message
  });

  @override
  State<StatefulWidget> createState() => _MessageTileState();
}

class _MessageTileState extends State<MessageTile> {

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
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
            // Name + Email
            Text(
              "${widget.firstName} ${widget.lastName}${(widget.email != null) ? " - ${widget.email}" : ""}",
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Colors.grey.shade800,
              ),
            ),
            SizedBox(height: 8),

            // Message
            Text(
              widget.message,
              style: TextStyle(fontSize: 15),
            ),
            SizedBox(height: 8),

            // DateTime
            Container(
              alignment: Alignment.bottomRight,
              child: Text(
                "${widget.createdAt.hour.toString().padLeft(2,'0')}:${widget.createdAt.minute.toString().padLeft(2,'0')}"
              ),
            )
          ],
        ),
      ),
    );
  }

  
}