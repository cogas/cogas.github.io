import random as rd
import csv


class Lerfu:
    # 単語を構成する文字のリスト
    lerste = ["a", "e", "k", "s"]
    
    # 文字それぞれに対するna'uste(namcu liste = 数値のリスト）の集まり（gunma）。文字Xからの遷移確率のリスト。
    gunynahuste = {
                lerste[0]:[0.1, 0.1, 0.4, 0.4],
                lerste[1]:[0.1, 0.0, 0.3, 0.6],
                lerste[2]:[0.4, 0.4, 0.1, 0.1],
                lerste[3]:[0.4, 0.4, 0.1, 0.1],
                }
    
    #　上の lerste と gunynahuste はデフォルトで、実際は実行時に読み込むcsvによって再構成される。
    
    # Lerfuインスタントはcunste（確率リスト）を有する。cunsteは(文字, 確率)なるタプルからなるリスト
    def __init__(self, cunste=[], eq=True):
        self.cunste = cunste
        
        # cunsteはデフォルトでは等確率になる。
        if(cunste==[] and eq):
            self.cunste = list(zip(Lerfu.lerste, len(Lerfu.lerste)*[1./len(Lerfu.lerste)]))
    
    # cunste を cpacu する。        
    def getCunste (self): 
        return self.cunste
            
    # na'uste から cunste を生成する。 nahuste ≦ lerste でなければならない。
    # flat = True のとき、与えられた nahuste を規格化する ex) when [1, 1, 0, 0], converted [0.5, 0.5, 0, 0].
    # dstr = True のとき、1-sum(na'uste)分をna'usteで与えられていないlerfuに等分配する。 False なら na'usteで確率が与えられていないlerfuは確率0.
    # かなり改良の余地はあるが、csvでまともな行列を読み込ませる限りはこんな仕様はいらない。
    def setCunste (self, nahuste, flat=True, dstr=False):
        try:
            n = len(Lerfu.lerste)-len(nahuste)
            if(dstr):
                if(((1-sum(nahuste)) < 0) or ((1-sum(nahuste)) >1) ):
                    raise
                nahuste = nahuste + n*[(1-sum(nahuste))/float(n)]
            else:   
                nahuste = nahuste + n*[0]
            if(flat):
                nahuste = list(map(lambda x: float(x)/sum(nahuste), nahuste))
            self.cunste = list(map(lambda x,y: (x,y), Lerfu.lerste, nahuste))
        except:
            print ("error")
            raise
        finally:
            return self.cunste
    
    # lerfuのもつ確率分布リストに従ってlerfuをランダム抽出する
    def sampling (self):
        randomListe = []
        for (i,j) in self.getCunste():
            randomListe = randomListe + int(100000*j)*[i]
        return rd.sample(randomListe,1)[0]
        

# 生成された単語のチェック（ここではトキポナ仕様）
def valsi_check (vla):
    if(vla[-1] in ['P', 'T', 'K', 'S', 'M', 'L', 'W', 'J']):
        return False
    elif(vla[0:2] in map(lambda x:"N"+x, ['P', 'T', 'K', 'S', 'M', 'N', 'L', 'W', 'J'])):
        return False
    else:
        return True

# 単語の生成。lerna'u は生成する単語の文字数。pamoiは開始文字を指定できる。
def finti_valsi(lernahu, pamoi = ""):
    valsi = pamoi
    if(valsi == ""):
        valsi = Lerfu().sampling()
    for i in range(lernahu-len(valsi)):
        romoi = valsi[-1]
        temp = Lerfu(Lerfu().setCunste(Lerfu.gunynahuste[romoi]))
        valsi = valsi + temp.sampling()
    if (valsi_check(valsi)):
        return valsi
    else:
        return finti_valsi(lernahu, pamoi = pamoi)

# 単語列の生成。finti_valsiによって複数個の単語を生成。vlana'u は単語数、 lerna'u は単語の文字数。
def finti_vlapoi (vlanahu, lernahu, pamoi=""):
    return [finti_valsi(lernahu, pamoi=pamoi) for e in range(vlanahu)]

# finti_vlapoi のそれぞれの単語の文字数を設定できるver.
def finti_vlapoi_2 (vlanahu, lernahuste = [5]):
    if (vlanahu > len(lernahuste)):
        lernahuste = lernahuste + (vlanahu - len(lernahuste))*[lernahuste[-1]]
    return [finti_valsi(lernahuste[i]) for i in range(vlanahu)]

# finti_vlapoi_2 のlernahuste をランダムに作る。min, max は単語文字数の下限と上限。
def finti_vlapoi_3 (vlanahu, min=2, max=8):
    return finti_vlapoi_2 (vlanahu, [rd.randint(min, max) for i in range(vlanahu)])

# csvファイルから遷移行列を読み込む。形としては
#  , a,   b
# a, 0.5, 0.5
# b, 0.2, 0.8 

csv_data = list(csv.reader(open("tok2.csv", "rt", encoding="utf-8"), delimiter=","))
Lerfu.lerste = csv_data[0][1:]

Lerfu.gunynahuste = {}
for es in csv_data[1:]:
    Lerfu.gunynahuste[es[0]] = list(map(lambda x:x/sum(map(lambda x:float(x), es[1:])),map(lambda x:float(x), es[1:])))

