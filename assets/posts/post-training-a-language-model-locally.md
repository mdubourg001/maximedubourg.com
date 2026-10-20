---
title: "Post-training a small open-weight model to write regular expressions"
description: ""
date: 10/20/2026
status: draft
---

<!--<iframe class="border-px border-slate-100" src="https://regex-vibes.netlify.app/" width="100%" height="800px" />-->

# Post-training a small open-weight model to write regular expressions

> **TL;DR:**
>
> - I post-trained Qwen-3-0.6B to generate JS-flavored regular expressions from natural language
> - Resulting model runs on a playground locally in-browser (1.6GB model download): [https://regex-vibes.netlify.app](https://regex-vibes.netlify.app)
> - Results are mixed: 7 good results out of 10 on simple prompts, 2 out of 10 on harder ones

I went to the [DotAI](https://www.dotai.io) conference in Paris a few weeks ago, and some subjects were recurrent in a lot of talks and discussions:

- we are currently giving our whole lives and companies data to <span id="anthropic" class="transition-colors [body:has(#yikes:hover)_&]:text-orange-500">Anthropic</span> and OpenAI
- open-weights models and self-owned inference is becoming more and more viable by the weeks
- post-training seems to be an interesting intersection of the two previous points

So I decided to try by myself and I post-trained a a small-sized LLM to be good at generating JS-flavored regular expression from an english description of what to match.

But as I know _nothing_ about how to do it, I had to make Opus 5.5 (<span id="yikes" class="cursor-help">yikes</span>) drive me. Here's what I learned in the process.

## What is post-training ?

As everybody now knows, large language models are basically machine learning models statistically predicting pieces of text (= _tokens_) coming after given pieces of text.

<img class="border my-8" src="/static/images/llm-token-prediction.svg" alt="Schema of a language model: input tokens go through a matrix of weights that outputs probabilities for the next token" />

The _weights_, as shown in the schema, are the numerical parameters built into the model (millions to billions of them) adjusted during the _training_ of the base model to produce the right output to a given input.

**_Post-training_ is the process of nudging these weights after the initial training of a model to steer it into giving answers in a certain style, tone, format, or on a very specific-domain.**

## Choosing the base-model

Our constraints :

- should be open-weight (duh)
- should have an `Instruct` / `it` variant available
- should be suitable to be trained on a Macbook Pro 24Go RAM (small-enough, MLX compatible)
- final model should be usable through transformers.js in-browser, and light enough (< 1.5Go)

## Building the training dataset

- what is valuable for a good training
- where to find the data from
- difference between "train", "held-out" and "benchmark"

## Figure out what post-training method to use

### Learning by imitation

- Continued pretraining:
- SFT (Supervised Fine-Tuning):
- RFT:
- Distillation:

### Learning by preferences

- DPO:
- KTO:

### Learning by trying and being judged

- Reinforcement learning (RLHF ou RLAIF):
- GRPO:

### How to apply the post-training

- **Full fine-tuning:**
- **LoRA:**
- **QLoRA:**

### The right method based on the need

| Need                                                 | Recommended pipeline                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| Often-changing knowledge base                        | No post-training: RAG. Fine-tuning doesn't handle new facts well |
| Specific domain or vocabulary                        | Continued pretraining then SFT                                   |
| Specific output format, tone, style, or precise task | SFT + LoRA                                                       |
| Reduce unwanted answer, improve model "UX"           | DPO, or KTO                                                      |
| Reasoning, maths/code, _tool use_, _agents_          | GRPO (RLVR)                                                      |
| Make a small model better at reasoning               | Distillation from a bigger LLM                                   |
