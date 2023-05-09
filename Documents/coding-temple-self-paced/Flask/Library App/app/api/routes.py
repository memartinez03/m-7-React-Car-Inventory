from flask import Blueprint, request, jsonify, render_template
from helpers import token_required
from models import db, User, Book, book_schema, books_schema

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/getdata')
def getdata():
    return {'yee': 'haw'}

#Create Book Endpoint
@api.route('/book', methods = ['POST'])
@token_required
def create_book(current_user_token):
    isbn_number = request.json['isbn_number']
    author_name = request.json['author_name']
    book_title = request.json['book_title']
    book_length = request.json['book_length']
    hardcover_or_paperback = request.json['hardcover_or_paperback']
    user_token = current_user_token.token

    print(f'BIG TESTER: {current_user_token.token}')

    book = Book(isbn_number, author_name, book_title, book_length, hardcover_or_paperback, user_token=user_token)

    db.session.add(book)
    db.session.commit()

    response = book_schema.dump(book)
    return jsonify(response)

#Retrieve Book Endpoint
@api.route('/book', methods = ['GET'])
@token_required
def get_book(current_user_token):
    a_user = current_user_token.token
    books = Book.query.filter_by(user_token = a_user).all()
    response = books_schema.dump(books)
    return jsonify(response)

#Retrieve One Book Endpoint
@api.route('/book/<id>', methods = ['GET'])
@token_required
def get_single_book(current_user_token, id):
        a_user = current_user_token.token
        if a_user == current_user_token.token:
            book = Book.query.get(id)
            response = book_schema.dump(book)
            return jsonify(response)
        else:
            return jsonify({"message": "Valid Token Required"}),401


# Update endpoint
@api.route('/book/<id>', methods = ['POST', 'PUT'])
@token_required
def update_book(current_user_token, id):
    book = Book.query.get(id)
    book.isbn_number = request.json['isbn_number']
    book.author_name = request.json['author_name']
    book.book_title = request.json['book_title']
    book.book_length = request.json['book_length']
    book.hardcover_or_paperback = request.json['hardcover_or_paperback']
    book.user_token = current_user_token.token

    db.session.commit()
    response = book_schema.dump(book)
    return jsonify(response)

# Delete endpoint
@api.route('/book/<id>', methods = ['DELETE'])
@token_required
def delete_book(current_user_token, id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    response = book_schema.dump(book)
    return jsonify(response)