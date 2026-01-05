import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Grip, AlertCircle, Layout, Grid, Search, Github, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const ALL_LLMS = [
  // Major AI Assistants
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: 'https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png', category: 'Major' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', icon: 'https://claude.ai/images/claude_app_icon.png', category: 'Major' },
  { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com/app', icon: 'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png', category: 'Major' },
  { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/', icon: 'https://th.bing.com/th/id/ODF.gvTtwYZxRukae9S8YAPqoA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Major' },
  
  // Search & Research AI
  { id: 'perplexity', name: 'Perplexity AI', url: 'https://www.perplexity.ai/', icon: 'https://th.bing.com/th/id/ODF.2WzwWmHtYsHp0TAgDxOGpA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Search' },
  { id: 'you', name: 'You.com', url: 'https://you.com/', icon: 'https://th.bing.com/th/id/ODF.ocGBsuSVWEm3J0gwjp8e7Q?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Search' },
  { id: 'phind', name: 'Phind', url: 'https://www.phind.com/', icon: 'https://th.bing.com/th/id/ODF.wRVGXkARu0kzLLBhplGWlg?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Search' },
  { id: 'andi', name: 'Andi', url: 'https://andisearch.com/', icon: 'https://andisearch.com/favicon.ico', category: 'Search' },
  { id: 'metaphor', name: 'Exa', url: 'https://exa.ai/', icon: 'https://th.bing.com/th/id/ODF.khxyxXKDVNfQEJx0es8uFw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Search' },
  { id: 'komo', name: 'Komo AI', url: 'https://komo.ai/', icon: 'https://komo.ai/favicon.ico', category: 'Search' },
  { id: 'consensus', name: 'Consensus', url: 'https://consensus.app/', icon: 'https://th.bing.com/th/id/ODF.Bz8ANAlfvLkBbCmp5ruAFQ?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Search' },
  { id: 'elicit', name: 'Elicit', url: 'https://elicit.com/', icon: 'https://framerusercontent.com/images/Vjg7ANBZPC8Ulu3iwyAVm5B1UNQ.png', category: 'Search' },
  { id: 'scholarai', name: 'ScholarAI', url: 'https://scholar-ai.net/', icon: 'https://scholar-ai.net/favicon.ico', category: 'Search' },
  { id: 'tavily', name: 'Tavily', url: 'https://tavily.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
  { id: 'morphic', name: 'Morphic', url: 'https://morphic.sh/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
  { id: 'iask', name: 'iAsk.ai', url: 'https://iask.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
    
  // Multi-Model Platforms
  { id: 'poe', name: 'Poe', url: 'https://poe.com/', icon: 'https://th.bing.com/th/id/ODF.qYxPu_oPp_nqOxV638KgEA?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Multi-Model' },
  { id: 'huggingchat', name: 'HuggingChat', url: 'https://huggingface.co/chat/', icon: 'https://huggingface.co/front/assets/huggingface_logo.svg', category: 'Multi-Model' },
  { id: 'forefront', name: 'Forefront', url: 'https://www.forefront.ai/', icon: 'https://th.bing.com/th/id/ODF.bcRFNLnDFgvd7PoYQAZKmg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Multi-Model' },
  { id: 'ora', name: 'Ora.ai', url: 'https://ora.ai/', icon: 'https://ora.ai/favicon.ico', category: 'Multi-Model' },
  { id: 'nat', name: 'Nat.dev', url: 'https://nat.dev/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Multi-Model' },
  { id: 'chathub', name: 'ChatHub', url: 'https://app.chathub.gg/', icon: 'https://chathub.gg/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d64fdbac.png&w=64&q=75&dpl=dpl_6nGDw82WAnSnjxR3NpEsfKRgV2S9', category: 'Multi-Model' },
  { id: 'merlin', name: 'Merlin AI', url: 'https://www.getmerlin.in/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Multi-Model' },
  { id: 'typing-mind', name: 'TypingMind', url: 'https://www.typingmind.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Multi-Model' },
  { id: 'chatbox', name: 'Chatbox', url: 'https://chatboxai.app/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Multi-Model' },
   
  // Open Source AI
  { id: 'llama', name: 'Meta AI', url: 'https://www.meta.ai/', icon: 'https://th.bing.com/th/id/ODF.tWg2nebkMEte5c1IChpo-A?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Open Source' },
  { id: 'mistral', name: 'Mistral AI', url: 'https://chat.mistral.ai/', icon: 'https://th.bing.com/th/id/ODF.1uQvC257VdsKKWl7YbWzPg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Open Source' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', icon: 'https://th.bing.com/th/id/ODF.YxK1MUJaRoBfBG4UGNrXAA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Open Source' },
  { id: 'lmsys', name: 'LMSYS Chat', url: 'https://chat.lmsys.org/', icon: 'https://th.bing.com/th/id/ODF.HX1F6ABunv1ieMmqjCr7LQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Open Source' },
  { id: 'ollama', name: 'Ollama', url: 'https://ollama.com/', icon: 'https://ollama.com/public/icon-32x32.png', category: 'Open Source' },
  { id: 'grok', name: 'Grok', url: 'https://grok.x.ai/', icon: 'https://abs.twimg.com/favicons/twitter.3.ico', category: 'Open Source' },
  { id: 'gemma', name: 'Gemma', url: 'https://ai.google.dev/gemma', icon: 'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png', category: 'Open Source' },
  { id: 'bloom', name: 'Bloom', url: 'https://huggingface.co/bigscience/bloom', icon: 'https://huggingface.co/front/assets/huggingface_logo.svg', category: 'Open Source' },
  { id: 'falcon-180b', name: 'Falcon 180B', url: 'https://huggingface.co/tiiuae/falcon-180B', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'vicuna', name: 'Vicuna', url: 'https://lmsys.org/blog/2023-03-30-vicuna/', icon: 'https://res.cloudinary.com/apideck/image/upload/w_128,f_auto/v1681061446/marketplaces/ckhg56iu1mkpc0b66vj7fsj3o/listings/vicuna-logo_y9rgxl.jpg', category: 'Open Source' },
  { id: 'wizardlm', name: 'WizardLM', url: 'https://github.com/nlpxucan/WizardLM', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'openchat', name: 'OpenChat', url: 'https://openchat.team/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'starling', name: 'Starling', url: 'https://starling.cs.berkeley.edu/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'zephyr', name: 'Zephyr', url: 'https://huggingface.co/HuggingFaceH4/zephyr-7b-beta', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'phi', name: 'Microsoft Phi', url: 'https://huggingface.co/microsoft/phi-2', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  { id: 'qwen', name: 'Qwen', url: 'https://qwen.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Open Source' },
  
  // Chinese AI Platforms
  { id: 'ernie', name: 'ERNIE Bot', url: 'https://yiyan.baidu.com/', icon: 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico', category: 'Chinese' },
  { id: 'tongyi', name: 'Tongyi Qianwen', url: 'https://tongyi.aliyun.com/', icon: 'https://th.bing.com/th/id/ODF.a0XoTjlOasGhig2jvgcaXw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Chinese' },
  { id: 'chatglm', name: 'ChatGLM', url: 'https://chatglm.cn/', icon: 'https://ai-bot.cn/wp-content/uploads/2023/08/zhipu-ai-chatglm-icon.png', category: 'Chinese' },
  { id: 'spark', name: 'iFlytek Spark', url: 'https://xinghuo.xfyun.cn/', icon: 'https://xinghuo.xfyun.cn/favicon.ico', category: 'Chinese' },
  { id: 'tiangong', name: 'Tiangong AI', url: 'https://www.tiangong.cn/', icon: 'https://www.tiangong.cn/favicon.ico', category: 'Chinese' },
  { id: 'sensechat', name: 'SenseChat', url: 'https://chat.sensetime.com/', icon: 'https://companieslogo.com/img/orig/0020.HK-d07a80bf.png?t=1750007384', category: 'Chinese' },
  { id: 'doubao', name: 'ByteDance Doubao', url: 'https://www.doubao.com/', icon: 'https://seeklogo.com/images/B/bytedance-logo-3245925843-seeklogo.com.png', category: 'Chinese' },
  { id: 'kimi', name: 'Kimi Chat', url: 'https://kimi.moonshot.cn/', icon: 'https://statics.moonshot.cn/kimi-chat/favicon.ico', category: 'Chinese' },
  { id: 'wenxin', name: 'Wenxin Yiyan', url: 'https://yiyan.baidu.com/', icon: 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico', category: 'Chinese' },
  { id: 'minimax', name: 'MiniMax', url: 'https://www.minimaxi.com/', icon: 'https://www.minimaxi.com/favicon.ico', category: 'Chinese' },
  { id: '01ai', name: 'Yi', url: 'https://www.01.ai/', icon: 'https://www.01.ai/favicon.ico', category: 'Chinese' },
  { id: 'step', name: 'StepChat', url: 'https://stepchat.cn/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'yuanbao', name: 'Yuanbao', url: 'https://yuanbao.tencent.com/', icon: 'https://yuanbao.tencent.com/favicon.ico', category: 'Chinese' },
  { id: 'baichuan', name: 'Baichuan', url: 'https://www.baichuan-ai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'skywork', name: 'Skywork', url: 'https://www.kunlun-inc.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'aquilachat', name: 'AquilaChat', url: 'https://model.baai.ac.cn/model-detail/100098', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'moss', name: 'MOSS', url: 'https://moss.fastnlp.top/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'ziya', name: 'Ziya-LLaMA', url: 'https://huggingface.co/IDEA-CCNL/Ziya-LLaMA-13B-v1', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'belle', name: 'BELLE', url: 'https://github.com/LianjiaTech/BELLE', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'taichu', name: 'Taichu', url: 'https://www.tju.edu.cn/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  { id: 'mengzi', name: 'Mengzi', url: 'https://www.langboat.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Chinese' },
  
  // Indian AI Platforms
  { id: 'bharatgpt', name: 'BharatGPT', url: 'https://bharatgpt.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'krutrim', name: 'Krutrim', url: 'https://www.olakrutrim.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'hanooman', name: 'Hanooman AI', url: 'https://www.seetalabs.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'ai4bharat', name: 'AI4Bharat', url: 'https://ai4bharat.iitm.ac.in/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'sarvam', name: 'Sarvam AI', url: 'https://www.sarvam.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'jugalbandi', name: 'Jugalbandi', url: 'https://www.jugalbandi.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  { id: 'airavata', name: 'Airavata', url: 'https://ai4bharat.iitm.ac.in/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Indian' },
  
  // Middle East & Arabic AI
  { id: 'jais', name: 'JAIS', url: 'https://inceptioniai.ai/jais/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  { id: 'falcon', name: 'Falcon AI', url: 'https://falconllm.tii.ae/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  { id: 'allam', name: 'ALLaM', url: 'https://www.sdaia.gov.sa/en/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  { id: 'humain', name: 'Humain Chat', url: 'https://humain.sa/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  { id: 'arabert', name: 'AraBERT', url: 'https://huggingface.co/aubmindlab/bert-base-arabertv2', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  { id: 'aragpt', name: 'AraGPT', url: 'https://github.com/aub-mind/arabert', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Arabic' },
  
  // Southeast Asian AI
  { id: 'sealion', name: 'SEA-LION', url: 'https://aisingapore.org/aiproducts/sea-lion/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Southeast Asian' },
  { id: 'seallm', name: 'SeaLLM', url: 'https://damo.alibaba.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Southeast Asian' },
  { id: 'seachat', name: 'SeaChat', url: 'https://www.seasalt.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Southeast Asian' },
  { id: 'seagull', name: 'SeaGULL', url: 'https://github.com/aisingapore/seagull', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Southeast Asian' },
  
  // Korean AI Platforms
  { id: 'clova', name: 'Clova X', url: 'https://clova-x.naver.com/', icon: 'https://th.bing.com/th/id/ODF.uK-_L73tIIHutUT4oNX8aQ?w=32&h=32&qlt=91&pcl=fffffa&o=6&pid=1.2', category: 'Korean' },
  { id: 'wrtn', name: 'Wrtn', url: 'https://wrtn.ai/', icon: 'https://th.bing.com/th/id/ODF.XZquXv8QTpZQMnMMqeKzCA?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Korean' },
  { id: 'exaone', name: 'Exaone', url: 'https://www.lgresearch.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Korean' },
  { id: 'hyperclova', name: 'HyperClova X', url: 'https://www.navercorp.com/service/clovaX', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Korean' },
  { id: 'kakaobrain', name: 'KoGPT', url: 'https://www.kakaobrain.com/', icon: 'https://avatars.githubusercontent.com/u/25736994?s=200&v=4', category: 'Korean' },
  { id: 'solar', name: 'Solar Pro', url: 'https://www.upstage.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Korean' },
  { id: 'polyglot', name: 'Polyglot-Ko', url: 'https://github.com/EleutherAI/polyglot', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Korean' },
 
  // Japanese AI Platforms
  { id: 'rinna', name: 'Rinna AI', url: 'https://rinna.co.jp/AI-rinna/', icon: 'https://th.bing.com/th/id/ODF.E-18kEsU8XoEnRg-exXcaQ?w=32&h=32&qlt=95&pcl=fffffa&o=6&pid=1.2', category: 'Japanese' },
  { id: 'sakana', name: 'Sakana AI', url: 'https://sakana.ai/', icon: 'https://th.bing.com/th/id/ODF.XxZFQYG73wfUy_KqLcf0FA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Japanese' },
  { id: 'rakuten', name: 'Rakuten AI', url: 'https://www.rakuten.co.jp/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Japanese' },
  { id: 'cyberagent', name: 'CyberAgent LLM', url: 'https://www.cyberagent.co.jp/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Japanese' },
  { id: 'japanese-stablelm', name: 'Japanese StableLM', url: 'https://ja.stability.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Japanese' },
  { id: 'pfn-plamo', name: 'PLaMo', url: 'https://www.preferred.jp/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Japanese' },
  
  // European AI Platforms
  { id: 'aleph-alpha', name: 'Aleph Alpha', url: 'https://www.aleph-alpha.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'European' },
  { id: 'lighton', name: 'LightOn', url: 'https://www.lighton.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'European' },
  { id: 'yandex', name: 'YandexGPT', url: 'https://ya.ru/', icon: 'https://ya.ru/favicon.ico', category: 'European' },
  { id: 'sber', name: 'GigaChat', url: 'https://developers.sber.ru/portal/products/gigachat', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'European' },
  { id: 'luminous', name: 'Luminous', url: 'https://www.aleph-alpha.com/luminous', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'European' },
   
  // Latin American AI
  { id: 'latamgpt', name: 'LatamGPT', url: 'https://cenia.cl/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Latin American' },
  { id: 'maritalk', name: 'Maritalk', url: 'https://www.maritaca.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Latin American' },
  { id: 'sabia', name: 'Sabiá', url: 'https://www.maritaca.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Latin American' },
  
  // African AI
  { id: 'lelapa', name: 'Lelapa AI', url: 'https://lelapa.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'African' },
  { id: 'jacaranda', name: 'Jacaranda', url: 'https://huggingface.co/Jacaranda', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'African' },
  
  // Specialized AI
  { id: 'character', name: 'Character.AI', url: 'https://character.ai/', icon: 'https://th.bing.com/th/id/ODF.4FRiwrgK3Me4b6XYmes99Q?w=32&h=32&qlt=91&pcl=fffffa&o=6&pid=1.2', category: 'Specialized' },
  { id: 'jasper', name: 'Jasper AI', url: 'https://www.jasper.ai/', icon: 'https://th.bing.com/th/id/ODF.CFvKPfBD5C9mk1xcsAtW4Q?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Specialized' },
  { id: 'writesonic', name: 'Writesonic', url: 'https://writesonic.com/', icon: 'https://th.bing.com/th/id/ODF.JYU10RC-b33sbBHymdZIWQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Specialized' },
  { id: 'copy', name: 'Copy.ai', url: 'https://www.copy.ai/', icon: 'https://th.bing.com/th/id/ODF.H-OYJYMVao8DcEE5sg5THw?w=32&h=32&qlt=93&pcl=fffffa&o=6&pid=1.2', category: 'Specialized' },
  { id: 'rytr', name: 'Rytr', url: 'https://rytr.me/', icon: 'https://th.bing.com/th/id/ODF.TQjGe2MAZu9duafCMOI1_A?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Specialized' },
  { id: 'chatpdf', name: 'ChatPDF', url: 'https://www.chatpdf.com/', icon: 'https://www.chatpdf.com/favicon.ico', category: 'Specialized' },
  { id: 'humata', name: 'Humata AI', url: 'https://www.humata.ai/', icon: 'https://www.humata.ai/favicon.ico', category: 'Specialized' },
  { id: 'chatdoc', name: 'ChatDOC', url: 'https://chatdoc.com/', icon: 'https://chatdoc.com/favicon.ico', category: 'Specialized' },
  { id: 'perplexity-labs', name: 'Perplexity Labs', url: 'https://labs.perplexity.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Specialized' },
  { id: 'anthropic-workbench', name: 'Claude Workbench', url: 'https://console.anthropic.com/workbench', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Specialized' },
  
  // Code-Focused AI
  { id: 'codeium', name: 'Codeium Chat', url: 'https://codeium.com/chat', icon: 'https://codeium.com/favicon.ico', category: 'Coding' },
  { id: 'tabnine', name: 'Tabnine', url: 'https://www.tabnine.com/', icon: 'https://www.tabnine.com/favicon.ico', category: 'Coding' },
  { id: 'replit', name: 'Replit AI', url: 'https://replit.com/ai', icon: 'https://th.bing.com/th/id/ODF._QFn8UDhgp1c8uNXe1mYBQ?w=32&h=32&qlt=94&pcl=fffffa&o=6&pid=1.2', category: 'Coding' },
  { id: 'cursor', name: 'Cursor', url: 'https://cursor.sh/', icon: 'https://cursor.sh/favicon.ico', category: 'Coding' },
  { id: 'github-copilot', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: 'https://github.githubassets.com/favicons/favicon.svg', category: 'Coding' },
  { id: 'codewhisperer', name: 'Amazon CodeWhisperer', url: 'https://aws.amazon.com/codewhisperer/', icon: 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico', category: 'Coding' },
  { id: 'codium', name: 'CodiumAI', url: 'https://www.codium.ai/', icon: 'https://www.codium.ai/favicon.ico', category: 'Coding' },
  { id: 'cody', name: 'Cody', url: 'https://sourcegraph.com/cody', icon: 'https://sourcegraph.com/.assets/img/sourcegraph-mark.svg', category: 'Coding' },
  { id: 'aider', name: 'Aider', url: 'https://aider.chat/', icon: 'https://th.bing.com/th/id/ODF.4ewYkV7KBEe1Yx0287wgyQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Coding' },
  { id: 'v0', name: 'v0', url: 'https://v0.dev/', icon: 'https://th.bing.com/th/id/ODF.RgpHXI8_426Zo2fodMuu7Q?w=32&h=32&qlt=91&pcl=fffffa&o=6&pid=1.2', category: 'Coding' },
  { id: 'bolt', name: 'Bolt.new', url: 'https://bolt.new/', icon: 'https://th.bing.com/th/id/ODF.uHp_E4IPfJHBvCfeKl_3rQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Coding' },
  { id: 'lovable', name: 'Lovable', url: 'https://lovable.dev/', icon: 'https://lovable.dev/favicon.ico', category: 'Coding' },
  { id: 'windsurf', name: 'Windsurf', url: 'https://codeium.com/windsurf', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'continue', name: 'Continue', url: 'https://continue.dev/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'phind-code', name: 'Phind AI', url: 'https://www.phind.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'blackbox', name: 'Blackbox AI', url: 'https://www.blackbox.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'codegpt', name: 'CodeGPT', url: 'https://codegpt.co/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'aicode', name: 'aiXcoder', url: 'https://www.aixcoder.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'mintlify', name: 'Mintlify', url: 'https://mintlify.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  { id: 'codepal', name: 'CodePal', url: 'https://codepal.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Coding' },
  
  // Educational AI
  { id: 'khanmigo', name: 'Khanmigo', url: 'https://www.khanacademy.org/khan-labs', icon: 'https://cdn.kastatic.org/images/favicon.ico', category: 'Education' },
  { id: 'socratic', name: 'Socratic', url: 'https://socratic.org/', icon: 'https://th.bing.com/th/id/ODF.i8c2Bw0gF-1P1hRvbKucwQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Education' },
  { id: 'quizlet', name: 'Quizlet AI', url: 'https://quizlet.com/', icon: 'https://quizlet.com/favicon.ico', category: 'Education' },
  { id: 'gradescope', name: 'Gradescope AI', url: 'https://www.gradescope.com/', icon: 'https://www.gradescope.com/favicon.ico', category: 'Education' },
  { id: 'tutorly', name: 'Tutorly.ai', url: 'https://www.tutorly.ai/', icon: 'https://www.tutorly.ai/favicon.ico', category: 'Education' },
  { id: 'duolingo', name: 'Duolingo Max', url: 'https://www.duolingo.com/max', icon: 'https://www.duolingo.com/favicon.ico', category: 'Education' },
  { id: 'mathway', name: 'Mathway', url: 'https://www.mathway.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Education' },
  { id: 'studymonkey', name: 'StudyMonkey', url: 'https://studymonkey.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Education' },
  { id: 'tutoreva', name: 'TutorEva', url: 'https://www.tutoreva.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Education' },
  { id: 'gauth', name: 'Gauth', url: 'https://www.gauthmath.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Education' },
  { id: 'aimath', name: 'AI Math', url: 'https://aimath.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Education' },
  
  // Creative AI
  { id: 'midjourney', name: 'Midjourney', url: 'https://www.midjourney.com/', icon: 'https://th.bing.com/th/id/ODF.3sJnfMVcw7tOfxzyjgrHag?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Creative' },
  { id: 'dall-e', name: 'DALL-E', url: 'https://labs.openai.com/', icon: 'https://bnassets.botnation.ai/images/chatgpt/dalle_logo.5e04f948b52798a99daa191458aa46e77cd15d65.gif?cache=0', category: 'Creative' },
  { id: 'leonardo', name: 'Leonardo.ai', url: 'https://leonardo.ai/', icon: 'https://leonardo.ai/favicon.ico', category: 'Creative' },
  { id: 'playground', name: 'Playground AI', url: 'https://playgroundai.com/', icon: 'https://playgroundai.com/favicon.ico', category: 'Creative' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', url: 'https://stablediffusionweb.com/', icon: 'https://stablediffusionweb.com/favicon.ico', category: 'Creative' },
  { id: 'ideogram', name: 'Ideogram', url: 'https://ideogram.ai/', icon: 'https://th.bing.com/th/id/ODF.sVt4rldtyd5IxlFM7rfnFg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Creative' },
  { id: 'flux', name: 'Flux', url: 'https://flux.black-forest-labs.com/', icon: 'https://th.bing.com/th/id/ODF.sHDv6SoS0-R48rl2JTDNhw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Creative' },
  { id: 'runway', name: 'Runway', url: 'https://app.runwayml.com/signup', icon: 'https://th.bing.com/th/id/ODF.ElkxoMb-OM3VP1fnsexcIA?w=32&h=32&qlt=91&pcl=fffffa&o=6&pid=1.2', category: 'Creative' },
  { id: 'pika', name: 'Pika', url: 'https://pika.art/', icon: 'https://pika.art/favicon.ico', category: 'Creative' },
  { id: 'sora', name: 'Sora', url: 'https://openai.com/sora', icon: 'https://tse1.mm.bing.net/th/id/OIP.iYq3DNSi5IgMfFafLsXSNQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', category: 'Creative' },
  { id: 'kling', name: 'Kling AI', url: 'https://klingai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'luma', name: 'Luma Dream Machine', url: 'https://lumalabs.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'veo', name: 'Google Veo', url: 'https://deepmind.google/technologies/veo/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'genmo', name: 'Genmo', url: 'https://www.genmo.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'civitai', name: 'CivitAI', url: 'https://civitai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'artbreeder', name: 'Artbreeder', url: 'https://www.artbreeder.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'craiyon', name: 'Craiyon', url: 'https://www.craiyon.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  { id: 'deepai', name: 'DeepAI', url: 'https://deepai.org/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Creative' },
  
  // Voice & Audio AI
  { id: 'elevenlabs', name: 'ElevenLabs', url: 'https://elevenlabs.io/', icon: 'https://elevenlabs.io/favicon.ico', category: 'Voice' },
  { id: 'murf', name: 'Murf AI', url: 'https://murf.ai/', icon: 'https://th.bing.com/th/id/ODF.yCdMjPhiGRvHAaGkir1__A?w=32&h=32&o=6&pid=AdsPlus', category: 'Voice' },
  { id: 'resemble', name: 'Resemble AI', url: 'https://www.resemble.ai/', icon: 'https://10web.io/wp-content/uploads/2024/07/Resemble_AI.png', category: 'Voice' },
  { id: 'descript', name: 'Descript', url: 'https://www.descript.com/', icon: 'https://th.bing.com/th/id/ODF.MwUvUcqOXm7NDLqb9R8v6Q?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Voice' },
  { id: 'speechify', name: 'Speechify', url: 'https://speechify.com/', icon: 'https://speechify.com/favicon.ico', category: 'Voice' },
  { id: 'play-ht', name: 'Play.ht', url: 'https://play.ht/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  { id: 'wellsaid', name: 'WellSaid Labs', url: 'https://wellsaidlabs.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  { id: 'voice-ai', name: 'Voice.ai', url: 'https://voice.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  { id: 'suno', name: 'Suno AI', url: 'https://www.suno.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  { id: 'udio', name: 'Udio', url: 'https://www.udio.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  { id: 'audiobox', name: 'AudioBox', url: 'https://audiobox.metademolab.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Voice' },
  
  // Experimental & Research
  { id: 'pi', name: 'Pi (Inflection)', url: 'https://pi.ai/', icon: 'https://th.bing.com/th/id/ODF.iBZdyeyAhzJZ3-7hSw_NgQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Experimental' },
  { id: 'cohere', name: 'Cohere Chat', url: 'https://coral.cohere.com/', icon: 'https://th.bing.com/th/id/ODF.7dhXfTg-kOAs1r7jwE7dmA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Experimental' },
  { id: 'ai21', name: 'AI21 Studio', url: 'https://studio.ai21.com/', icon: 'https://th.bing.com/th/id/ODF.2aOCWHKp23wSxD6Zx06vEw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Experimental' },
  { id: 'openrouter', name: 'OpenRouter', url: 'https://openrouter.ai/', icon: 'https://openrouter.ai/favicon.ico', category: 'Experimental' },
  { id: 'together', name: 'Together AI', url: 'https://www.together.ai/', icon: 'https://th.bing.com/th/id/ODF.pig0nnIrfHMVF3MgAf3eTg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Experimental' },
  { id: 'fireworks', name: 'Fireworks AI', url: 'https://fireworks.ai/', icon: 'https://fireworks.ai/favicon.ico', category: 'Experimental' },
  { id: 'replicate', name: 'Replicate', url: 'https://replicate.com/', icon: 'https://th.bing.com/th/id/ODF.QV2HMKeZiS85NOkilQLeNg?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Experimental' },
  { id: 'groq', name: 'Groq', url: 'https://groq.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Experimental' },
  { id: 'anyscale', name: 'Anyscale', url: 'https://www.anyscale.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Experimental' },
  { id: 'cerebras', name: 'Cerebras', url: 'https://www.cerebras.net/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Experimental' },
  { id: 'sambanova', name: 'SambaNova', url: 'https://sambanova.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Experimental' },
  
  // Productivity AI
  { id: 'notion', name: 'Notion AI', url: 'https://www.notion.so/product/ai', icon: 'https://www.notion.so/images/favicon.ico', category: 'Productivity' },
  { id: 'mem', name: 'Mem', url: 'https://get.mem.ai/', icon: 'https://th.bing.com/th/id/ODF.CUmjLed5Wp-voGxizsY6jw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Productivity' },
  { id: 'otter', name: 'Otter.ai', url: 'https://otter.ai/', icon: 'https://otter.ai/favicon.ico', category: 'Productivity' },
  { id: 'fireflies', name: 'Fireflies.ai', url: 'https://fireflies.ai/', icon: 'https://fireflies.ai/favicon.ico', category: 'Productivity' },
  { id: 'grammarly', name: 'Grammarly', url: 'https://www.grammarly.com/', icon: 'https://th.bing.com/th/id/ODF.JzWVgzsJoqi__tApX3BPvA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Productivity' },
  { id: 'wordtune', name: 'Wordtune', url: 'https://www.wordtune.com/', icon: 'https://th.bing.com/th/id/ODF.cDrJiyoQZ6pVi6dovvI-Ag?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Productivity' },
  { id: 'chatbase', name: 'Chatbase', url: 'https://www.chatbase.co/', icon: 'https://www.chatbase.co/favicon.ico', category: 'Productivity' },
  { id: 'reclaim', name: 'Reclaim AI', url: 'https://reclaim.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Productivity' },
  { id: 'tldv', name: 'tl;dv', url: 'https://tldv.io/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Productivity' },
  { id: 'sembly', name: 'Sembly AI', url: 'https://www.sembly.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Productivity' },
  { id: 'voiceflow', name: 'Voiceflow', url: 'https://www.voiceflow.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Productivity' },
  
  // Business & Enterprise
  { id: 'harvey', name: 'Harvey AI', url: 'https://www.harvey.ai/', icon: 'https://th.bing.com/th/id/ODF.h-e3jCd-MNfs2FaGqdYLiA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Business' },
  { id: 'intercom', name: 'Intercom AI', url: 'https://www.intercom.com/ai', icon: 'https://th.bing.com/th/id/ODF.WG6z74mbh9EhFHl_o7_r8w?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Business' },
  { id: 'drift', name: 'Drift', url: 'https://www.drift.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  { id: 'ada', name: 'Ada', url: 'https://www.ada.cx/', icon: 'https://th.bing.com/th/id/ODF.FX5skWkp3UgBHLQtJM8Jzw?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2', category: 'Business' },
  { id: 'salesforce-einstein', name: 'Einstein GPT', url: 'https://www.salesforce.com/einstein/', icon: 'https://www.salesforce.com/favicon.ico', category: 'Business' },
  { id: 'zendesk-ai', name: 'Zendesk AI', url: 'https://www.zendesk.com/service/ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  { id: 'glean', name: 'Glean', url: 'https://www.glean.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  { id: 'moveworks', name: 'Moveworks', url: 'https://www.moveworks.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  { id: 'cresta', name: 'Cresta', url: 'https://cresta.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  { id: 'observe', name: 'Observe.AI', url: 'https://www.observe.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Business' },
  
  // Developer Platforms
  { id: 'anthropic-console', name: 'Claude API Playground', url: 'https://console.anthropic.com/', icon: 'https://play-lh.googleusercontent.com/4S1nfdKsH_1tJodkHrBHimqlCTE6qx6z22zpMyPaMc_Rlr1EdSFDI1I6UEVMnokG5zI=w240-h480', category: 'Developer' },
  { id: 'openai-playground', name: 'OpenAI Playground', url: 'https://platform.openai.com/playground', icon: 'https://latestlogo.com/wp-content/uploads/2024/01/openai-icon.png', category: 'Developer' },
  { id: 'vercel-ai', name: 'Vercel AI', url: 'https://sdk.vercel.ai/', icon: 'https://vercel.com/favicon.ico', category: 'Developer' },
  { id: 'langchain', name: 'LangChain', url: 'https://www.langchain.com/', icon: 'https://th.bing.com/th/id/ODF.EmVY4N_nJ-gjB7_yqN4JfQ?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Developer' },
  { id: 'llamaindex', name: 'LlamaIndex', url: 'https://www.llamaindex.ai/', icon: 'https://www.llamaindex.ai/favicon.ico', category: 'Developer' },
  { id: 'haystack', name: 'Haystack', url: 'https://haystack.deepset.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'semantic-kernel', name: 'Semantic Kernel', url: 'https://github.com/microsoft/semantic-kernel', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'autogen', name: 'AutoGen', url: 'https://microsoft.github.io/autogen/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'langfuse', name: 'Langfuse', url: 'https://langfuse.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'helicone', name: 'Helicone', url: 'https://www.helicone.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'promptlayer', name: 'PromptLayer', url: 'https://promptlayer.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },
  { id: 'weights-biases', name: 'Weights & Biases', url: 'https://wandb.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Developer' },

  // Healthcare AI
  { id: 'glass-health', name: 'Glass Health', url: 'https://glass.health/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Healthcare' },
  { id: 'nabla', name: 'Nabla', url: 'https://www.nabla.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Healthcare' },
  { id: 'hippocratic', name: 'Hippocratic AI', url: 'https://www.hippocraticai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Healthcare' },
  { id: 'ambience', name: 'Ambience Healthcare', url: 'https://www.ambiencehealthcare.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Healthcare' },
  
  // Legal AI
  { id: 'casetext', name: 'CaseText', url: 'https://casetext.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Legal' },
  { id: 'lexion', name: 'Lexion', url: 'https://www.lexion.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Legal' },
  { id: 'lawyaw', name: 'Lawyaw', url: 'https://www.lawyaw.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Legal' },
  
  // Finance AI
  { id: 'bloomberg-gpt', name: 'BloombergGPT', url: 'https://www.bloomberg.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Finance' },
  { id: 'alphasense', name: 'AlphaSense', url: 'https://www.alpha-sense.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Finance' },
  { id: 'kensho', name: 'Kensho', url: 'https://www.kensho.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Finance' },
  
  // Data Analysis AI
  { id: 'julius', name: 'Julius AI', url: 'https://julius.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Data' },
  { id: 'rows', name: 'Rows', url: 'https://rows.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Data' },
  { id: 'equals', name: 'Equals AI', url: 'https://equals.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Data' },
  { id: 'akkio', name: 'Akkio', url: 'https://www.akkio.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Data' },
  
  // Design AI
  { id: 'uizard', name: 'Uizard', url: 'https://uizard.io/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Design' },
  { id: 'galileo', name: 'Galileo AI', url: 'https://www.usegalileo.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Design' },
  { id: 'diagram', name: 'Diagram', url: 'https://diagram.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Design' },
  { id: 'magician', name: 'Magician', url: 'https://magician.design/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Design' },
  
  // Translation AI
  { id: 'deepl', name: 'DeepL', url: 'https://www.deepl.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Translation' },
  { id: 'papago', name: 'Papago', url: 'https://papago.naver.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Translation' },
  { id: 'unbabel', name: 'Unbabel', url: 'https://unbabel.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Translation' },
  
  // Agent Frameworks
  { id: 'crew-ai', name: 'CrewAI', url: 'https://www.crewai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'superagi', name: 'SuperAGI', url: 'https://superagi.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'agentgpt', name: 'AgentGPT', url: 'https://agentgpt.reworkd.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'auto-gpt', name: 'Auto-GPT', url: 'https://github.com/Significant-Gravitas/AutoGPT', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'babyagi', name: 'BabyAGI', url: 'https://github.com/yoheinakajima/babyagi', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'langflow', name: 'Langflow', url: 'https://www.langflow.org/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  { id: 'flowise', name: 'Flowise', url: 'https://flowiseai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Agents' },
  
  // Local/Offline AI
  { id: 'jan', name: 'Jan', url: 'https://jan.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Local' },
  { id: 'lm-studio', name: 'LM Studio', url: 'https://lmstudio.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Local' },
  { id: 'gpt4all', name: 'GPT4All', url: 'https://gpt4all.io/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Local' },
  { id: 'privateai', name: 'PrivateAI', url: 'https://www.private-ai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Local' },
  { id: 'text-generation-webui', name: 'Text Gen WebUI', url: 'https://github.com/oobabooga/text-generation-webui', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Local' },
  
  // Search Engines with AI
  { id: 'brave-leo', name: 'Brave Leo', url: 'https://brave.com/leo/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
  { id: 'neeva', name: 'Neeva', url: 'https://neeva.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
  { id: 'waldo', name: 'Waldo', url: 'https://waldo.fyi/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Search' },
  
  // Robotics AI
  { id: 'figure-ai', name: 'Figure AI', url: 'https://www.figure.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Robotics' },
  { id: '1x-technologies', name: '1X Technologies', url: 'https://www.1x.tech/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Robotics' },
  
  // Climate & Science AI
  { id: 'climate-ai', name: 'ClimateAI', url: 'https://climate.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Science' },
  { id: 'deepmind-alphafold', name: 'AlphaFold', url: 'https://alphafold.ebi.ac.uk/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Science' },
  
  // Gaming AI
  { id: 'scenario', name: 'Scenario', url: 'https://www.scenario.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Gaming' },
  { id: 'promethean-ai', name: 'Promethean AI', url: 'https://www.prometheanai.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Gaming' },
  { id: 'inworld', name: 'Inworld AI', url: 'https://www.inworld.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Gaming' },
  { id: 'charisma', name: 'Charisma.ai', url: 'https://charisma.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Gaming' },
  
  // Social & Companion AI
  { id: 'replika', name: 'Replika', url: 'https://replika.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Social' },
  { id: 'kindroid', name: 'Kindroid', url: 'https://kindroid.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Social' },
  { id: 'nomi', name: 'Nomi AI', url: 'https://nomi.ai/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Social' },
  { id: 'chai', name: 'Chai', url: 'https://www.chai-research.com/', icon: 'https://pngfre.com/wp-content/uploads/question-mark-42-1024x1024.png', category: 'Social' },
];

// Mock stock data generator for demonstration
const generateMockStocks = () => {
  const symbols = [
    // Tech Giants
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX', 'AMD', 'INTC', 
    'CRM', 'ORCL', 'ADBE', 'CSCO', 'AVGO', 'QCOM', 'TXN', 'IBM', 'INTU', 'NOW',
    // Finance
    'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'BLK', 'SCHW', 'AXP', 'V', 'MA', 'PYPL',
    // Healthcare & Pharma
    'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'LLY', 'ABT', 'DHR', 'BMY', 'AMGN',
    // Consumer & Retail
    'WMT', 'HD', 'PG', 'KO', 'PEP', 'COST', 'MCD', 'NKE', 'SBUX', 'TGT', 'LOW',
    // Energy
    'XOM', 'CVX', 'COP', 'SLB', 'EOG', 'PXD', 'MPC', 'PSX', 'VLO', 'OXY',
    // Industrial
    'BA', 'HON', 'UPS', 'CAT', 'DE', 'GE', 'MMM', 'LMT', 'RTX', 'FDX',
    // Media & Entertainment
    'DIS', 'CMCSA', 'T', 'VZ', 'TMUS', 'NFLX', 'WBD', 'PARA', 'FOXA',
    // Automotive
    'TSLA', 'F', 'GM', 'TM', 'HMC', 'RIVN', 'LCID',
    // Semiconductor
    'NVDA', 'AMD', 'INTC', 'TSM', 'AVGO', 'QCOM', 'MU', 'AMAT', 'LRCX', 'KLAC',
    // E-commerce & Payment
    'AMZN', 'BABA', 'SHOP', 'MELI', 'SQ', 'PYPL', 'EBAY',
    // Cloud & Software
    'CRM', 'NOW', 'SNOW', 'DDOG', 'PLTR', 'U', 'NET', 'ZS', 'CRWD', 'OKTA',
    // Social Media
    'META', 'SNAP', 'PINS', 'RDDT',
    // Biotech
    'GILD', 'VRTX', 'REGN', 'BIIB', 'MRNA', 'BNTX',
    // Aerospace
    'BA', 'LMT', 'NOC', 'GD', 'RTX', 'TDG',
    // Luxury & Apparel
    'NKE', 'LULU', 'TJX', 'ROST',
    // REITs
    'PLD', 'AMT', 'CCI', 'EQIX', 'PSA', 'O',
    // Crypto Related
    'COIN', 'MSTR', 'RIOT', 'MARA',
    // ETFs
    'SPY', 'QQQ', 'DIA', 'IWM', 'VTI', 'VOO',
    // International
    'TSM', 'ASML', 'NVO', 'SAP', 'TM', 'SONY', 'SNY'
  ];
  return symbols.map(symbol => {
    const basePrice = Math.random() * 500 + 100;
    const change = (Math.random() - 0.5) * 10;
    const percentChange = (change / basePrice) * 100;
    
    return {
      symbol,
      price: basePrice.toFixed(2),
      change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
      percent: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
      isUp: change >= 0
    };
  });
};

function App() {
  const [activeLLMs, setActiveLLMs] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState(generateMockStocks());
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showThemes, setShowThemes] = useState(true);

  const categories = ['All', ...new Set(ALL_LLMS.map(llm => llm.category))].sort();

  // Auto-hide intro after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const filteredLLMs = ALL_LLMS.filter(llm => {
    const matchesCategory = selectedCategory === 'All' || llm.category === selectedCategory;
    const matchesSearch = llm.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const API_KEY = 'ct9pr41r01qnhfe93jagct9pr41r01qnhfe93jb0';
        const symbols = [
          'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX', 'AMD', 'INTC',
          'JPM', 'BAC', 'V', 'MA', 'WMT', 'HD', 'DIS', 'BA', 'KO', 'PEP',
          'COST', 'NKE', 'MCD', 'SBUX', 'XOM', 'CVX', 'JNJ', 'UNH', 'PFE', 'ABBV'
        ];
        
        const stockData = [];
        
        for (let i = 0; i < symbols.length; i++) {
          try {
            const symbol = symbols[i];
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await response.json();
            
            if (data.c && data.c > 0) {
              const currentPrice = data.c;
              const change = data.d || 0;
              const percentChange = data.dp || 0;
              
              stockData.push({
                symbol,
                price: currentPrice.toFixed(2),
                change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
                percent: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
                isUp: change >= 0
              });
            }
            
            if (i < symbols.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } catch (err) {
            console.error(`Error fetching ${symbols[i]}:`, err);
          }
        }
        
        if (stockData.length > 0) {
          console.log(`Updated with ${stockData.length} real-time stocks`);
          setStocks(stockData);
        }
        
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e, llm) => {
    setDraggedItem(llm);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && !activeLLMs.find(llm => llm.id === draggedItem.id)) {
      setActiveLLMs([...activeLLMs, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeLLM = (id) => {
    setActiveLLMs(activeLLMs.filter(llm => llm.id !== id));
  };

  const openInNewWindow = (llm) => {
    const w = 1000, h = 800;
    const left = (window.screen.width - w) / 2;
    const top = (window.screen.height - h) / 2;
    window.open(llm.url, `llm_${llm.id}`, `width=${w},height=${h},left=${left},top=${top}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Animated Intro Screen */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black intro-screen">
          <div className="text-center space-y-6 px-8">
            <div className="intro-logo">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-400 sparkle-intro" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold golden-glow-intro intro-title">
              AiQuasarous Global
            </h1>
            <p className="text-2xl text-gray-200 intro-subtitle font-serif italic tracking-wide">
              Drag-drop-open your favorite Model
            </p>
            <p className="text-xl text-yellow-300 intro-count font-light tracking-widest uppercase">
              {ALL_LLMS.length} AI platforms available worldwide
            </p>
            <div className="flex justify-center gap-2 mt-8 intro-dots">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Top LLM Banner */}
      <div className="h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative border-b border-gray-700">
        <div className="absolute inset-0 flex items-center">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...ALL_LLMS, ...ALL_LLMS, ...ALL_LLMS].map((llm, index) => (
              <div key={`${llm.id}-${index}`} className="inline-flex items-center gap-3 px-6 py-2 mx-2 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                <img 
                  src={llm.icon} 
                  alt={llm.name} 
                  className="w-6 h-6 rounded" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
                <span className="font-medium text-white text-sm">{llm.name}</span>
                <span className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">{llm.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold golden-glow whitespace-nowrap">
                AiQuasarous Global
              </h1>
              <a 
                href="https://github.com/algorembrant/AiQG-v1.0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                title="Support this project on GitHub"
              >
                <Github className="w-4 h-4" />
                Star
              </a>
            </div>
            <p className="text-sm text-gray-600">Drag-drop-open your favorite Model</p>
            <p className="text-xs text-gray-500 mt-1">{ALL_LLMS.length} AI platforms available worldwide</p>
          </div>

          <div className="px-4 py-3 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Themes</span>
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="text-xs text-gray-600 hover:text-gray-900 underline"
              >
                {showThemes ? 'Hide' : 'Show'}
              </button>
            </div>
            {showThemes && (
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredLLMs.map(llm => (
                <div
                  key={llm.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, llm)}
                  className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-gray-400 hover:shadow-sm transition-all bg-white"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={llm.icon} 
                      alt={llm.name} 
                      className="w-8 h-8 rounded-lg flex-shrink-0" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }} 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{llm.name}</h3>
                      <span className="text-xs text-gray-500">{llm.category}</span>
                    </div>
                    <Grip className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
            <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Layout className="w-5 h-5" />
            </button>
            <div className="text-sm text-gray-600">
              {activeLLMs.length} {activeLLMs.length === 1 ? 'model' : 'models'}
            </div>
            <button onClick={() => setActiveLLMs([])} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Clear All
            </button>
          </div>

          <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex-1 overflow-hidden">
            {activeLLMs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Drop AI models here</p>
                  <p className="text-sm mt-2">Drag from sidebar to compare</p>
                </div>
              </div>
            ) : (
              <div className={`h-full grid gap-2 p-2 ${
                activeLLMs.length === 1 ? 'grid-cols-1' :
                activeLLMs.length === 2 ? 'grid-cols-2' :
                activeLLMs.length === 3 ? 'grid-cols-3' :
                activeLLMs.length === 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3'
              }`}>
                {activeLLMs.map((llm) => (
                  <div key={llm.id} className="relative border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
                    <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <img 
                          src={llm.icon} 
                          alt={llm.name} 
                          className="w-5 h-5 rounded" 
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                        <span className="font-medium text-sm">{llm.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openInNewWindow(llm)} className="p-1.5 hover:bg-gray-200 rounded" title="Open in new window">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeLLM(llm.id)} className="p-1.5 hover:bg-gray-200 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 relative bg-gray-50">
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center space-y-4">
                          <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Direct Embedding Not Available</h3>
                            <p className="text-sm text-gray-600 mb-4">Cannot embed due to security restrictions</p>
                            <div className="space-y-2">
                              <button onClick={() => openInNewWindow(llm)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Open in New Window
                              </button>
                              <a href={llm.url} target="_blank" rel="noopener noreferrer" className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-center text-sm">
                                Open in New Tab
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stock Ticker */}
      <div className="h-10 bg-gray-900 overflow-hidden relative border-t border-gray-700">
        <div className="absolute inset-0 flex items-center">
          {stocks.length > 0 && (
            <div className="flex animate-scroll-reverse whitespace-nowrap">
              {[...stocks, ...stocks, ...stocks, ...stocks, ...stocks].map((stock, index) => (
                <div key={`${stock.symbol}-${index}`} className="inline-flex items-center gap-2 px-4 py-1 mx-2 text-sm">
                  <span className="font-semibold text-white">{stock.symbol}</span>
                  <span className="text-gray-300">${stock.price}</span>
                  <span className={`flex items-center gap-1 ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stock.change} ({stock.percent})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.6),
                         0 0 10px rgba(255, 215, 0, 0.4);
          }
          50% { 
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.8),
                         0 0 15px rgba(255, 215, 0, 0.5);
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow-pulse-big {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                         0 0 40px rgba(255, 215, 0, 0.6),
                         0 0 60px rgba(255, 215, 0, 0.4);
          }
          50% { 
            text-shadow: 0 0 30px rgba(255, 215, 0, 1),
                         0 0 60px rgba(255, 215, 0, 0.8),
                         0 0 90px rgba(255, 215, 0, 0.6);
          }
        }

        .intro-screen {
          animation: fadeOut 0.8s ease-in-out 3.2s forwards;
        }

        .intro-logo {
          animation: scaleIn 0.6s ease-out;
        }

        .sparkle-intro {
          animation: sparkle 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
        }

        .intro-title {
          animation: slideUp 0.8s ease-out 0.3s both;
        }

        .intro-subtitle {
          animation: slideUp 0.8s ease-out 0.6s both;
          text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
        }

        .intro-count {
          animation: slideUp 0.8s ease-out 0.9s both;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                       0 2px 10px rgba(255, 215, 0, 0.3);
          letter-spacing: 0.15em;
        }

        .intro-dots {
          animation: fadeIn 0.8s ease-out 1.2s both;
        }

        .golden-glow {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffa500 50%, #ffed4e 75%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow-pulse 2s ease-in-out infinite, gradient-shift 3s ease infinite;
          position: relative;
        }

        .golden-glow-intro {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffa500 50%, #ffed4e 75%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow-pulse-big 2s ease-in-out infinite, gradient-shift 3s ease infinite;
          position: relative;
        }

        .sparkle-icon {
          color: #ffd700;
          animation: sparkle 2s ease-in-out infinite;
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.8));
        }

        .animate-scroll {
          animation: scroll 500s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scroll-reverse 500s linear infinite;
        }

        .animate-scroll:hover,
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default App;