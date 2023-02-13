# MoviesAPI-v.2

A Web Application in React with database in MongoDB and Redis, made for Cloud Technologies course in University of Gdansk in June 2022.
In the application you can add, delete, edit and search for movies stored in the database.
Client repository: https://github.com/LudwikaMalinowska/MoviesAPI-2022

MongoDB database stores information about movies, persons and actors, while Redis database stores the logs of all the 
operations on the backend GET/POST/PUT/PATCH/DELETE.


To run the application:

- While in the /Projekt/ directory: 

- kubectl apply -f kubernetes/configmap/
- kubectl apply -f kubernetes/service/
- kubectl apply -f kubernetes/deployment/
- kubectl apply -f kubernetes/volumes/
- kubectl apply -f kubernetes/volumeclaims/
- kubectl apply -f kubernetes/ingress/


Checking if API works:

- curl devops/api/movies
- curl devops/api/persons
- curl devops/api/actors
- curl devops/api/logs - endpoint bazy redis


Frontend works on page:

- http://devops


![image](https://user-images.githubusercontent.com/58569359/157292722-d6dd807a-3246-4fbd-9bde-921355a8924b.png)


![image](https://user-images.githubusercontent.com/58569359/157292782-355c209b-c48c-44d8-99e9-2decb87f6a16.png)


![image](https://user-images.githubusercontent.com/58569359/157292855-245a5c79-e43a-4353-b148-5d56c5ae8bf0.png)


![image](https://user-images.githubusercontent.com/58569359/157292921-0af7d3df-63ea-4bac-87fc-7cf831acc684.png)


![image](https://user-images.githubusercontent.com/58569359/157293006-8fc2fd1f-9d0a-4868-a8db-ee504db15699.png)


![image](https://user-images.githubusercontent.com/58569359/157293078-ddde4466-0ab2-4c00-9fcd-1863bc1f4ec8.png)
