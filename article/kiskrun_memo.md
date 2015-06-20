---
layout: post
title: 萌語の個人的メモ
date: 2015-06-20
revised_date: 2015-06-20
---

15/06/20 ver1.0
15/06/20 ver1.01 すぐさまモヤ氏からいくつかレスポンスがあったので追記。

※ モヤ氏によって設計されている萌語の個人的なメモ。ここでいう萌語は統語論厳密のほうで、kiskrunの方。

## 音韻論

以下はすべてモヤ氏のツイートの引用である。

使う音素はロジバンと同じ。  
音節の頭で使える二重子音はXlとYrの2種類のみである。  
Xはpbfvkgが、Yはこれらにtdを加えたものが該当する。

二重母音はロジバンと同じ。  
音節末に来られる子音はrlnsの4つ。  
ただし、条件によってn↔m, s↔zの交替があり得る。  
s→zは、後続の子音が有声音の時に、連濁により発生する。  
n→mは、基本的には、後続の子音が唇音の時になる。  

もう一つn→mのパターンがあって、後続の子音がnの場合。  
amnaみたいな発音になって、同じ子音が連続するのを防ぐ。  
逆に後続の子音がmの時はnのままになって、anmaのようになる。  

最後に、緩衝子音のmについて。  
音節末のrlsについて、後続の子音が同じ場合に、緩衝子音としてmを挟む。sについては、後続子音がzcjの場合も対象。  
例えば、kis + sel としたい場合は、kismselとする。  

## 構文論

sentence ← ai sentence conjunction sentence au / (interjection)* verb (noun)*  
verb ← i word? o value (interjection)*  
noun ← i word? a value (interjection)*  
conjunction ← i word? u  
value ← ai value conjunction value au / ai value value au / ai sentence au / word   
interjection ← i word? e value  
word ← cmevla / (ei cmevla+)? brivla  

-----

恐らく「text ← sentence*」というのが抜けている。

構造括弧が ai .. au。

述語、項、接続詞には開始マーカーとして i があり、  
それぞれに o, a, u が品詞マーカーとしてさらに割り当てられている。  
そのため、word自体に形態論的な区別はない、はず。

さらに、valueの定義文が循環してpegとして機能しない気がする。改良案として、

value ← ai value-1 (conjunction value-1)+ au? / value-1+   
value-1 ← ai value+ au? / ai sentence au? / word  

とか。ちなみにこれは不必要に ai..au を設けないという点も改良してある。

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

合成語を作る際は、単純語の語末のCVを落とした形が接辞になる。

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

たとえば、verbの構文、"i word? o value" の "i word? o"は法を司るfeismerke:

- to : 必然を性す法。
- go : 推奨を表す法。価値判断の法の一つ。
- xo : 接続法。事実判断を保留した単なる命題を表す。
- po : 可能性を表す法。
- mo : 義務を表す法。価値判断の法の一つ。
- ro : 許可を表す法。価値判断の法の一つ。

に置換されうる。なので、あの形式文法は厳密にいえば、

verb ← (i word? o / modal-feismerke) value

にすべきだと思われる。さらに、"io"は省略可能なので、

verb ← (i word? o / modal-feismerke)? value

とするのが現実的かなと思う。（もう少し、意味論に即したいのであれば、

verb ← ((i word? o)? / modal-feismerke) value

とかのほうがいいかもしれない。）

同様に、nounについても、"i word? a"は格を司るfeismerke:

- sa : 動作主の格
- la : 条件格
- ka : 起点格
- fa : 終点格
- ba : 具格

に置換されうるので、

noun ← (i word? a / case-feismerke) value

とすべきだろう。

なお、ia (i a), io (i o) はそれぞれ絶対格、直接法を表す。

### チェックサム冠詞

（モヤ氏のツイート引用）  
これは、使っても使わなくても良いけど、念のため用意してる程度のもの。  
単語の文字列からチェックサムを求めて、対応するチェックサム冠詞を単語の頭に接辞として付けるというもの。  

チェックサム接頭辞、が名称としては正しいな。  
後ろのCVを落とした、ar-, il-, un-, es-が接頭辞。  
聞き間違いを減らすための工夫の仕組みなので、基本的には使わなくていい。  

想定している使用方法は、外来語で似た単語が出てきてしまった時に付けるとか、あるいは、n対語とかのための使用を想定。  
（まだ、n対接辞を思い付く前に作られた仕組みなので、母音交替でのn対語しかなかったという背景がある。）

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

fau が feismerkeとして登録されている。これはロジバンの{ke'a}に相当する。

value ai sen .. fau .. tence au

と、valueを修飾する節内にfauを入れることで、先行詞（value）の位置を示す。

### 代名詞

それっぽいものとして、feismerkeに

- toi : 既出の対象を指示
- pei : 新出の対象を指示
- sai : あなた
- mai : 私
- xei : 疑問詞

がある。これが feismerke である理由は作者のミスらしい（後々変わるところかもしれない）。


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

があり、これはem/poと分離可能。em-で数詞を導く。  
たとえば、"entikupa"で"123"を表す（em-は音の変化でen-になることにも注意）。  

量化は、nounのvalueに前置することで行われる。 ex) ya enku pimpi : 人間２人

また、後置すると序数として解される。 ex) ya pimpi enku : 2番目の人

数字は３桁(emdadada)までであり、1000以上の数は適宜内容語を用いて表す。  

-----

形式文法自体には、feismerke は登場しないが、kiskrunにとって重要な要素だと思うので、  
しっかりと形式文法に組み込む必要があるように思う。

というか、形式文法で書くことの強みは、「何がどれの構文糖衣か」を示せることだと思うので、  
構文糖衣な語を形式文法上で表さないというのは勿体無い気がする。

feismerkeがどれだけ増えるかによるが、せめてこれくらいの改変は許されそうだ。

text ← sentence*  
sentence ← ai sentence conjunction sentence au / (interjection)* verb (noun)*  
verb ← (i word? o / modal-feismerke)? value (interjection)*  
noun ← (i word? a / case-feismerke) value (interjection)*  
value ← ai value-1 (conjunction value-1)+ au? / value-1+   
value-1 ← ai value+ au? / ai sentence au? / word  
conjunction ← i word? u / conjunction-feismerke  
interjection ← i word? e / interjection-feismerke value  
word ← cmevla / (ei cmevla+)? brivla  

なお、これでも尚 pronoun-feismerkeは実装されていない。