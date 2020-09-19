"""
run.py
- creates an application instance and runs the dev server
"""
import env

from application import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
