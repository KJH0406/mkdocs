# Category 1

## Posts in Category 1

<ul class="category-posts">
{% for post in site.posts %}
  {% if "category1" in post.categories %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.description }}</p>
    </li>
  {% endif %}
{% endfor %}
</ul>
