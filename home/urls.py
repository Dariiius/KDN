from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('invitation', views.invitation, name='invitation'),
]