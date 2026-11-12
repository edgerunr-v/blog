---
title: "My Homelab"
description: "The hardware behind my homelab: two used office PCs running Proxmox and a Ryzen AI box for local LLMs"
date: 2026-11-12
lang: en
category: homelab
tags: ["Homelab", "Hardware"]
cover: notes
featured: true
draft: false
---

Hey Choom!

Today I'll introduce my Homelab. The hardware to be specific.

Two "cheap" used office PCs for the services, and one dedicated machine for local AI.

![My Homelab in the Basement](/images/homelab_basement.webp)

## The lineup

### Dell OptiPlex 7050
My first Proxmox node. Hosting mainly infrastructure.

<!-- TODO: image — the OptiPlex -->

### HP EliteDesk 800 G5
The second Proxmox node — the media library, with its 2 HDDs

<!-- TODO: image — the EliteDesk -->

### GMKtec EVO-X2
The local AI box. 96GB of unified memory plus an RTX 3090 eGPU I added via OCuLink make it a strong machine — capable of running Qwen3.8-Flash-next (125B-A6B) and Qwen3.8-27B at the same time.

<!-- TODO: image — the GMKtec with the OCuLink cable / RTX 3090 -->

## Specs

| | OptiPlex 7050 | EliteDesk 800 G5 | GMKtec EVO-X2 |
|---|---|---|---|
| CPU | i5-7600T | i5-9500 | AMD Ryzen AI MAX+ 395 (Radeon 8060S) |
| RAM | 32GB DDR4 | 32GB DDR4 | 96GB DDR5 + 24GB GDDR6X |
| Storage | 2TB SSD | 4.5TB SSD + 2×4TB HDD | 1TB SSD |
| Role | Proxmox | Proxmox + storage | Local AI |

## What's next

This post just covers the hardware. I'll go deep in future ones.
<br>
Stay tuned!
