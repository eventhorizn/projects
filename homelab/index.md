# General Information

## Setup

only local data store

lvremove /dev/pve/data

lvresize -1 +100%FREE /dev/pve/root

resize2fs /dev/mapper/pve-root

https://www.youtube.com/watch?v=qmSizZUbCOA

## IP Address

192.168.1.239

## Proxmox UI

https://192.168.1.239:8006

## Post Install Updates

There's a subscription warning that flashes everytime you long into the box

Since I don't want to see that, here's how to remove:

1. SSH into the box
1. Navigate to: `usr/share/javascript/proxmox-widget-toolkit`
1. In the `proxmoxlib.js` file, comment out the notification function
   - Look for the 'you do not have a valid subscription' section
   - This is a function that returns a message when there's no active subscription
   - We are going to comment out the else check (line 616)
     `Ext.Msg.show`

## Script Manager on Proxmox

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/pve-scripts-local.sh)"
```

# Media CT

Exposes my media files as a share for VMs and other computers

Set up pools, samba

https://github.com/TechHutTV/homelab/blob/main/storage/README.md

# Software

1. Filezilla
   - FTP to the proxmox (and other) servers
1. Windows Terminal
   - ssh into VMs

# Useful Links
