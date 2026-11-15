---
title: "GMKtec EVO-X2 eGPU RTX-3090"
description: "How I connected my GMKtec with a eGPU - a local guide"
date: 2026-11-13
lang: en
category: local-ai
tags: ["Local LLM", "GMKtec", "RTX-3090"]
cover: notes
featured: false
draft: false
---

What's up Choom!

This time I'll walk you through how I set up my eGPU (RTX 3090).

Disclaimer: I'm no expert, and there are probably better ways to do this (at least the Software part). Some steps are just down to preference. There are other guides out there too, but you can use this one as well, at your own risk. :-)

## Introduction

### Why I added an RTX 3090

I added the eGPU because I wanted to run Qwen3.8-27B — and later Qwen4-27B — at a comfortable speed. The GMKtec, with the Strix Halo, only got me about 13–17 tokens per second with UD-Q6_K_XL and DFlash2-Q8_0.

But it was still my best model. Before that, Qwen3.6-35B-A3B was my main one, 50–60 tokens/s and decently good. But for coding, the 27B was soooo much better.
QFN (Qwen Flash Next), on the other hand, only fit in Q3 (with the Strata enigne), and I really didn't like it compared to the 27B Q6.

So I started looking for other options. I was deciding between:

- Selling the GMKtec and building a GPU server with a ~3K budget
- Building a GPU PC next to my GMKtec with a ~1.5K budget
- Buying an eGPU, ~1.5K budget

I chose the eGPU, because the RTX 3090 offered the best speed of all the options. The AMD AI PRO R9700 with its 32GB of VRAM was also a strong contender, especially since I could fit Q6 in it. But it was slower and more expensive than the 3090, so I went with the NVIDIA GPU.

### The parts I used for this build

- MSI RTX 3090 Gaming X Trio (24GB VRAM)
- GMKtec EVO-X2, 96GB version (not officaly avaiable anymore)
- eGPU: RIITOP OCuLink eGPU Dock, 64Gbps, Oculink SFF-8612 external GPU case for PCIe 4.0 x16 graphics cards
- OCuLink to M.2 adapter: CY 2280 NGFF PCIe 4.0, M.2 M-Key to Oculink SFF-8612 / SFF-8611 host cable, 15cm, for NVMe / U.2 SSD / eGPU
- PSU: be quiet! Pure Power 13 M (1000W — overkill, I know)

## Step by Step

### 1. Open the case

Info: Before going with an M.2 to OCuLink adapter instead of the Thunderbolt port, make sure you have a free M.2 slot in your PC.

To open the case, pull off the 2 rubber bands that act as the feet of the PC. I used a screwdriver and a bit of brute force (because they are glued to the case) — so be prepared for a little damage on the case.

<!-- Image: the pulled off rubber feet -->

Under the rubber feet you will find 6 screws. For our case, we need to remove at least the upper 4.

### 2. Putting in the OCuLink adapter

I put the adapter into the free M.2 slot, just like I would with a normal SSD. Screw it down and that's it.

<!-- Image: the adapter in the M.2 slot -->

### 3. Closing the case (optional for now)

Note: I recommend skipping this part until you have confirmed that everything is working.

I chose the slim version and took the risk of it shutting down after 2–3 minutes (as other users have reported), just for the sake of keeping it compact. I originally thought it would be plastic and that I could just carve a little extra space out, but it's metal, so bye bye my plan.
Luckily, the case could still be closed while keeping a little gap open.
To do that, I folded a tissue and wedged it between the case halves, leaving just enough wiggle room for the cable.

<!-- Image: the wiggle room, with the tissue between the case halves -->

### 4. Putting the RTX 3090 into the eGPU dock

This step was really easy.
Pull out the retention bracket at the back of the dock — that's what holds the GPU in place.
Then remove the plastic from the PCIe slot, put the GPU in place, and put the bracket back on to hold the GPU in place.

<!-- Image: the GPU in the dock -->

### 5. Connecting everything

After that, I put everything together: dock + GMKtec + PSU.

<!-- Image: the full setup -->

## Running tests

Because I bought a second hand RTX 3090, I obviously had to test it.
For that my Agent did the most part. (cause i was to lazy and didnt had a plan how to test on a Fedora machine...)

Sadly I didnt document it, nor can find the history of the Chat.
For all I know next time i would search the Internet myselfe, ask AI but in the end do it myselfe and Document everything.
Dont do the same mistake as me!

## Current setup

Right now I run the 27B in UD-Q4_K_XL with 128K context and a q8 KV cache, on the same llama.cpp setup I already use for my base machine.

### The numbers

- Prefill: 161.83 t/s up to 1234.67 t/s
- Generation: 52.91 t/s up to 78.89 t/s

For comparison: on the GMKtec alone, I was getting 13–17 t/s with the 27B. So yes, it was worth it.
