from rest_framework import serializers
from subreddit_metrics.models import Activity_metrics
class Activity_metrics_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Activity_metrics
        fields = ['Created_date', 'Subreddit', 'Total_members', 'Online_members']