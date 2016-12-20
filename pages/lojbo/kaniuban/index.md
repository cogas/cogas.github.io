---
layout: post
title: おかゆ超訳ロジバン
date: 2014-11-14
revised_date: 20xx-xx-xx
---
# 0章

## はじめに

　この一連の記事ではロジバンの文法のうち、統語論を重点的に学んでいきます。具体的には、slabu gerna と xorxesによる zasni gerna の２つのPEGを用いた、slabu gerna を踏襲しつつ、 zasni gerna によるアレンジを加えたPEGみたいなものを使って、どっちつかずの『トイ・ロジバン』を学んでいきます。

その仕様から、ここで学ぶロジバン構文は一部、既存の構文解析器ではエラーが出るようなものもありますが、そのほとんどは現在のロジバンによる意思疎通にとって致命的なものではないと考えています。そのため、slabu gernaのように『時代遅れ』でもなく、zasni gerna のように『先進的すぎる』わけでもないつくりとなっているこの『トイ・ロジバン』を学ぶことは、現在のロジバンのようすを手っ取り早く学ぶためのとっておきではないかと思っています。

また、従来の講座が名前や述語、項、基本的な文（bridi）からスタートするのと打って変わって、この記事では最も大きい構造からどんどん中に踏み込んでいく形をとっていきます。そのため、些細な表現に囚われることなく、大きな視点からロジバン文法を掴み取れるようになれるかと思います。


## 少しのルール

本編を始める前に、「PEGみたいなもの」に使われている記号について簡単に説明します。基本的にはPEGと同じです。

1. 小文字は複合的な構造
2. 大文字はセルマホを表しこれが末端(単語)となる
3. 単純に並べることで順接を表す
4. / が優先順位つきの選択を示す
5. ? は 0個か 1つを示す
6. "\*" は 0個かそれ以上を示す
7. "+" は 1つかそれ以上を示す
8. () はグループにまとめる
9. !A は該当箇所にAがこない、 &A は該当箇所にAがくることを示す
9. ?, \*, + は最長マッチである


たとえば、

    selbri <- selbri-1+ / (tag / NA#) selbri

    selbri-1 <- BRIVLA# / KE# selbri-1+ KEhE#?

    tag <- tag-unit+ (JOI# tag-unit+)* !GI#

    tag-unit <- BAI#

こんな表現があったとしましょう。

NA#, BRIVLA#, KE#, KEhE#, JOI#, GI#, BAI#  
の「大文字#」の形が基本的には「ロジバンの語」だと思ってください。  
つまり、代入を繰り返して、「大文字#」に辿り着いたらゴールです。  
構造としてはそれを逆にたどればよいことになります。

左が（構文の）名前であり、右がその定義となっています。

たとえば、  
「selbriとは1個以上のselbri-1, tagかNA#をつけたselbriである」

前者はわかると思いますが、後者は再帰しているのに注意してください。つまり、

tag selbri-1 selbri-1 selbri-1

や

NA# tag NA# selbri-1 selbri-1

という形は selbri である、ということです。

また、tag は、  
「tag とは1個以上のtag-unitに0個以上のJOI# tag-unitをつけたものである」

となります。しかし、「!GI#」で分かるように、tag GI# という形はあり得ません。

またPEGでは / が or なわけですが、どちらも適合する場合、左が優先されます。

ということで、

BAI# BAI# JOI# BAI# BRIVLA#

というようなテキストがあったとき、これは selbri として解釈されます。

このような感じで、「PEGっぽいもの」を読みながらロジバン文法を総ざらいしてみます。

# 1章 - 文章・段落・言明 -

まずは文以上の構造から見ていきます（ほとんどの入門講座では力尽きて、ここまで説明できていないと思いますが）。

大事なのは、**text, paragraph, statement** の3要素です。

早速見て行きましょう。

## 文章（text）

    text <- SI-tail* free? paragraphs FAhO#?

「SI-tail」と「free」はとりあえず置いておきます。そこまで重要ではありませんので。

となると、このように書けます。

    text <- paragraphs FAhO#?

すなわち、**文章とは段落の集まりとFAhO（省略可）からなる** わけです。


## 段落（paragraph）

    paragraphs <- paragraph (NIhO# paragraph)*

    paragraph <- statement (I# statement)*

次に段落です。paragraphs は段落の集まりですが、段落ひとつひとつは**NIhO#** によって繋がれます。言い換えれば、NIhO#によって段落は区切られます。

そして、**「段落は一連のstatementからなり、それらは I# で区切られる」** わけです。

言明をs と書くと、

s I# s I# s NIhO# s I# NIhO s I# s I# s I# s FAhO#

はひとつの文章をなすことになります。

Q. 「NIhO# NIhO#」 とか 「I# I# I#」は構文エラー？

A. エラーではありません。これについてはsentenceの節で見ていきます。

## 言明（statement）

段落の中身、statementは次のようになります：

    statement <- statement-1 / prenex statement

まず言明は**statement-1そのもの**か、**prenexが複数個つく** ことになります。

prenex prenex statement-1 は statement と解釈されます。

さて、prenex とは**冠頭**と訳されますが、次のようになります：

    prenex <- term+ ZOhU#

termは「項」です。**「prenexとは1個以上のtermにZOhU#をつけたもの」** です。

ですから、

term term ZOhU# statement-1

は statement となります。

------

次に、statementは**statement-1** と**statement-2** からなります：

    statement-1 <- statement-2 (I# joik-jek statement-2)*

    statement-2 <- sentence (I# joik-jek? tag? BO# sentence)*

**joik-jek** というのは接続詞の一種です。接続詞と思ってください。

**statement-1 は I# joik-jek で繋がれたstatement-2の集まり** です。

最も簡素なstatement-1の形は statement-2 そのものです。

次に、statement-2です。  
**statement-2は I# joik-jek tag BO# で繋がれた sentenceの集まり** です。

ただし、joik-jek と tag は省略可能ですから、

sentence I# BO# sentence も statement-2 です。

最も簡素なstatement-2はsentenceそのものです。  
（このことから、最も単純なstatement は　sentence であることがわかります。）

さて、statement-1 は statement-2 よりも外部にあります。  
ですから、I# joik-jek の結合力は I# joik-jek BO# よりも**弱い** ことが分かります。

sentence を s と書くことにすると、

s I# s I# BO# s I# joik-jek s I# BO# s I# joik-jek s I# s

は、

[ [ s I# [ [s I# BO# s] I# joik-jek [s I# BO# s] ] ] I# s ]

となります。**I# BO# は優先的にsentenceを結合します。**

------

今回の事項をまとめると、

- text とは paragraphs と FAhOからなる。
- paragraphs は NIhO# で繋がれたparagraphの集まりである。
- paragraph は一連のstatementからなり、それらは I# で区切られる。
- statement は prenex が複数個ついた statement-1 である。
- statement-1 は I# joik-jek で繋がれたstatement-2の集まりである。
- statement-2 は I# joik-jek tag BO# で繋がれた sentenceの集まりである。

となります。

# 2章 - 文, bridi末端 -

## 文（sentence）

さて、他の講座でも初期に学ぶであろう基本的な「文」についてみていきます。

    sentence <- (term+ CU#?)? bridi-tail / TUhE# paragraphs TUhU#
    		/ gek subsentence GI# subsentence / term* VAU#?

    subsentence <- sentence / prenex sentence

sentenceの種類は 4つあります。

1. 0個以上のtermとそれに続く bridi-tail （最もふつうのsentence）
2. paragraphs を TUhE# と TUhU# で囲んだもの
3. ２つのsentenceを gek と GI# で区切ったもの
4. 0個以上の term を VAU# で締めたもの

順に見て行きましょう。

### (term+ CU#?)? bridi-tail

0個以上のtermとそれに続く bridi-tail です。  
これから、「termがないときは CU# を bridi-tailの前に置けない」ことがわかります。  
あくまでも、CU#はtermとbridi-tailのセパレータだということですね。  
これはもっとも一般的なsentenceの形となります。bridi-tail は後述します。


### TUhE# paragraphs TUhU#

TUhE# と TUhU# はいわゆる**文章括弧**です。

文より大きな構造である文章はTUhE# TUhU#で囲むことで構文上「文」と同レベルになります。

###  gek subsentence GI# subsentence

subsentence とは prenex のつけられる sentence のことです。副文です。

**gek** は **前置接続詞** と呼ばれています。ここでは gek は文レベルの接続詞となっています。つまり、文と文を接続しています。

繋げられる２つの要素は **GI#** で隔てられます。gek .. GI# .. というフレーズは今後も出てくるので覚えておくとよいです。

gek .. GI# によって繋げられた２文は構文上、1つの文として解釈されます。

### term* VAU#?

これも単純な構造です。0個以上のtermをVAU#で締めます。

これより、「何も書かない」こともsentenceとしてみなされることがわかります。  
すなわち、

I# I# NIhO# NIhO# I# I# FAhO#

というような文章があったとして、これは

( ) I# ( ) I# ( ) NIhO# ( ) NIhO# ( ) I# ( ) I# ( ) FAhO#

と解釈されます。( )は term* VAU#? で termが0個、VAUが省略された形です。

このことから、

- 文章の頭にNIhO# や I# を置くこと
- NIhO# や I# を連続して置くこと

が許容されることが分かります。これらがどんな意味になるかは意味論の役目です。

## bridi末端（bridi-tail）

文の最も一般的な形、「(term+ CU#?)? bridi-tail」に出てきた bridi-tail について詳しく見ていきます。statementのように -1 と -2 が出てきます。statementのときと比較して見てみると理解しやすいかもしれません：

    bridi-tail <- bridi-tail-1 (gihek bridi-tail-1 term* VAU#?)*

    bridi-tail-1 <- bridi-tail-2 (gihek tag? BO# bridi-tail-2 term* VAU#?)*

    bridi-tail-2 <- selbri term* VAU#?
    		/ (tag / NA#)* gek bridi-tail GI# bridi-tail term* VAU#?

まず、**bridi-tail** は大雑把には **bridi-tail-1 を gihek で繋いだ形**にみえます。

**gihek は bridi-tail 接続詞です**。実際そのように見えますね！  
ただし、gihek と bridi-tail-1の間にはいくつかのtermとVAU#が入る余地があります。

**bridi-tail-1 は、大雑把には bridi-tail-2 を gihek tag? BO# で繋いだ形** です。

さて、statement の定義と見比べてみましょう：

    statement-1 <- statement-2 (I# joik-jek statement-2)*

    statement-2 <- sentence (I# joik-jek? tag? BO# sentence)*

gihek と I# を対応してみると、**BO#はより強く２つを結合する** という共通の構造が見えてきます。実際、BO#は2つの構造をより強く結合するために使われます。

さて、 bridi-tail-2 が実のところの**bridi末端**の中身です。２つありますね。

1. selbri term* VAU#?
2. (tag / NA#)* gek bridi-tail GI# bridi-tail term* VAU#?

### selbri term* VAU#?

そのまんまですね。新たに**selbri**という要素が出現しましたが、これは（おそらくみなさんお馴染みの）文の中心的存在、いわゆる「述語」です。

つまり、**bridi-tail は selbri と0個以上のtermからなり、VAU#で締められる**。

### (tag / NA#)* gek bridi-tail GI# bridi-tail term* VAU#?

「gek .. GI# ..」の構造が出ました！これは前置接続の構文ですね。

やはり再帰的な定義であることに注意してください。

bridi-tailの前置接続の構造では**その頭に複数個のtagやNA#が置けます**。  
NA# はいわゆる「否定の語」です。notです。

ですが、必須の要素ではないので、それを省くと、

gek bridi-tail GI# bridi-tail term* VAU#?

となります。gek .. GI# .. で bridi-tail を接続し、さらにその後ろに複数個のtermとVAU#を置いたものは1つのbridi-tailとして解釈されます。

## tail-terms

今まで、よく 「term* VAU#?」 の形が出てきたかと思います。実はこの構造には、一方のPEGには名前が割り振られていました：

tail-terms <- term* VAU#?

これを用いると、上の定義は次のようになります：

    bridi-tail <- bridi-tail-1 (gihek bridi-tail-1 tail-terms)*

    bridi-tail-1 <- bridi-tail-2 (gihek tag? BO# bridi-tail-2 tail-terms)*

    bridi-tail-2 <- selbri term* VAU#?
    		/ (tag / NA#)* gek bridi-tail GI# bridi-tail tail-terms

こちらのほうが人によってはまとまっていて見やすいかもしれません。

## VAU#

すべてのbridi-tailの構造には（省略可能ではあるが）VAU#が出てきたことに注意してください。

VAU# は基本的な文（bridi）もといbridi末端の締めを示す語なのです。

これによって、そのbridi (bridi-tail) がどこで終わるのかが分かります。

-----

前置接続の構造を考えないとすると、  

bridi-tail-2 <- selbri term* VAU#?

なので、  

bridi-tail-1 <-  selbri term* VAU#? (gihek tag? BO#  selbri term* VAU#? term-tail)*

であり、

bridi-tail <- selbri term* VAU#? (gihek tag? BO#  selbri term* VAU#? term-tail)*  (gihek selbri term* VAU#? (gihek tag? BO#  selbri term* VAU#? term-tail)*  term-tail)*

と書き下すことができます。たとえば、

term cu [sebri term term gihek selbri term term term **VAU#** term term]

というような構造は sentenceであり、[ ]内 は bridi-tail として解釈されます。

ここで、VAU#は省略できないことに注意してください。これを省略してしまうと後続の「term term」がbridi-tail-1 の term* の一部として認識されてしまいます。

（意味論的には、tail-terms のtermは gihek で繋がれた bridi-tail の両方に分配されます。たとえば、selbri t1 gihek selbri t2 VAU# t3 は selbri t1 t3 と selbri t2 t3 のように意味的には解釈されます。）

-----

さて、これで実は、すべての文レベル以上の構造を網羅したことになります。

見返すと、当たり前といえば当たり前ですが、**ある２つの同列の構造を接続詞で接続した構造、それを繰り返した構造というのがほとんど** でした。

ですが、これがほとんどの入門講座で扱いきれていなかったのも事実ですから、実際のところ、おかゆ超訳はここまでで十分有意義なものであると思っています。

これ以降は他の入門講座でも十分序盤で取り扱われるところであり、それと並行しながら見ると理解度が増すかと思われます。

今回取り扱った構造は、sentenceとbridi-tail であり、基本的な構造は、

- sentence は、0個以上のtermとそれに続く bridi-tailからなる。
- bridi-tail は、selbri と0個以上のtermからなり、 VAU#で締められる。

となります。

次は term について踏み込んでみましょう。


# 3章 - 項 -

## 項（term）

sentenceに複数個存在するのが許される項ですが、これについて見ていきます。

    term <- FA#? sumti / tag? sumti / FA# KU#? / tag !selbri KU#
    		/ NA# !gihek !selbri KU#? / gek term+ VAU#? GI# term+ VAU#?

term な構造は6つあります。順に見ていきます。

### FA# sumti, tag sumti

sumtiという構造にFA#やtagがついたものはtermとなります。FA#やtagは省略可能ですから、sumti単体もまたtermです。

ちなみに、**sumtiはtermの最も基本的な構造** です。

### FA# KU#?, tag !selbri KU#?

「!selbri」はtagの直後にselbriが来ずにKU#がきた場合はその構造がtermであるということです。深く考えずに進みましょう。

上のも踏まえると、**FA#とtag は sumti か KU# のどちらかをその後ろに取ることができる**、ということです。また、KU#は省略できるので、FA#, tag 単体は（tagの場合はその後ろがselbriでないなら）termと解釈されます。

### NA# !gihek !selbri KU#?

中の !gihek !selbri はとりあえず置いておいて…。とすると、「NA# KU#」の形です。

これも、KU#は省略できるので、直後にgihek, selbriが来ない場合は、NA#単体はtermとみなされます。

### gek term+ VAU#? GI# term+ VAU#?

出た！ gek .. GI# ですから、前置接続ですね。やはり再帰的です。

VAU#があること以外は、単に２組のterm複数個を接続し、1つのtermとして解釈するという至ってシンプルな構造です。

さて、KU# がよく出てきますが、これは文レベルでいうところのVAU#と同じ種類のものです。つまり、KU#はしばしば語レベルでその構造を締めくくります。

## スムティ（sumti）

さて、termの最も基本的な構造に目を向けていきます。

    sumti <- sumti-1 (joik-ek sumti-1)* (VUhO# rels)?

    sumti-1 <- sumti-2 (joik-ek tag? BO# sumti-2)*

    sumti-2 <- quantifier? bare-sumti / quantifier selbri KU#? rels?
		/ gek sumti GI# sumti

また似たような構造が出てきました。注意して欲しいのが、ここでは新しい接続語、**joik-ek**が出てきています。sentenceのときに出てきたのは**joik-jek**です。

**sumti とは、 joik-ek で繋がれた一連のsumti-1 に VUhO# rels をかけたものである。**

ここで、VUhO# rels というのは大雑把に言えば「関係節」です。後々でてきますが、VUhO# rels という形は 「sumti-1 (joik-ek sumti-1)*」**全体**を修飾します。

どんどん行きましょう。

**sumti-1 とは、joik-ek tag? BO# で繋がれた一連のsumti-2 のことである。**

また BO# が出てきましたね。やはりBO#によって、２つの要素が強く結合していることが見られます。

さて、次にsumti-2 ですが、これには3種類あります。このうち１つは gek..GI#.. の前置接続の形なので説明は省略します。

### quantifier? bare-sumti

bare-sumti （裸sumti）にquantifier（量化子）をつけたものはsumti-2, もとい素朴なsumti と解釈されます。ここで、quantifier は省略できるので、**最も基本的なsumtiの形は bare-sumti** です。

quantifier は大雑把には「数字」と思ってください。もう少し厳密に言えば、「モノの個数を表す数」です。

### quantifier selbri KU#? rels?

こちらは、**quantifier が省略できません**。すなわち、selbri をsumtiとして用いる形では、quantifier は必須ということです。 KU# や rels が後に続きますが、これらはどちらも省略できます。なお、relsは関係節のことです。

（ここではrelsの前にVUhO#がありません。VUhO#はその後ろにくるrelsを「接続詞を飛び越えて」修飾させる機能があります。ここで出てきたrelsにはVUhO#が先行していないので、[quantifier selbri KU#]にのみ係るということを表しています。）

## bare-sumti

sumti の最も基本的な形、bare-sumtiについて見ていきます。かなり量が多いですが、あまり重要でないものもあるので、さっと見ていくことにしましょう。

    bare-sumti <- (description / LI# mex LOhO#? / KOhA# / ZO-word#
		/ LU# paragraphs LIhU#? / LOhU-words-LEhU# / ZOI-anything#
		/ !tag !selbri lerfu-string !MOI# BOI#?
		/ !tag !selbri (LAhE# / NAhE# BO#) rels? sumti LUhU#?) rels?

とりあえず整理してみると、

- description
- LI# mex LOhO#?
- KOhA#
- ZO-word#
- LU# paragraphs LIhU#?
- LOhU-words-LEhU#
- ZOI-anything#
- !tag !selbri lerfu-string !MOI# BOI#?
- !tag !selbri (LAhE# / NAhE# BO#) rels? sumti LUhU#?

があって、これらすべて、後ろに rels（関係節）がとれます。

いくつかに分けて説明していきたいと思います：
①description, KOhA#, lerfu-string ②LI# mex LOhO#? ③LU# paragraphs LIhU#? ④ZO-word#, LOhU-words-LEhU#, ZOI-anything# ⑤(LAhE# / NAhE# BO#) rels? sumti LUhU#?

### ① descripiton, KOhA#, lerfu-string

descripiton はおそらくbare-sumtiの中でもかなり頻繁に出てくるものです。これについてはあとで詳しく説明しますが、簡単にいえば「冠詞 + selbri」の形の構造です。

KOhA# はいわゆる「代名詞」であり、ロジバンでは「代sumti」と呼ばれているものです。

lerfu-string は大雑把には「一連のアルファベット列」のことで、これもbare-sumtiとして（素朴なsumtiとして）解釈されます。

### ② LI# mex LOhO#?

mex とは簡単にいえば「数式」です。数字もmexのうちに入ります。

**LI#は数字や数式の冠詞です**。LOhO#はLI#を締める語です。

### ③ LU# paragraphs LIhU#?

形としては、sentenceに出てきた TUhE# .. TUhU# に似ています。

LU# .. LIhU#? は**引用括弧**です。いわゆる「クォーテーションマーク」ですね。
LU#, LIhU# は文章を引用するのに使われます。

### ④ ZO-word#, LOhU-words-LEhU#, ZOI-anything#

word, words, anything といったフレーズがついていますが、実はこれらも③と同じく引用句のひとつです。しかし、LU#, LIhU#が文章を引用するのに対して、ZO-word# や LOhU-words-LEhU# は単語（群）引用を表します。

ZOI-anything# は非ロジバン言語の文字列（文、単語）を表します。

これら３つについては、後々やりますが、今のところはこういったものがあり、それがbare-sumtiとして解釈されるということを知っていれば十分です。

### ⑤ (LAhE# / NAhE# BO#) rels? sumti LUhU#?

**LAhE# や NAhE# BO# を sumti にかけたものは bare-sumti である** ということですが、LAhE# や NAhE# BO# は、「sumti→sumti演算子」と呼ばれることがあります。

LUhU# はほとんどの場合省略されますが、これらの構造を締める語ですね。

-----

色々たくさん一気に出てきましたが、落ち着いてみてみると、どうってことはないです！

## description

この節の最後は、description について見ていきます。いわゆる「描写項」というものです。

    description <- LA# rels? CMEVLA#+
		/ (LA# / LE#) (rels / bare-sumti)? (quantifier? selbri / quantifier sumti) KU#?

### LA# rels? CMEVLA#+

CMEVLA# は「名称語」と呼ばれるものです。

**1つ以上のCMEVLA#列は LA# を冠することで bare-sumti となる。**

また、関係節rels は LA#の後ろと、CMEVLA#+ の後ろ（すなわち、descriptionの後ろ）のどちらにもつけることができます。

### (LA# / LE#) (rels / bare-sumti)? (quantifier? selbri / quantifier sumti) KU#?

こちらは少しややこしいですね。選択の総通りを数えてみると

1. LA#かLE#か (2)
2. rels（関係節）か bare-sumti か 無しか (3)
3. quantifier有りselbri か 無しselbri か sumti か (3)
4. KU# ありかなしか (2)

となり、 2×3×3×2 = 36 通りのパターンが考えられます。

…しかし、構造は書いてある通りです。この辺りは統語論よりも意味論のほうが複雑なところと言えそうです。

しかし、もっとも基本的かつ頻繁に現れるdescriptionの形は、

LE# selbri KU#?

です。一応この形だけを頭に叩き込むだけでもひとまずは十分です。

※ zasni gerna では、description は

    (LA# / LE#) (rels / bare-sumti)? quantifier? (selbri / sumti) KU#?

となっていますが、2016/10/29 現在で ilmentufa に実装されているどのパーサでも、
quantifier無しのsumti は構文エラーとなっているので、ここでもそれに倣っています。

-----

さて、次は selbri について踏み込んでいきます。


# 4章 -関係節/句, selbri-

さて、selbriに入る前に、さんざん出てきた rels について学んでおきましょう。

## 関係節句（rels, rel）

    rels <- rel (ZIhE# rel)*

    rel <- GOI# term GEhU#? / NOI# subsentence KUhO#?

**rels とは、 一連のrel を ZIhE# で繋いだものである**。

実は、rel こそが関係節（句）であり、relsはその複合体でした。

さて、では関係節（句）はと言いますと・・・。

**relとは、GOI#のあとにtermを置いたものか、NOI#の後に副文を置いたものである**。

term は言ってしまえば「名詞句」に相当するものですから、"of xxx" のような構造が GOI# term です。GEhU#? はこの構造を締める語です。

関係節と言えば、NOI# .. のほうですね。 subsentence は sentence に複数個のprenexをつけたものでした。NOI#は英語でいうところの関係代名詞に近いものです。

## selbri

それでは、ロジバンの本丸（？）に突入していきましょう！

    selbri <- selbri-1 (CEI# selbri)? / (tag / NA#) selbri

    selbri-1 <- selbri-2+ (CO# selbri-1)?

    selbri-2 <- selbri-3 (joik-jek selbri-3)*

    selbri-3 <- selbri-4 (joik-jek tag? BO# selbri-4)*

    selbri-4 <- tanru-unit (BO# tanru-unit)*

…とはいえ、どこかで見たことのある構造ですね。今回出てきている接続詞は**joik-jek**であることに注意しましょう。joik-ekはsumtiにのみ使われます。

まず、もっとも素朴な構造を見つけてみましょう。そのためには、省略できるもの（?, \*のついたもの）は省き、+は取ればいいわけですから・・・

    selbri <- selbri-1 / (tag / NA#) selbri

    selbri-1 <- selbri-2

    selbri-2 <- selbri-3

    selbri-3 <- selbri-4

    selbri-4 <- tanru-unit

となりますね。

(tag / NA#) selbri というのは、再帰的な構造です。つまり、**selbriの頭には複数個のtag や NA# をつけられる** ということです。

それを踏まえても、selbri とは tag,NA#をつけた selbri-1 のことであり、 selbri-1 とは selbri-2 のことであり、 selbri-2 とは selbri-3 のことであり、 selbri-3とはselbri-4のことであり、selbri-4とはtanru-unitのことですから、**selbriの最も基本的な構造は tanru-unitである** ことが分かります。

それでは『飾り』も踏まえて見て行きましょう。

    selbri <- selbri-1 (CEI# selbri)? / (tag / NA#) selbri

tag, NA# が selbriの頭に複数個付けられることはさっきも言った通りですね。

selbriは CEI# selbri がつけられるという点以外はselbri-1と同じです。

（CEI#という構造は意味論的には「代入」を意味します。selbri-1 の内容をCEI#の直後のselbriに代入することができます。代入用の空selbriが用意されてあるので、普通はそれに代入します。意味論の話はこれくらいにしておきましょう。）

    selbri-1 <- selbri-2+ (CO# selbri-1)?

これは少し不思議な構造をしています。まず、より下層の selbri-2が1つ以上続きます。そのあとに、CO# selbri-1 という構造が許可されます。これは再帰的ですね。ということは、たとえば、

selbri-2 selbri-2 CO# selbri-2 CO# selbri-2 selbri-2 CO# selbri-2

といったフレーズはselbri-1と解釈されます。少し詳しく見てみると、

①[selbri-2 selbri-2] ②[CO# ③[selbri-2 CO# selbri-2 selbri-2 CO# selbri-2]]

①[ ]は selbri-2+, ②[ ] は CO# selbri-1 に相当し、 ③[ ]は selbri-1 です。

③[ ] をさらに見ていくと、

④[selbri-2] ⑤[CO# ⑥[selbri-2 selbri-2 CO# selbri-2]]

④[ ]は selbri-2+, ⑤[ ] が CO# selbri-1, ⑥[ ]がselbri-1 です。

⑥[ ]についてさらに見ると、

⑦[selbri-2 selbri-2] ⑧[CO# ⑨[selbri-2]]

⑦[ ] は selbri-2+, ⑧[ ]はCO# selbri-1 で、⑨[ ] は selbri-1 です。

⑨[ ]は selbri-2 だけで、これは(CO# selbri-1)? が無い selbri-1の形になります。

selbri-2 を x で表すとすると、さっきの構造は、

(x x (CO# (x (CO# (x x (CO# x))))))

となることが分かります。

-----

    selbri-2 <- selbri-3 (joik-jek selbri-3)*

    selbri-3 <- selbri-4 (joik-jek tag? BO# selbri-4)*

    selbri-4 <- tanru-unit (BO# tanru-unit)*

さて、ここからはデジャヴュな構造です。

**selbri-2 は 一連のselbri-3をjoik-jekで繋いだもの**。

**selbri-3 は一連のselbri-4をjoik-jek tag? BO#で繋いだもの**。

これは、今までにもよくある光景でしたね。

**selbri-4 は一連のtanru-unit をBO#で繋いだもの**。

これらは結局のところ、tanru-unit の結合力を明示しているにすぎません。

BO# > joik-jek BO# > joik-jek > normal > CO#

tanru-unit を t と書くと、

t t BO# t t CO# t joik-jek t t joik-jek BO# t BO# t t

は、

t [t BO# t] t CO# [t joik-jek t] [t joik-jek BO# [t BO# t]] t

のように優先括弧がつけられます。

-----

さて、次はtanru-unit・・・と言いたいところですが、tanru-unitもまたbare-sumtiのときのようにかなり雑多ですから、節を分けたいと思います。


# 5章 - tanru単位, 付加引数 -

前回はselbriについてやりました。今回は、selbriの最も基本的な構造であるtanru単位についてやっていきましょう。

## tanru単位（tanru-unit）

    tanru-unit <- tanru-unit-1 linkargs?

    tanru-unit-1 <- BRIVLA# / word-ZEI-word# / GOhA# RAhO#?
    		/ ME# (sumti / mex) MEhU#? MOI#? / mex MOI#
    		/ NU# (joik-jek NU#)* subsentence KEI#?
    		/ KE# selbri-2+ KEhE#? / NUhA# operator
    		/ (SE# / JAI# tag? / NAhE#) tanru-unit-1

**tanru-unitとは、tanru-unit-1にlinkargsをつけたものである**。

linkargsはこの次にやりますが、**付加引数** と呼ばれています。これについては後述します。

大事なのは、tanru-unit-1の中身です。…ごちゃごちゃしていますね…。

**BRIVLA#** は「内容語」と呼ばれるもので、tanru単位の中で最も基本的なものです。

**word-ZEI-word**はZEI#を用いて2つの語を繋げた造語です。これについてはまた後々触れます。

**GOhA# RAhO#** の**GOhA#** はいわゆる「代動詞」に相当します。よく言われるのは**代selbri**です。RAhO#はGOhA#に対する意味論的な作用を持ちます。

**ME# (sumti/ mex) MEhU#? MOI#?** はMOI#があるかどうかで意味論的には２つの大きな違いが生じます。  
　MOI#がないとき、「ME# (sumti /mex)」というのは、sumtiやmex（数式）を**selbri化**した形として使われます。詳しい意味論については割愛します。  
　MOI#があるとき、「ME# (sumti/mex)」は、MOI#の直前にくるmexの代わりとして機能します。これについても詳しい意味論は割愛します。

mex **MOI#** はselbriをなします。（意味論的には、MOI#はその直前に数式をとって、「n番目の」とか「n倍だ」とかいう述語になります。）

**NU#** はその後ろに副文をとって、それら全体で1つのtanru単位をなします。NU#は**抽象詞**と呼ばれ、「～という出来事だ」「～という性質だ」というような述語を作ります。

**KE# .. KEhE#** は**tanru括弧**です。selbri-2が1つ以上連なった構造を囲み、1つのtanru単位を構成します。sentenceのTUhE#..TUhU#に似ていますね。


**NUhA# operator** は数式(mex)を学んでからでないと分かりにくいのですが、簡単に言うと、**NUhA#は数式の演算子（足し算とか）をselbri化**します。

(SE# / JAI# tag? / NAhE#) tanru-unit-1 はよく見る構造ですね。**tanru-unit-1の頭には複数個のSE#, JAI# tag?, NAhE# をつけられます。**

bare-sumtiやtanru単位は、構造のかなり下層に来ているので、色々な表現が一気に出てきて混乱するかもしれませんが、ひとつひとつチェックしていきましょう。


## 付加引数（linkargs）

tanru-unit <- tanru-unit-1 linkargs? に出てきたlinkargsについてやりましょう。

    linkargs <- BE# term (BEI# term)* BEhO#?

ここまで見てきた方なら特に和訳しなくても十分読解できそうな構造です。BE#の次にtermがきた後に、複数個のBEI# term がきて、BEhO#が締める。

これも意味論のほうが大切な要素ですが、簡単に言えば、係る tanru-unit-1の引数にtermを代入し、それによって新しい意味の tanru-unit を生成します。これも色々と意味論的な解釈がありますが、それについては触れないでおきます。

-----

（おそらく）統語論の半分までやってきました。あとは、接続詞、tag、 mex、 その他少々くらいです。具体的には今までも出てきた joik-jek, joik-ek, tag, mex の構造を暴いていきます。

ターニングポイントです！頑張って行きましょう！


# 6章 -接続詞, tag-

残りの文法構造を暴いていきましょう。まずは接続詞から。

## 接続詞

    ek <- NA#? SE#? A#

    gihek <- NA#? SE#? GIhA#

    jek <- NA#? SE#? JA#

    joik <- SE#? JOI# / GAhO#? interval GAhO#?

    interval <- SE#? BIhI#

    joik-ek <- joik / ek

    joik-jek <- joik / jek

    gek <- SE#? GA# / joik GI# / tag-unit+ (joik-jek tag-unit+)* GI#

ek, gihek, jek, joik に注目してください。これらは、**基本要素（A#, GIhA#, JA#, JOI#）の頭に NA# SE# がついている**という構造になっています。

さらに joikの場合は、GAhO# intervel GAhO# という構造があります。この構造の肝はintervalであり、これはさらに SE# BIhI# という構造であることが分かります。

（intervalの肝である BIhI#は意味論的には「...から～まで」という間隔を表すための接続詞です。）

joik-ek は実はそのまんまで、joikかekか という構造でした。joik-jekも joikかjekかという構造です。

これで joik-jek, joik-ek の内部構造が完全に明らかになりました。

最後に、前置接続であるgekは3種の構造をなします：

- SE#? GA# :: 最も一般的な構造です。GA#が肝です。
- joik GI# :: joikを前置する場合はGI#が必要となります。joik GI# .. GI# .. です。
- tag-unit+ (joik-jek tag-unit+)* GI# :: 複数のtag-unitをjoik-jekで接続したものも前置接続化することができます。意味論はいつも通り割愛で…。


## tag

勢いに乗って、tagもやってしまいましょう。

    tag <- tag-unit+ (joik-jek tag-unit+)* !GI#

    tag-unit <- BAI# / mex ROI# / FIhO# selbri FEhU#? / (NAhE# / SE#) tag-unit

tagも色々なところで出てきましたが、その内部構造はこうなっています：

**tagとは、複数のtag-unitをjoik-jekで繋いだものである**。

さらに、tag-unit, すなわち tag単位については4種類の形があります。

**BAI#**はtag-unitで最も一般的な形です。

**mex ROI#**も意味論的にはBAI#と同種ですが、構文上の違いは「その前に数式をとるかどうか」です。たとえば「～回」という意味をもつものはROI#に当てはまります。

**FIhO# selbri FEhU#?**はBAI#の素と言える構造です。意味論的には、BAI#はすべてFIhO# selbri FEhU#?の形で定義されます。

そして、いつも通り（？）**tag-unitの頭には複数個のNAhE#やSE#がつけられます**。

-----

ざっくりと説明しましたが、ここまで来た皆さんなら実に容易いことでしょう！

次は、ちょっとの難関、数式(mex)についてやりたいと思います。


# 7章 - 数式 -

それでは、度々出てきたmex、数式の内部構造を見ていきます！

（ここで説明するmexの文法、xorxesによる改案を採用しています： [MEX grammar proposal](http://www.lojban.org/tiki/MEX+grammar+proposal) ）

## quantifier

quantifier は description で出てきましたね。

    description <- LA# rels? CMEVLA#+
    		/ (LA# / LE#) (rels / bare-sumti)? (quantifier? selbri / quantifier sumti) KU#?

簡単に言えば、quantifierとは「モノの個数を表す数」です。

    quantifier <- !selbri !bare-sumti mex

その前にselbri, bare-sumti がこないような mex が quantifier です。

（「まどろっこしい書き方だなあ。諸仮定抜けばmexと同じじゃん」と思う方もいると思います。これは、公式現行文法ではquantifierがmexと等しくないところから生じていると思います。簡潔さのため、ここではmexとquantifierが等しい案を採用しています。）

## mex

さて、それではmexの内部構造に踏み込んでいきます。

    mex <- mex-1 (operator mex-1)*

    mex-1 <- mex-2 (operator tag? BO# mex-2)*

まず、**mexとは一連のmex-1をoperatorで繋いだもの**です。

operatorの中身はすぐあとでやりますが、「演算子」のことで、加減乗除などの二項演算全般（一部、三項以上演算も）の記号のことです。

そして、**mex-1とは一連のmex-2をoperator tag? BO#で繋いだもの**です。

これはいつものBO#付きの構造ですね。

（あるロジバニストは「operatorとは構文上は接続詞と同じである（二項演算であるため）」と述べており、彼が作った新文法案では operator はすべて接続詞と同じ品詞にまとめられています。ここでは、そこまでの改案は採用せず、その中間くらいのアイデアを採用しています。）

-----

さて、ここからが本番。mex-2は9種！もの構造を含みます。

    mex-2 <- number BOI#? / lerfu-string BOI#? / VEI# mex VEhO#?
    		/ NIhE# selbri TEhU#? / MOhE# sumti TEhU#? / gek mex GI# mex
    		/ (LAhE# / NAhE# BO#) mex LUhU#? / PEhO#? operator mex+ KUhE#?
    		/ FUhA# rp-expression

見るのも嫌になりますが、少し整理してみましょう。

### ① 再帰的な構造

- VEI# mex VEhO#?
- gek mex GI# mex
- (LAhE# / NAhE# BO#) mex LUhU#?

またまたmexに逆戻りするような構造種が3つあります。

一つ目は**VEI# mex VEhO#?**で、**mex括弧**ですね。

そして、またもや登場 前置接続です。

それから、前置修飾？ mexの頭には複数個のLAhE#, NAhE# BO をつけることができます。

###② →mex 変換

- NIhE# selbri TEhU#?
- MOhE# sumti TEhU#?

NIhE#とMOhE#はそれぞれ非mexな語句（selbri, sumti）をmexに変換します。細かい意味論は述べません。

###③ 特殊な記法

- PEhO#? operator mex+ KUhE#?
- FUhA# rp-expression

PEhO# は前置記法マーカーとして機能します。たとえば、"2 + 1" とかくところを、"+ 2 1" という風に書くことができます。

FUhA# は後置記法マーカーとして機能します。すなわち、逆ポーランド記法です。"2 + 1" とかくところを、 "2 1 +" という風に書くことができます。

FUhA#に続く rp-expression は次のように定義されます：

    rp-expression <- mex (rp-expression operator)*

たとえば、

mex mex mex operator operator mex operator

という構造は、

((mex (mex (mex operator)) operator) mex operator)

となります。

###④ 基本的な要素

- number BOI#?
- lerfu-string BOI#?

見ての通り、**数字**と**文字列**はmex-2となります。

このことからわかると思いますが、mex-2 はoperand（被演算子）です。

numberとlerfu-stringの定義も見ておきましょう：

    number <- PA# (PA# / lerfu-word)*

    lerfu-string <- lerfu-word (PA# / lerfu-word)*

    lerfu-word <- BY# / word-BU# / LAU# lerfu-word / TEI# lerfu-string FOI#

**numberとはPA#から始まる一連のPA#とlerfu-wordの文字列である**。

**lerfu-stringとはlerfu-wordから始まる一連のPA#とlerfu-wordの文字列である**。

numberとlerfu-stringが最初の語の違いしかないことが分かります。  
**PA#**はdigit, 桁, 基本数です。1とか2とかです。

一方、

**lerfu-wordとはBY#またはword-BU#である**。

（LAU#とTEI#..FOI#については説明を省きます。というのも、これらはいまだかつてほとんど使われていないためです。）

BY#とは子音のアルファベットのことです。word-BUも何らかの１文字の名前にあたる語ですが、これについては後々やることにします。

結局のところ、numberやlerfu-stringというのは数字とアルファベットを組み合わせた一連の文字列のことです。

-----

ということで、急ぎ早に9種を説明しました。整理すればどうってことないかと思います。

さて、それではお待ちかね（？）のoperatorです。

    operator <- (SE# / NAhE#) operator / MAhO# mex TEhU#? / NAhU# selbri TEhU#?
    		/ VUhU# / JOhI# / joik-jek

まず、**operatorには複数個のSE#やNAhE#がつけられる**。

そして、 **MAhO# は mex（主に文字列）を、NAhU#はselbriを演算子化します**。

joik-jekはいつものｱﾚです。

**JOhI#はmexを繋げて配列化します**。ベクトルなどを表現するのに使われます。

そして、**VUhU#は演算子全般**です。  
加減乗除の二項演算から、絶対値・階乗などの一項演算、微分演算などの三項演算など色々ありますが、これらはすべて構文上は二項演算子として定義されます。

-----

ここでひとつだけ注意しておきたいことがあります。PEGはファイルの先頭から読まれていくと考えてください。そこで、

     description <- .. (LA# / LE#) (rels / bare-sumti)? (quantifier? selbri / quantifier sumti) KU#?

というのがあったことを思い出してください。

そしてさらに、

    bare-sumti <- .. / !tag !selbri lerfu-string !MOI# BOI#? / ..

があり、それより後ろに、

    mex-2 <- .. / lerfu-string BOI#? / ..

があります。

ここで、「LE# BY# selbri」 がどう解釈されるかを考えてみます。

BY# は　lerfu-string としてみなされるわけですが、それによってまずマッチするのが bare-sumtiであることが重要です。すなわち、**このとき BY# は quantifierとして解釈されません**。

（これは意味論も踏まえると、{lo ny. plise}が「N個のリンゴ」でなく、「Nと関係のあるリンゴ」と訳されるということです。）

BY#がquantifierとして解釈されるには、

LE# VEI# BY# VEhO#? selbri

と、VEI#を使う必要があることに注意してください。すなわち、**lerfu-stringをquantifierとして認識させたい場合はVEI#が必要となる**ということです。numberの場合は、numberはbare-sumtiになりませんから、VEI#がなくても quantiferとして認識されます。

-----

少し細かいところまで触れましたが、特に問題なかったかと思います。

mexも実のところ、numberの意味論がかなり充実しているので、意味論の勉強が少し大変かもしれません。しかし、ここで統語論を一度学んでいるので、意味論と統語論を分離して思考できるようになっていると思います。これはロジバンを学習するにあたって明瞭に道を見通せる力だと思います。

さて、残りもわずか！次は細々とした文法をやっていきます。


# 8章 - 細々としたもの（引用句） -

一段落つきはじめたところで、bare-sumti と tanru-unit-1 をもう一度見てみましょう。

    bare-sumti <- (description / LI# mex LOhO#? / KOhA# / ZO-word#
    		/ LU# paragraphs LIhU#? / LOhU-words-LEhU# / ZOI-anything#
    		/ !tag !selbri lerfu-string !MOI# BOI#?
    		/ !tag !selbri (LAhE# / NAhE# BO#) rels? sumti LUhU#?) rels?

    tanru-unit-1 <- BRIVLA# / word-ZEI-word# / GOhA# RAhO#?
    		/ ME# (sumti / mex) MEhU#? MOI#? / mex MOI#
    		/ NU# (joik-jek NU#)* subsentence KEI#?
    		/ KE# selbri-2+ KEhE#? / NUhA# operator
    		/ (SE# / JAI# tag? / NAhE#) tanru-unit-1

mexやlerfu-string, operator などなどを学んできましたから、これらのほとんどの要素が理解できるようになっていると思います。

しかし、この中にはまだ手強そうなものが残っていますね…。

- ZO-word#
- LOhU-words-LEhU#
- ZOI-anything#
- word-ZEI-word#

そして、前回に出てきた

- word-BU

今回はこの5つの正体を暴いてやりましょう！

----

### ZO-word

それでは順番にみていきます。まずは、ZO-wordから。

    ZO-word <- ZO any-word

ZOはいつもと同じ「ロジバンの語」ですが、#がついていません。

実は X# と X の違いは、Xの語の前後にごちゃごちゃ『飾り』がついているかどうかなのですが、Xは純粋にその語だけを表します。

**ZO-wordとは、ZOのあとにany-wordがきたものである**

さて、any-wordとは何かというと

    any-word <- CMEVLA / BRIVLA / CMAVO

これは、**ロジバンの語すべて**です。つまり、**ZOはその後ろにロジバンの語を何でも1つ取る**のです。

（ちなみに、ZOの意味論は「1語引用」です。なるほど確かに、と言った感じですね）

鋭い人はなぜZO#でなくZOなのかがわかったかと思います。そうです。**ZO#だとZOの前後の『飾り』を取り込んでしまう**からですね。


### LOhU-words-LEhU

次は LOhU-words-LEhUを見てみましょう：

    LOhU-words-LEhU <- LOhU (!LEhU any-word)* LEhU?

またまたany-wordが出てきました。LOhUから始まり、LEhU以外の語なんでもが複数個続いたあとに LEhUによって締められます。

LOhUにはやはり#がついていないことに注目してください。

（LOhU .. LEhU は「エラー引用括弧」と呼ばれています。なぜ「エラー」かというと、これは LU# .. LIhU# が構文上正しいロジバン文を引用するのに対して、LOhU .. LEhU は構文上正しくないロジバン語列を引用できるからです。）

### ZOI-anything

次はZOI-anythingです：

    ZOI-anything <- ZOI x (!x anything)* x

これは実はPEGとしては不適切な（というかPEGで表現できない）構造です。なので、それっぽく書きました。

つまり、**ZOIのあとに何か任意の一語(x)がきたのち、x以外の文字列がきて、xによって締められる**という構造です。

ここで、anythingであって、any-wordでないことに注意してください。**anythingはロジバン以外の言語の文字列もOKです**。つまり、日本語でも大丈夫です。

（ZOIは最も汎用的な引用開始語です。）


### word-ZEI-word と word-BU

以上の3つはどれもbare-sumti、すなわち sumtiになれる構造でした。次にするものは、tanru-unit-1, つまり、selbriになれる構造です。

    word-ZEI-word <- (ZO-word / LOhU-words-LEhU / ZOI-anything / any-word)
    		(ZEI-tail* BU-tail+)* ZEI-tail+

    ZEI-tail <- word-SI* ZEI any-word

続いて、word-BUも見ておきましょう：

    word-BU <- (ZO-word / LOhU-words-LEhU / ZOI-anything / any-word)
		(BU-tail* ZEI-tail+)* BU-tail+

    BU-tail <- word-SI* BU

word-ZEI-word にも word-BUにも共通の構造がありますね。

(ZO-word / LOhU-words-LEhU / ZOI-anything / any-word) です。

これは、**ZO-word, LOhU句, ZOI句はその他のany-wordと同じように1語とみなして取り扱う**ということです。それだけのことです。

それらの擬一語のあとに、word-ZEI-wordでは (ZEI-tail* BU-tail+)* ZEI-tail+ がきており、word-BUでは (BU-tail* ZEI-tail+)* BU-tail+ がきています。

ここで、なんとか-tail とは何かを見てみると

    ZEI-tail <- word-SI* ZEI any-word

    BU-tail <- word-SI* BU

となっています。とりあえず word-SI* は置いておきましょう。とすると、これらは

    ZEI-tail <- ZEI any-word

    BU-tail <- BU

となりますね。ということはたとえば、

XX ZEI XX BU ZEI XX BU BU ZEI XX

は word-ZEI-word と解釈されます。なお、XXはany-wordです。また、

XX BU ZEI XX ZEI XX BU BU ZEI XX BU BU

は word-BU と解釈されます。

（ZEIは無理やり２語を繋げてselbri化させる機能をもちます。word-BUは以前にも書きましたが、任意の語を前にとって「○○文字」や、それ相応のアルファベットを表すのに使われます。）

-----

あまり映えない回でしたね…。

さて、気づいた人がいるかもしれません。

「説明してきたものに # がついてないのだけど？」

その通りです。そこで、次回は # の謎を暴きたいとおもいます。


# 9章 - xxx# -

今回は、今までよく出てきた XX# という構造についてやります。

ほとんどすべての XXX# という構造は次のように定義されています：

    XXX# <- pre XXX post

一部の語は次のように post 部分が変わっています：

    COI# <- pre COI vocative-post

    PA# <- pre PA number-post

    BY# <- pre BY lerfu-post

    word-BU# <- pre word-BU lerfu-post

結局、**すべてのXX#にはその前にpreが、その後ろにpostがついている**ということです。

preとpostの中身を順にみていきましょう。


## pre, post

    pre <- (word-SI* BAhE)* word-SI*

    post <- !BU-tail !ZEI-tail free?

見たことのない要素が出てきました。

- free
- word-SI


### free

まずは free を見てみます。

    free <- UI# / XI# mex-2 / mex-2 MAI# / SEI# (term+ CU#?)? selbri SEhU#?
    		/ TO# paragraphs TOI#? / vocative

    vocative <- (COI#+ DOI#? / DOI#)
		(rels? selbri rels? / sumti? / rels? CMEVLA# rels?) DOhU#?

- UI#
- XI# mex-2
- mex-2 MAI#
- SEI# (term+ CU#?)? selbri SEhU#?
- TO# paragraphs TOI#?
- vocative

の6種類がfreeの構造としてあります。

mex-2はいわゆる「数式・数字」の部分でしたね。

UI#は単独でfreeとなります。UI#は最も頻繁に出てくるfreeの構造です。

XI# mex-2 や mex-2 MAI# も特に言うことはないです。

SEI# (term+ CU#?)? selbri SEhU#? と TO# paragraphs TOI#? はどちらも**文括弧**であることがわかります。ただし、SEI# .. SEhU# では文の構造はかなり制限されています。

TO# .. TOI# は sentenceで出てきた TUhU .. TUhE と形が似ていますが、TO# .. TOI# は**free**であり、ほとんどどこにでも置くことのできる文章構造体となっています。

そして vocative は・・・。もう特に言わなくても分かるかと思います。


### word-SI

次にword-SIを見てみます。

    word-SI <- (word-ZEI-word / word-BU / ZO-word / LOhU-words-LEhU / ZOI-anything
    		/ any-word) SI-tail

    SI-tail <- word-SI* SI

前回出てきた構造に似た、(word-ZEI-word / word-BU / ZO-word / LOhU-words-LEhU / ZOI-anything / any-word)が出ました。前回と違うところは、word-BUも含まれていることですね。やはり、**これらは擬似的に1語としてみなす**ということです。

そしてそのあとに SI-tail がきており、 SI-tailとは（word-SI*を除けば）SIそのものです。

（SIは「一語消去」です。つまり、word-SIとは「消された語とSI」という句を表しています）

-----

最後に、xxx-post についてみましょう。

     number-post <- !BU-tail !ZEI-tail (!PA# free)?

     lerfu-post <- !BU-tail !ZEI-tail (!lerfu-word free)?

     vocative-post <- !BU-tail !ZEI-tail (!vocative free)?

これらが言いたいのは、**特定の要素はメインの構造でなくてpostに取り込め**ということです。

-----

さて、最初に見た text をもう一度見てみましょう。

    text <- SI-tail* free? paragraphs FAhO#?

SI-tail と free は最初は飛ばしましたが、これですべてが分かるようになりました！

-----

これにて、おそらくすべての構文を把握できるようになったと思います。


# 最終章

おつかれさまでした。これでおかゆ超訳ロジバンは終了です。

xorxesの新文法案はこれよりもずっと簡潔なものであり、きっといまの力で読みこなせると思います。

現行文法もあまり変わりはしませんが、sa というツワモノがいるせいでごちゃごちゃ文法になってしまっています。  
おかゆ超訳は現行文法からsaに関わるところを取っ払って、適宜 xorxes案を導入した形となっています。

たとえば、主に現行文法と違っている点は、

- mex
- tag, 特に時制・空間制のtag
- freeのおける場所

です。

mexは本編でもコメントした通りです。

テンスタグについては、**より使い勝手のよい** 方を、ということでxorxes案を採用しました。  
実際、現行文法だと「不具合」に近い何かが起こっていますので…。

freeのおける場所については、おかゆ超訳では「XXX# の後ろならどこでも」としています。  
しかし、現行文法ではfreeのうち UI#以外の要素はおける場所が制限されています。  
おかゆ超訳ではそれを取っ払って、xorxesの新文法案と同じような仕様にしています。

そんなこんなで、「どっちつかずの」統語論となっていますが、実用性は十分だと思います。

一部、修飾構造が統語論とすれ違うようなものもありますが、基本的にはこの統語論に従えば迷うことはないはずです。

それでは、またどこかで。 co'o
