---
layout: default
title: index
---

### ロジバン関連 -lo ckini be lo lojbo bei da-

<ul>
{% for x in site.pages %}
  {% assign y = x.url | split: "/" | size %}
  {% if x.url contains "/pages/lojbo" and y == 4 %}
    <li>
      <a href="{{x.url}}">{{x.title}}</a> -- {{x.date}}
    </li>
  {% endif %}
{% endfor %}
</ul>

### 人工言語かんれん -ra'a lo runbau-

- [ceniski](https://sites.google.com/site/enishikiceniski/){:target="blank"}（外部）
- [xaana palaadi](https://sites.google.com/site/xaanapalaadi/home){:target="blank"}（外部）

<ul>
{% for x in site.pages %}
  {% assign y = x.url | split: "/" | size %}
  {% if x.url contains "/pages/runbau" and y == 4 %}
    <li>
      <a href="{{x.url}}">{{x.title}}</a> -- {{x.date}}
    </li>
  {% endif %}
{% endfor %}
</ul>


### そのた -lo drata-

<ul>
{% for x in site.pages %}
  {% assign y = x.url | split: "/" | size %}
  {% if x.url contains "/pages/" and y == 3 %}
    <li>
      <a href="{{x.url}}">{{x.title}}</a> -- {{x.date}}
    </li>
  {% endif %}
{% endfor %}
</ul>


### さいと -lo kibro stuzi-


- [はじめてのロジバン第２版](./hajiloji){:target="blank"}（外部） : ロジバン入門講座の第２版。みかんです。
- [はじめてのロジバン](http://seesaawiki.jp/hajiloji/){:target="blank"}（外部） : ↑ の前版
- [ゆくゆくは有へと](http://iuk.hateblo.jp/){:target="blank"}（外部）
- [味噌煮込みロジバン](http://misonikomilojban.blogspot.jp/){:target="blank"}（外部） : ロジバン考察＆学習ブログ
- [やくみ堂～砂漠から徒歩３分～](http://yakumido.blogspot.jp/){:target="blank"}（外部） : もうほとんど使ってないけど雑記ブログ


<!--
<h3 >- じゃんく ぷよぐやむ -</h3>
<ul class="list1">
<li><a href="./js/canv.html">２つのバネに繋がれた物体の運動</a></li>
<li><a href="./js/randomass.html">ランダマス</a></li>
<li><a href="./js/crazyclock.html">crazy clock</a></li>
<li><a href="./js/mosaic.html">mosaic</a></li>
<li><a href="./js/cellautomata.html">ライフゲーム</a></li>
<li><a href="./js/ball.html">ボール</a></li>
<li><a href="./js/lifegame_mini.html">ライフゲーム - mini -</a></li>
<li><a href="./js/ball_att.html">ボールと戯れ</a></li>
<li><a href="./js/diffusion.html">拡散</a></li>
<li><a href="./js/turing.html">反応拡散方程式</a></li>
<li><a href=""></a></li>        
</ul>
-->

## わたし -mi-

mi'e cogas.iuk.uasanbon .i mi remna .i mi danlu .i mi dacti
