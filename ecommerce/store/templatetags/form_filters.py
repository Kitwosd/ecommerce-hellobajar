# accounts/templatetags/form_filters.py
from django import template

register = template.Library()

@register.filter(name='add_class')
def add_class(field, css_class):
    return field.as_widget(attrs={"class": css_class})

# Don't forget to load this in your templates with:
# {% load form_filters %} at the top of register.html