---
layout: default
title: lo mi lojbo .iu
---

# {{ site.title }}

## あいうえおあいうえお

title: {{ site.title }}

port: {{ site.port }}

markdown : {{ site.markdown }}

permalink: {{ site.permalink }}

baseurl: {{ site.baseurl }}

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date_to_long_string }} : {{ post.title }}</a>
  </li>
{% endfor %}
</ul>


**Copyright © {{ site.author.name }} 2014 All rights reserved. Please contact to {{ site.author.email }}.**
