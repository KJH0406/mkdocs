# Category 2

## Posts in Category 2

<ul class="category-posts">
{% for post in site.posts %}
  {% if "category2" in post.categories %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.description }}</p>
    </li>
  {% endif %}
{% endfor %}
</ul>
