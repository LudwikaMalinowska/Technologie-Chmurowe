# uruchamianie projektu

kubectl apply -f kubernetes/configmap/
kubectl apply -f kubernetes/service/
kubectl apply -f kubernetes/deployment/
kubectl apply -f kubernetes/volumes/
kubectl apply -f kubernetes/volumeclaims/
kubectl apply -f kubernetes/ingress/

# sprawdzanie czy api działa

curl devops/api/movies
curl devops/api/persons
curl devops/api/actors
curl devops/api/logs

# frontend działa na stronie

http://devops

# repliki

react i express mają po dwie repliki na wypadek jakby jeden z podów nie działał
podczas wzmożonego ruchu na stronie

bazy mongo i redis mają tylko po 1 replice, ponieważ tutaj należałoby zrobić
dla nich StateFulSet zamiast deploymentu, aby uniknąć konfliktów w zapisie do bazy,
ponieważ jeśli używa się deployment przy bazie, to każda replika ma inne dane
