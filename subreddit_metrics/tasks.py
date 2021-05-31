from __future__ import absolute_import, unicode_literals
import requests
import csv
import time
from bs4 import BeautifulSoup
from subreddit_metrics.models import Activity_metrics
from superstonk_activity.celery import app

def convert_str_to_number(x):
    total_stars = 0
    num_map = {'K':1000, 'M':1000000, 'B':1000000000}
    if x.isdigit():
        total_stars = int(x)
    else:
        if len(x) > 1:
            total_stars = float(x[:-1]) * num_map.get(x[-1].upper(), 1)
    return int(total_stars)

@app.task(bind=True)
def get_subreddit_metrics(self):
    subreddits = ["https://www.reddit.com/r/Superstonk/", "https://www.reddit.com/r/wallstreetbets/", "https://www.reddit.com/r/GME/" ]
    headers = {'User-Agent': 'Mozilla/5.0'}
    for subreddit in subreddits:
        page = requests.get(subreddit, headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        online_count = soup.find_all("div", class_="_3XFx6CfPlg-4Usgxm0gK8R")
        new_metric = Activity_metrics.objects.create(Total_members=convert_str_to_number(online_count[0].text), Online_members=convert_str_to_number(online_count[1].text), Subreddit=subreddit)
        new_metric.save()