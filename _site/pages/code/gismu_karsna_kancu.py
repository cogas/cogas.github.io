# gismu の非語末母音と語末母音の頻度をカウントするためにつくった

import csv

csv_data = list(csv.reader(open("input_data/jpn-gimste.tsv", "rt", encoding="utf-8"), delimiter="\t"))
gimste = list()

for e in csv_data:
    gimste.append(e[0])

vowel = ["a", "e", "i", "o", "u"]

def tolseha (valsi):
    if (valsi[1] in vowel):
        pamoi = valsi[1]
    elif (valsi[2] in vowel):
        pamoi = valsi[2]
    remoi = valsi[-1]
    return (pamoi, remoi)

vowel_pairs = list()

for valsi in gimste:
    vowel_pairs.append(tolseha(valsi))

xabmapti = {}
for pa in vowel:
    xabmapti[pa] = {}
    for re in vowel:
        xabmapti[pa][re] = vowel_pairs.count((pa,re))
    
# 語末母音の頻出度
fanmo = dict()
for e in vowel:
    fanmo[e] = 0
    for m in vowel:
        fanmo[e] = fanmo[e] + xabmapti[m][e]

#非語末母音の頻度    
cfari = dict()
for e in vowel:
    cfari[e] = 0
    for m in vowel:
        cfari[e] = cfari[e] + xabmapti[e][m]

#トータルでの母音の頻度        
sumji = dict()
for e in vowel:
    sumji[e] = cfari[e] + fanmo[e]
