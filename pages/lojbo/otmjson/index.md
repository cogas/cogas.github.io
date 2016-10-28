---
layout: post
title: jbovlaste OTM-JSON
date: 2016-10-28
revised_date:
---

[ZpDIC](http://ziphil.web.fc2.com/application/download/2.html) で使える形式。

### 2016-10-25

{% assign words = "eng, jbo, jpn" | split: ", " %}
{% for word in words%}
- [jbo-{{word}}](161025/jbo-{{word}}_otm.json)
{% endfor %}

[zip](161025/otm-json161025.zip)
