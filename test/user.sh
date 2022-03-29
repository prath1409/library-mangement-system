for i in {1..50}
do
echo $i
curl -X 'GET' \
  'http://localhost:8080/issuedBooks' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgyMjdmLTEwMzAtNDliMC1hMjI0LTkxZmNkYTUyMGZhOSIsImVtYWlsIjoiZGhhbnNocmVlLnJvbmdoZUBhZm91cnRlY2guY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MjAwMTcwLCJleHAiOjE2NDgyMTIxNzB9.DLoEIkakVnvUBEl2qtzFcHtmrCTR8g9vWfvnPtWpC54'
done


for i in {1..50}
do
echo $i
curl -X 'GET' \
  'http://localhost:8080/availableBooks' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgyMjdmLTEwMzAtNDliMC1hMjI0LTkxZmNkYTUyMGZhOSIsImVtYWlsIjoiZGhhbnNocmVlLnJvbmdoZUBhZm91cnRlY2guY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MjAwMTcwLCJleHAiOjE2NDgyMTIxNzB9.DLoEIkakVnvUBEl2qtzFcHtmrCTR8g9vWfvnPtWpC54'done

# for i in {1..50}
# do
# echo $i
# curl -X 'POST' \
#   'http://localhost:8080/requestBook' \
#   -H 'accept: application/json' \
#   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOWFmZmFmLTg1YzEtNDE5YS1iNjUwLTcwZDYyM2QwZDU1YyIsImVtYWlsIjoicHJhdGhtZXNoLmdoZXdhcmVAYWZvdXJ0ZWNoLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ4MTc5NjY4LCJleHAiOjE2NDgxOTE2Njh9.8vFBf9dFTghX-d-f_h8ooQtv22DaA_OWm4-RDG2QqBs' \
#   -H 'Content-Type: application/json' \
#   -d '{
#   "name": "JS Fundamentals"
# }'
# done

# for i in {1..50}
# do
# echo $i
# curl -X 'PUT' \
#   'http://localhost:8080/returnBook/JS%20Fundamentals' \
#   -H 'accept: application/json' \
#   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOWFmZmFmLTg1YzEtNDE5YS1iNjUwLTcwZDYyM2QwZDU1YyIsImVtYWlsIjoicHJhdGhtZXNoLmdoZXdhcmVAYWZvdXJ0ZWNoLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ4MTc5NjY4LCJleHAiOjE2NDgxOTE2Njh9.8vFBf9dFTghX-d-f_h8ooQtv22DaA_OWm4-RDG2QqBs'
# done
