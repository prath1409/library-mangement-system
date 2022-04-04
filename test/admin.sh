for i in {1..50}
do
echo $i
curl -X 'GET' \
  'http://localhost:8080/getStudentsByBookName/JS%20Fundamentals' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgyMjdmLTEwMzAtNDliMC1hMjI0LTkxZmNkYTUyMGZhOSIsImVtYWlsIjoiZGhhbnNocmVlLnJvbmdoZUBhZm91cnRlY2guY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MTgwMjg5LCJleHAiOjE2NDgxOTIyODl9.gp1PJnIjM0Xkw3tNpLzoSG6yF4aDA-NLCzh8uy3xuy4'
done


for i in {1..50}
do
echo $i
curl -X 'GET' \
  'http://localhost:8080/getBooksByUserName/prathmesh.gheware%40afourtech.com' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgyMjdmLTEwMzAtNDliMC1hMjI0LTkxZmNkYTUyMGZhOSIsImVtYWlsIjoiZGhhbnNocmVlLnJvbmdoZUBhZm91cnRlY2guY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MTgwMjg5LCJleHAiOjE2NDgxOTIyODl9.gp1PJnIjM0Xkw3tNpLzoSG6yF4aDA-NLCzh8uy3xuy4'
done
