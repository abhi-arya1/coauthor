pip3 install -t dependencies -r requirements.txt
(cd dependencies; zip ../aws_lambda_artifact.zip -r .)
zip aws_lambda_artifact.zip -u main.py