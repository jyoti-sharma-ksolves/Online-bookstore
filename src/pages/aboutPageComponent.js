import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import {Link} from 'react-router-dom';

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class AboutPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      book: {},
      isLoading: false,
    };
  }

  componentDidMount () {
    const {id} = this.props.match.params;
    console.log (id);
    this.setState ({isLoading: true});
    axios
      .get (
        `https://www.googleapis.com/books/v1/volumes/${id}?key=yourKey`,
        {}
      )
      .then (res => {
        if (res.data) {
          this.setState ({book: res.data}, () => {
            this.setState ({isLoading: false});
          });
        }
        console.log (res);
      })
      .catch (e => {
        this.setState ({isLoading: false});
        console.log (e);
      });
  }

  render () {
    let {book, isLoading} = this.state;
    if (isLoading) {
      return (
        <div>
          <Loader
            type="ThreeDots"
            color="#acacac"
            height={100}
            width={100}
            visible={isLoading} //3 sec
          />
        </div>
      );
    }
    return (
      <div className="container">
        <h4 className="">
          <Link to="/">Home</Link>
        </h4>
        {book && book.volumeInfo
          ? <div>
              <div className="container">
                <h1 className="my-4">
                  {book.volumeInfo.title}
                  {' '}
                  <small>{book.volumeInfo.subtitle}</small>
                </h1>
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src={book.volumeInfo.imageLinks.smallThumbnail}
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <h3 className="my-3">Book Description</h3>
                    <p>{book.volumeInfo.description}</p>
                    <h3 className="my-3">Book Details</h3>
                    <ul>
                      <li>Author: {book.volumeInfo.authors} </li>
                      <li>Publisher: {book.volumeInfo.publisher}</li>
                      <li>Published Date: {book.volumeInfo.publishedDate} </li>
                      <li>Catagories: {book.volumeInfo.catagories} </li>
                    </ul>
                    <a href={book.volumeInfo.infoLink} target="_blank">
                      Buy Online
                    </a>
                  </div>
                </div>
              </div>
            </div>
          : null}
      </div>
    );
  }
}

export default AboutPage;
