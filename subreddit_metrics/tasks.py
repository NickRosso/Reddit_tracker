from __future__ import absolute_import, unicode_literals
import requests
import csv
import time
from bs4 import BeautifulSoup
from subreddit_metrics.models import Activity_metrics
from superstonk_activity.celery import app

@app.task(bind=True)
def get_subreddit_metrics(self):
    subreddits = ["https://www.reddit.com/r/Superstonk/", "https://www.reddit.com/r/wallstreetbets/", "https://www.reddit.com/r/GME/" ]
    headers = {'User-Agent': 'Mozilla/5.0'}
    for subreddit in subreddits:
        page = requests.get(subreddit, headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        online_count = soup.find_all("div", class_="_3XFx6CfPlg-4Usgxm0gK8R")
        new_metric = Activity_metrics.objects.create(Total_members=online_count[0].text, Online_members=online_count[1].text, Subreddit=subreddit)
        new_metric.save()