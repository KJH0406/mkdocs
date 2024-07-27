# Welcome to My Blog

## Recent Posts

<ul class="recent-posts">
{% for post in site.posts[:5] %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.description }}</p>
  </li>
{% endfor %}
</ul>

## Categories

- [Category 1](categories/category1.md)
- [Category 2](categories/category2.md)
