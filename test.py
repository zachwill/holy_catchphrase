#!/usr/bin/env python

"""Tests for the Flask Heroku template."""

import unittest
from app import create_app


class TestApp(unittest.TestCase):

    def setUp(self):
        app = create_app()
        self.app = app.test_client()

    def test_index_page_works(self):
        rv = self.app.get('/')
        self.assertTrue(rv.data)
        self.assertEquals(rv.status_code, 200)

    def test_api_works(self):
        rv = self.app.get('/api')
        self.assertTrue(rv.data)
        self.assertEquals(rv.status_code, 200)

    def test_api_for_catchphrases_works(self):
        rv = self.app.get('/api/catchphrases')
        self.assertTrue(rv.data)
        self.assertEquals(rv.status_code, 200)

    def test_api_for_actions_works(self):
        rv = self.app.get('/api/actions')
        self.assertTrue(rv.data)
        self.assertEquals(rv.status_code, 200)

    def test_404_page(self):
        rv = self.app.get('/i-am-not-found/')
        self.assertEquals(rv.status_code, 404)

    def test_static_text_file_request(self):
        rv = self.app.get('/humans.txt')
        self.assertTrue(rv.data)
        self.assertEquals(rv.status_code, 200)


if __name__ == '__main__':
    unittest.main()
