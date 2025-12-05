# WireGuard VPN Setup

## 1. Create keys

🔑 Create Private & Public Key erstellen (Server)

```bash
wg genkey | tee server_private.key | wg pubkey > server_public.key
```

🔑 Create Private & Public Key (Client)

```bash
wg genkey | tee client_private.key | wg pubkey > client_public.key
```

- `server_private.key` > remain on server (interface) 
- `client_private.key` > remain on client (interface)
Exchange public keys (client is getting **server-public.key** & reversed)

## 2. Server-Configuration (/etc/wireguard/wg0.conf)

```bash
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <SERVER_PRIVATE_KEY>

# NAT & Forwarding-Rules (for internet access via VPN)
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o ens3 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o ens3 -j MASQUERADE

[Peer]
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = 10.0.0.2/32
```

**Notice**

- Adapt `ens3` to the interface that points to the internet (check IP address).
- `/32` is necessary to ensure each client is unique.

## 3. Client-Configuration (wg0.conf)

```bash
[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = 10.0.0.2/24
DNS = 129.143.2.1, 129.143.2.4

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <SERVER_PUBLIC_IP>:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 30

```

## 4. Enable IP forwarding on the server

WireGuard requires IP forwarding for routing.

**Activate temporarily**:
```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

**Activate permanently**:
```bash
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 5. Firewall (Server)

Open port 51820/UDP

**UFW**:
```bash
sudo ufw allow 51820/udp
```

**iptables**:
```bash
iptables -A INPUT -p udp --dport 51820 -j ACCEPT
```

## 6. Start WireGuard

**Server**
```bash
sudo wg-quick up wg0
```

## 7. Usage of systemd

**Start**
```bash
sudo systemctl start wg-quick@wg0
```

**Restart**
```bash
sudo systemctl restart wg-quick@wg0
```

**Stop**
```bash
sudo systemctl stop wg-quick@wg0
```

**Enable**
```bash
sudo systemctl enable wg-quick@wg0
```

**Disable**
```bash
sudo systemctl disable wg-quick@wg0
```

## 8. Check connection

```bash
sudo wg show
```


You should see:

- **Latest handshake**: X seconds ago
- **Transfer**: Data in/out

If there are values ​​there > Connection is established.

## 9. Troubleshooting

**wg0 already exists**

```bash
sudo wg-quick down wg0 || sudo ip link delete wg0
sudo wg-quick up wg0
```
