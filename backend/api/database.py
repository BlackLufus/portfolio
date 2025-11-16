"""
Used Links: [
    https://pynative.com/python-postgresql-select-data-from-table/
    https://www.postgresqltutorial.com/postgresql-python/connect/
]
"""
import traceback
import psycopg2 as database
from psycopg2.extensions import connection
import atexit
import logging
import os

connection: connection = None

logger = logging.getLogger()


# TODO We need to figure out how to load config information of external file


# This is where the database connection is established
def connect():
    try:
        logger.debug('Connecting to the PostgreSQL database...')

        # global parameter to store the connection global
        global connection

        # Creates a database connection
        connection = database.connect(
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD')
        )

        logger.debug('Connection to postgreSQL was successful')

        # Creating a cursor object using the cursor() method
        cursor = connection.cursor()

        # Executing an MYSQL function using the execute() method
        cursor.execute("select version()")

        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        logger.debug(f"Connection established to: {data}")

    except Exception as e:
        logger.error('Failed to connect to postgreSQL database:')
        logger.error(e)


# Here the query statement can be executed
def statement(query, values=None):
    try:
        logger.debug(f"got inside {str(connection)}")
        # Check if Connection is still active
        if connection is not None:
            # Get a Cursor to do queries
            cursor = connection.cursor()

            # Here the Statement is executed
            cursor.execute(query, values)

            # A commit is required to update the database
            connection.commit()

            # Any results will be returned here
            result = cursor.fetchall()
            logger.debug(f"{str(result)}")

            # Any results will be returned here
            return result

    except Exception as e:
        logger.error(f"{e}")
        connection.rollback()
        if str(e) == 'no results to fetch':
            return []
        return None


# Here the database connection is closed
def close():
    try:
        # Check if Connection is still active
        if connection is not None:
            # Closes the database connection
            connection.close()
            logger.debug('Database connection closed.')

    except Exception as e:
        logger.error('Failed to close connection to postgreSQL database:')
        logger.error(e)


# Start Connection to Database
connect()

# Close the connection to the database when the script exits
atexit.register(close)