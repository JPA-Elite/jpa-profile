Title: My Portfolio App

Short Description: a project for my own portfolio

Languages: python

## INSTALL PACKAGE
- `cd flask && pip install -r requirements.txt` or run `make package-install`

## LANGUAGE TRANSLATION COMMANDS
1. `pybabel extract -F babel.cfg -o messages.pot .`
2. `pybabel init -i messages.pot -d translations -l ceb`
3. `pybabel init -i messages.pot -d translations -l en`
4. `pybabel compile -d translations`

## START UP
1. cd fask
2. run command: `cd flask && python app.py`,
   run command: `make start-local` or `make run-local`