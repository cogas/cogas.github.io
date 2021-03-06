---
layout: post
date : 2014-10-1
title : オフラインでロジバン辞書を使う
---

<p>Goldendictというフリーソフトで、ロジバン辞書をオフラインで使えるようになります。Windows7/8で話をしていきます。</p>

<section >
<h2 >1. Goldendictのダウンロード</h2>
<p><a href="http://goldendict.org/download.php">ここ</a>に飛んで、"32-bit Windows installer"というリンクをクリック。<br>
おそらくリストの一番上にあります。32-bitですが、64-bitでも一応起動しています。<br>
自動的にダウンロードが始まるので、適当なところにインストーラを保存してください。
</p></section>

<section >
<h2 >2. Goldendictのインストール</h2>
<p>インストーラを起動して、どこにインストールされるのかをチェックしつつ、ガシガシ進める。</p>
<p>僕の場合は、"C:\Program Files(x86)\GoldenDict"でした。</p>
</section>

<section >
<h2 >3. 辞書データの保存フォルダの作成</h2>
<p >``C:\Program Files(x86)\GoldenDict``に新しくフォルダを作ります。"dict"にしときましょう。</p>
</section>


## 辞書データのダウンロード

辞書データはla guskantが作成しています(ki'e guskant)。

<a href="http://guskant.github.io/lojbo/stardict.html">ここ</a>に飛んで、"Basic Selection"の4つ(lojban, English, rafsi, selma'o)と、  
"Optional selection"の「日本語」をすべて適当なところにダウンロードする。

他言語の辞書も欲しい方はここでダウンロードしておいてください。

<section >
<h2 >4. 辞書データの解凍</h2>
<p >解凍していきます。たぶんOSの解凍ツールだと解凍できないので、各自解凍ツールを入れてください。僕は「7Zip」使ってます。</p>
<p >解凍が終わるとこんな感じになると思います。<br>
<img src="pixra/001.jpg"></p>
<p >解凍によって出来たフォルダをさっき作った"dict"フォルダにぶちこみます。<br>
解凍作業を"dict"フォルダでしていたのなら、そのままでOKです。</p>
</section>

<section >
<h2 >5. 辞書データの導入</h2>
<p >GoldenDictを開き、ツールバー"Edit"から"Dictionaries"をクリックします。</p>
<p >色々タブがありますが、SourcesタブのFilesタブを選択（おそらくデフォルトでそれが開いているはず)。</p>
<p >右側にある"Add"を押して、"dict"フォルダを選択します。Pathのところに指定したフォルダが無事表示されれば、
右下の"Rescan now"を押してから、"OK"を押す。</p>
<p ><img src="pixra/003.jpg" width="450" height="300"></p>
</section>


<section >
<h2 >6. 完成・レイアウト調整</h2>
<p >多分こんな感じになっているはずです。</p>
<p ><img src="pixra/002.png"></p>
<p >少しレイアウトを整えていきます。ツールバーの"View"から "Show names in Dictionary Bar"にチェック。<br>
これによって、辞書選択ボタンに辞書データ名が出てきます。</p>
<p >各セクションはドラッグ＆ドロップで好きなように変えれるのでお好みで調整しましょう。</p>
</section>

<section >
<h2 >8. ちょっとだけ操作方法</h2>
<p >辞書データのボタンが凹んでいる状態がONです。WikipediaのボタンはOFFにしておきましょう。</p>
<p >GoldenDictでは複数タブが開けますし、辞書定義の単語をダブルクリックするとその語の定義に飛びます。</p>
<p >ちなみにデフォルトの設定だと、窓を消しただけでは、辞書はタスクバーに残っています。</p>
<p >また、便利なショートカットキーとしては、次の２つを覚えておくといいかもしれません：
<ul >
<li >Ctrl + F11 + F11　：辞書の呼び出し</li>
<li >Ctrl + L ：検索テキストボックスにカーソルをうつす</li>
</ul>
</p>
</section>
