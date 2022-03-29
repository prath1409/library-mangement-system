for i in {1..50}
do
echo $i
curl -X 'POST' \
  'http://localhost:8080/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "prathmesh.gheware@afourtech.com",
  "password": "12224"
}'
done