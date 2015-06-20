---
layout: post
title: 萌語の個人的メモ
date: 2014-06-20
---

※ モヤ氏によって設計されている萌語の個人的なメモ。ここでいう萌語は統語論厳密のほうで、kiskrunの方。

## 構文論

sentence ← ai sentence conjunction sentence au / (interjection)* verb (noun)*  
verb ← i word? o value (interjection)*  
noun ← i word? a value (interjection)*  
conjunction ← i word? u  
value ← ai value conjunction value au /  
   ai value value au / ai sentence au / word   
interjection ← i word? e value  
word ← cmevla / (ei cmevla+)? brivla  

-----

恐らく「text ← sentence*」というのが抜けている。

構造括弧が ai .. au。

述語、項、接続詞には開始マーカーとして i があり、  
それぞれに o, a, u が品詞マーカーとしてさらに割り当てられている。  
そのため、word自体に形態論的な区別はない、はず。

## 語彙メモ

萌語では同じくモヤ氏によって開発されたS語根を語彙として用いる。  
現在公開されている限りでは、5種くらいに分かれている（<a href="https://onedrive.live.com/view.aspx?resid=9C3F8BE2B10E2F75!6749&ithint=file%2cxlsx&app=Excel&authkey=!AP1KJWaPdNANHjQ">S語根</a>）：

- feismerke : 包み語。特定の単語の並びを省略する単語。糖衣構文を形成する単語。（cvv, ccv, ccvv, vccv, -cv, cv）
- feisfilte : 合成語でない単純語。（cvccv, ccvccv, cvvccv, cvvccv, ccvvccv, ccvvccv）
- feizdispu : 合成語、複合語（今のところ cvvccvccv のみ確認）
- feistaiste : 外来語
- feiskerte : 名称語 (おそらく、語末が子音）

多分まだ外来語はない。

名称語も３語だけで、kiskrun（厳密萌語）、kistel（曖昧萌語）、feismsaus（S語根）がある。

単純語（feisfilte）はレベルがあり、レベルが低いほど発音がしやすい単語（だったはず）。  
S語根は発音のしやすさで単語を数レベルに分け、低レベルのものから順に重要（普遍的）な概念を対応させている（はず）。

## 意味論メモ

以下はモヤ氏がツイッターで述べていたこと：

- NA順。
- ia,ioは発音の関係上ya,yoとしてよい。
- iaの意味は、絶対格。
- ioの意味は、直接法（事実について言及）
- 文頭にいきなりwordが来た場合は、ioが省略されてるものとみなす。

（ここまで）

以下、生姜による独自考察。

### nounとverbについて

verb, noun の構文にある"word?"はそれぞれ法と格を明示する語が入るはず。  
ここでいう word は "cmevla" か "brivla"（とcmevlaの複合体）なわけだが、  
これはkiskrunでいえば、 

- cmevla = feiskerte
- brivla = feisfilte & feizdispu

だろう。feistaiste（外来語）がどちらに属するかは不明。多分 brivla ？

しかしながら、実際のところは、cmevlaでもbrivlaでもないfeismerkeが多用されるだろう。  
feismerke はロジバンでいえば… ma'ovla かしら。

たとえば、verbの構文、"i word? o value" の "word? o"は法を司るfeismerke:

- to : 必然を性す法。
- go : 推奨を表す法。価値判断の法の一つ。
- xo : 接続法。事実判断を保留した単なる命題を表す。
- po : 可能性を表す法。
- mo : 義務を表す法。価値判断の法の一つ。
- ro : 許可を表す法。価値判断の法の一つ。

に置換されうる。なので、あの形式文法は厳密にいえば、

verb ← i (word? o / modal-feismerke) value

にすべきだと思われる。さらに、"io"は省略可能なので、

verb ← (i (word? o / modal-feismerke))? value

とするのが現実的かなと思う。

同様に、nounについても、"word? a"は格を司るfeismerke:

- sa : 動作主の格
- la : 条件格
- ka : 起点格
- fa : 終点格
- ba : 具格

に置換されうるので、

noun ← i (word? a / case-feismerke) value

とすべきだろう。

なお、ia (i a), io (i o) はそれぞれ絶対格、直接法を表す。

### チェックサム冠詞

不明。

### n対接辞

不明。

### 相表現

相表現は今のところ（15/06/20)、

- kli- : 状態
- pru- : atelicな動作
- tre- : telicな動作の継続相
- flu- : telicな動作の完了相

が収録されている。

### 関係詞

fau が feismerkeとして登録されているが、使い方は不明。

### 代名詞

それっぽいものとして、feismerkeに

- toi : 既出の対象を指示
- pei : 新出の対象を指示
- sai : あなた
- mai : 私
- xei : 疑問詞

がある。これが feismerke である理由は不明だが、  
verbのvalueとして使えないという理由（つまり nounのvalueにのみ適合）からだろう。

### 数表現

数は、接尾辞が用意されている。

- -nu : 0
- -ti : 1
- -ku : 2
- -pa : 3
- -fe : 4
- -so : 5
- -gi : 6
- -bo : 7
- -li : 8
- -da : 9

これの使い方は詳細には分からないが、feismerke に

- empo : 数詞開始タグ

があるので、数詞として（つまり、数をnounとして）用いる場合は

emponu, empoti, empoku, ...

とする（のかもしれない）。

一方で、nounの量化としての用法は未確認ではあるが、おそらく noun に数接尾辞をつけるのだろう。

全称が "lau" で接尾辞でない点はよく分からない。  
個人的には「２以上の」という接尾辞をつくって、複数対象指示の明示ができるといいかなと思った。

-----

形式文法自体には、feismerke は登場しないが、kiskrunにとって重要な要素だと思うので、  
しっかりと形式文法に組み込む必要があるように思う。

というか、形式文法で書くことの強みは、「何がどれの構文糖衣か」を示せることだと思うので、  
構文糖衣な語を形式文法上で表さないというのは勿体無い気がする。