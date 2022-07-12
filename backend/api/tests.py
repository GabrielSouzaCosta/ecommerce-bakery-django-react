from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase

class EmailVerificationTest(APITestCase):

    # endpoints needed
    register_url = "/api/v1/users/"
    activate_url = "/api/v1/users/activation/"
    login_url = "/api/v1/token/login/"
    user_details_url = "/api/v1/users/"
    # user infofmation
    user_data = {
        "email": "test@example.com", 
        "password": "verysecret",
        "re_password": "verysecret"
    }
    login_data = {
        "email": "test@example.com", 
        "password": "verysecret"
    }

    def test_register_with_email_verification(self):
        # register the new user
        response = self.client.post(self.register_url, self.user_data, format="json")
        # expected response 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # expected one email to be send
        self.assertEqual(len(mail.outbox), 1)
        
        # parse email to get uid and token
        email_lines = mail.outbox[0].body.splitlines()
        # you can print email to check it
        # print(mail.outbox[0].subject)
        # print(mail.outbox[0].body)
        activation_link = [l for l in email_lines if "/activate/" in l][0]
        uid, token = activation_link.split("/")[-2:]
        
        # verify email
        data = {"uid": uid, "token": token}
        response = self.client.post(self.activate_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # login to get the authentication token
        response = self.client.post(self.login_url, self.login_data, format="json")
        self.assertTrue("auth_token" in response.json())
        token = response.json()["auth_token"]

        # set token in the header
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)