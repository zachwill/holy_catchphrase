"""Helpful utility functions that do not deal with requests."""

import simplejson as json


def batman_words():
    """Return available Batman words."""
    with open('app/catchphrases.js') as f:
        words = json.loads(f.read())
    return words
