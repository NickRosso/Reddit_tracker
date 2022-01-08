from django.contrib import admin
from subreddit_metrics.models import Activity_metrics, Subreddit
# Register your models here.
admin.site.register(Activity_metrics)
admin.site.register(Subreddit)