from rest_framework import serializers
from subreddit_metrics.models import Activity_metrics, Subreddit

class Activity_metrics_Serializer(serializers.ModelSerializer):
    Created_date = serializers.DateTimeField(format="%m-%d-%Y %H:%M:%S")
    class Meta:
        model = Activity_metrics
        fields = ['Created_date', 'Subreddit', 'Total_members', 'Online_members', 'Price']

class Subreddit_Serializer(serializers.ModelSerializer):
    Created_date = serializers.DateTimeField(format="%m-%d-%Y %H:%M:%S")
    Activity_metrics = Activity_metrics_Serializer(read_only=True, many=True)
    class Meta:
        model = Subreddit
        fields = ['Created_date', 'Subreddit_Name', 'Subreddit_Link', 'Subreddit_Description', 'Activity_metrics']