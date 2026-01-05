import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class NotificationData {
  final int id;
  final DateTime createdAt;
  final String fullName;
  final String? email;
  final String message;

  const NotificationData({
    required this.id,
    required this.createdAt,
    required this.fullName,
    required this.email,
    required this.message
  });

  factory NotificationData.fromJson(Map<String, dynamic> json) {
    print(DateTime.parse("${DateTime.parse(json['created_at'] as String)}z").toLocal());
    return NotificationData(
      id: json['id'],
      fullName: json['full_name'] as String,
      email: json['email'] != null ? json['email'] as String : null,
      message: json['message'] as String,
      createdAt: DateTime.parse("${DateTime.parse(json['created_at'] as String)}z").toLocal(),
    );
  }
}

class FetchNotification {
  static _getAuthToken() async {
    try {
      final jsonString = await rootBundle.loadString('assets/secrets.json');
      final data = jsonDecode(jsonString);
      return data['AUTH_TOKEN'];
    }
    catch (e, st) {
      print(e);
      print(st);
    }
  }

  static Future<List<NotificationData>> get() async {
    final authToken = await _getAuthToken();
    final response = await http.get(
      Uri.parse('https://michaelreischl.de/api/notifications'),
      headers: {
        'Authorization': 'Bearer $authToken'
      }
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonData = jsonDecode(response.body);

      final List<dynamic> dataList = jsonData["response"];
      return dataList.map((item) {
        return NotificationData.fromJson(
          (item as Map<String, dynamic>).map((key, value) => MapEntry(key, value))
        );
      }).toList();
    }
    else {
      return [];
    }
  }

  static Future<bool> delete(int index) async {
    final authToken = await _getAuthToken();
    final response = await http.delete(
      Uri.parse('https://michaelreischl.de/api/notifications/${index.toString()}'),
      headers: {
        'Authorization': 'Bearer $authToken'
      }
    );

    if (response.statusCode == 200) {
      return true;
    }
    else {
      return false;
    }
  }
}