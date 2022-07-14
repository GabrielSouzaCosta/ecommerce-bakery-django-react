<h1>Django Rest Framework / React JS Bakery Ecommerce</h1>
This website is a simulation of a bakery online shop, being possible to buy products from it.

<h1>BACKEND:</h1>
Technologies used: Django Rest Framework, Django Rest Registration, AWS S3
<br><br>
Admin: as this is a business site, products are only registered by the site administrator, so all products were registered by the django admin.
<br><br>
User authentication: Django Rest Registration was used, it works great with the frontend. Its possible to create an account, validate it by an email link and reset your password.
<br><br>

![Screenshot from 2022-07-14 08-56-58](https://user-images.githubusercontent.com/79537042/178977033-2e6c9a49-2bf3-4f3c-b6ec-de651b534eb1.png)

Models: I used a Custom User Model, it has a Product Model which has all the product information and it is possible to upload an image to it, the file is saved in my personal S3 Bucket, django-storages was used for the configuration

<h2>Products Page</h2>

![Screenshot from 2022-07-14 09-19-55](https://user-images.githubusercontent.com/79537042/178980833-b79f112d-9c4c-4d81-bd9c-294a6998c571.png)

<hr>
<h1>FRONTEND:</h1>
Technologies used: React JS, React Router, React Redux, React Redux, Bootstrap/React-Bootstrap, Scss/Sass
<br><br>
React Router V6:  essential for routing pages, navigate through pages.
React Redux: It was only used to do the add products to cart part, get these products on the cart and checkout page.
Bootstrap/React-Bootstrap: I mixed the use of both frameworks.
Scss/Sass: Mainly used to customize bootstrap colors.

<h2>Homepage</h2>

![Screenshot from 2022-07-14 09-26-28](https://user-images.githubusercontent.com/79537042/178981962-32a6d11b-6273-416a-a835-3e8fcf99e0bf.png)

<hr>
<h1>PAYMENT (Stripe)</h1>
I used Stripe to deal with the payment functionality, it interacts with both backend and frontend. 
If you want to test use this test card 4242 4242 4242 4242 and any expiration date above current date and CVC.
<h2>Checkout Page</h2>

![Screenshot from 2022-07-14 09-25-27](https://user-images.githubusercontent.com/79537042/178981783-7044fda5-61d3-4311-841a-cd14658efd0b.png)

<hr>

<h1>HOST</h1>
Both backend and frontend are hosted on a free heroku account.
Frontend: https://bakery-ecommerce-drf-frontend.herokuapp.com/
Backend: https://bakery-ecommerce-drf-backend.herokuapp.com/ (you need to access /api/v1/ endpoints)

