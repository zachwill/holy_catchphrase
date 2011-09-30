"""
Flask Blueprint Docs:  http://flask.pocoo.org/docs/api/#flask.Blueprint

This file is used for both the routing and logic of your
application.
"""

import random
from flask import Blueprint, render_template, request, jsonify, url_for
from app.utils import batman_words

views = Blueprint('views', __name__, static_folder='../static',
                  template_folder='../templates')


BATMAN_WORDS = batman_words()
CATCHPHRASES = BATMAN_WORDS['catchphrases']
ACTION_WORDS = BATMAN_WORDS['actions']


@views.route('/')
def home():
    """Render the website's home page."""
    random_data = random_choices('internal')
    action, catchphrase = random_data['action'], random_data['catchphrase']
    return render_template('home.html', action=action, catchphrase=catchphrase)


@views.route('/api/<endpoint>')
@views.route('/api')
def interface(endpoint=""):
    """API for available catchphrases and action words."""
    # Local variables are faster.
    catchphrases, action_words = CATCHPHRASES, ACTION_WORDS
    if 'catchphrase' in endpoint:
        data = {'catchphrases': catchphrases}
    elif 'action' in endpoint:
        data = {'actions': action_words}
    else:
        data = BATMAN_WORDS
    return jsonify(data)


@views.route('/random/<environment>')
@views.route('/random')
def random_choices(environment='external'):
    """Return a random catchphrase or action word."""
    # Local variables are faster.
    catchphrases, action_words = CATCHPHRASES, ACTION_WORDS
    data = {
        'action': random.choice(action_words),
        'catchphrase': random.choice(catchphrases)
    }
    if environment == 'internal':
        return data
    return jsonify(data)


# The functions below should be applicable to all Flask apps.

@views.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return views.send_static_file(file_dot_text)


@views.route('/qunit/')
def qunit():
    """Render a QUnit page for JavaScript tests."""
    return render_template('test_js.html')


@views.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=300'
    return response


@views.app_errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404
