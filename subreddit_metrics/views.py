from django.shortcuts import render
import datetime
from subreddit_metrics.models import Activity_metrics
from subreddit_metrics.serializers import Activity_metrics_Serializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response

class ListActivity(generics.ListAPIView):
    serializer_class = Activity_metrics_Serializer
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `subreddit` query parameter in the URL.
        """
        
        queryset = Activity_metrics.objects.all()
        subreddit = self.request.query_params.get('subreddit')
        timespan = self.request.query_params.get('timespan')
        print(timespan)
        if subreddit is not None:
            if timespan is not None:
                timespan = int(timespan)
                queryset = queryset.filter(Created_date__lte=datetime.datetime.today(), Created_date__gt=datetime.datetime.today()-datetime.timedelta(minutes=timespan), Subreddit__contains=subreddit).order_by('Created_date')
            else:
                queryset = queryset.filter(Subreddit__contains=subreddit).order_by('Created_date')
        return queryset