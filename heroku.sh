#!/bin/bash
cd backend

# gunicorn application:app --daemon
# python manage.py runworker
gunicorn application:app
