This project was a quick way to start tracking Subreddit online users/ total members. We leverage Celery, Django, BS4, React, and Recharts to create these visualizations.

#Setup
''' 
docker-compose build
docker-compose up
'''
Exec into the web container
'''
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
'''
Login with super user to Localhost:8000/admin
Create a Interval task that runs the celery task to scrape data with your prefered interval time.

![](images/Subreddit_metrics.PNG)

![](images/subreddit_list.PNG)

![](images/api_metric_list_view.PNG)
