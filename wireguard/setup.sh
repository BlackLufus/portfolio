#!/bin/bash
SERVER_PUBLIC_PORT=51820
INSTALL_WIREGUARD_IF_NOT_EXIST=false
CREATE_FILES=false
FORWARDING=false
TEMP_FORWARDING=false

helpFunction()
{
   echo ""
   echo "Usage: $0 -F (for first permanent initial)"
   echo -s "\t-s The server name / address to connect."
   echo -p "\t-p The server port to connect."
   echo -I "\t-I Install wireguard-tools if not already installed."
   echo -C "\t-C Create/Replace Server (wg0.conf) and Client (client.conf) Configuration files"
   echo -F "\t-F Activates IP forwarding for routing (Permanently)."
   echo -T "\t-T Activates IP forwarding for routing (Temporarily)."
   echo -h "\t-h Shows this help page."
   exit 1 # Exit script after printing help
}

# Check for arguments
while getopts "s:p:ICFTh" opt
do
   case "$opt" in
      s ) SERVER_PUBLIC_IP="$OPTARG" ;;
      p ) SERVER_PUBLIC_PORT="$OPTARG" ;;
      I ) INSTALL_WIREGUARD_IF_NOT_EXIST=true ;;
      C ) CREATE_FILES=true ;;
      F ) FORWARDING=true ;;
      T ) TEMP_FORWARDING=true ;;
      h|? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Check if Wireguard tools are installed
if ! command -v wg >/dev/null; then
    echo "wireguard-tools is not installed."
    if [[ $INSTALL_WIREGUARD_IF_NOT_EXIST == true ]]; then
        sudo apt install wireguard-tools
    else
        exit -1
    fi
fi

# Check for Creating file flag
if [[ $CREATE_FILES == true ]]; then

    # Check if the server address is not null
    if [[ -z $SERVER_PUBLIC_IP ]]; then
        echo "A server address is required."
        exit 1
    fi

    # Check if a valid server address (IP address or domain) exists.
    IP_REGEX='^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$'
    DOMAIN_REGEX='^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$'
    if [[ ! $SERVER_PUBLIC_IP =~ $IP_REGEX && ! $SERVER_PUBLIC_IP =~ $DOMAIN_REGEX ]]; then
        echo "Invalid server address, a valid address is required. (Provided: [$SERVER_PUBLIC_IP])"
        exit 1
    fi

    # Check if a valid port exists
    PORT_REGEX='^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$'
    if [[ ! $SERVER_PUBLIC_PORT =~ $PORT_REGEX ]]; then
        echo "Invalid server port. The port must be between 0 and 65535. (Provided: [$SERVER_PUBLIC_PORT])"
        exit 1
    fi

    # Checks accomplished, start creating files
    echo "Createing wg0.conf for server side and client.conf for client side."

    # Create Server keys
    echo "Erstelle Server keys"
    wg genkey | tee server_private.key | wg pubkey > server_public.key
    SERVER_PRIVATE_KEY=$(cat server_private.key)
    SERVER_PUBLIC_KEY=$(cat server_public.key)

    # Create Client keys
    echo "Create Client keys"
    wg genkey | tee client_private.key | wg pubkey > client_public.key
    CLIENT_PRIVATE_KEY=$(cat client_private.key)
    CLIENT_PUBLIC_KEY=$(cat client_public.key)

    # Create Server-Configuration
    echo "Create Server-Configuration as wg0.conf"
    cat > wg0.conf << EOF
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = $SERVER_PRIVATE_KEY

# NAT & Forwarding-Rules (for internet access via VPN)
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o ens3 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o ens3 -j MASQUERADE

[Peer]
PublicKey = $CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32
EOF
    cp wg0.conf /etc/wireguard/wg0.conf
    chmod 600 /etc/wireguard/wg0.conf

    # Create Client-Configuration
    echo "Create Client-Configuration as client.conf"
    cat > client.conf << EOF
[Interface]
PrivateKey = $CLIENT_PRIVATE_KEY
Address = 10.0.0.2/24
DNS = 129.143.2.1, 129.143.2.4

[Peer]
PublicKey = $SERVER_PUBLIC_KEY
Endpoint = $SERVER_PUBLIC_IP:$SERVER_PUBLIC_PORT
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 30
EOF
    chmod 600 client.conf

    # Delete unnecessary files
    rm server_private.key
    rm server_public.key
    rm client_private.key
    rm client_public.key
fi

# Check for Forwarding flag and Temp flag
if [[ $TEMP_FORWARDING == true ]]; then
    echo "Temp Forwarding flag set."
    sudo sysctl -w net.ipv4.ip_forward=1
elif [[ $FORWARDING == true ]]; then
    echo "Forwarding flag set."
    if [[ ! $(sysctl -n net.ipv4.ip_forward) -eq 1 ]]; then
        echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
    fi
    sudo systemctl enable wg-quick@wg0
    sudo sysctl -p
fi
