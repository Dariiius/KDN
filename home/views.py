from django.shortcuts import render
from django.http import HttpResponse

from ka1den.ka1den.settings import S3_URL

def index(request):
    return render(request, 'home/index.html')


def invitation(request):
    
    context = {
        'S3_URL': S3_URL
    }
    return render(request, 'home/invitation.html', context)
