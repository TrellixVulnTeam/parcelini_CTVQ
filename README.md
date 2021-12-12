# parcelini

## For Backend

1. Create a virtual environment 

`conda create --name parcelini-venv python=3`

2. Activate the environment

`source activate parcelini-venv`

3. Clone the repository and enter that directory

`git clone https://github.com/Parcelini/parcelini.git`

`cd parcelini`

4. Install the requirments

`pip install -r requirements.txt`

5. Set all environment variables. Replace `my_var` and `value` with respective variables and values.

`conda env config vars set my_var=value`

6. Run migrations

`python manage.py migrate`

7. Launch the server

`python manage.py runserver --insecure`


## For Frontend

### To run development enviroment in react

1. Go inside frontend directory within main app

`cd frontend`

2. Install npm dependencies

`npm install`

3. Run development server

`npm run dev`

Development server hot-reloads the changes you make in react immediately 

### To compile the frontend changes before pushing to server

`npm run build`

