import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class HomePage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      books: [],
      isLoading: false,
      isSearch: false,
      query: '',
    };
  }

  componentDidMount () {
    this.setState ({isLoading: true});
    axios
      .get (
        `https://www.googleapis.com/books/v1/volumes?q=quilting&orderBy=newest&key=yourKey`,
        {}
      )
      .then (res => {
        console.log (res);
        if (res.data) {
          this.setState ({books: res.data.items}, () => {
            this.setState ({isLoading: false});
          });
        }
        console.log (res);
      })
      .catch (e => {
        this.setState ({
          isLoading: false,
        });
        console.log (e);
      });
  }

  handleInput = e => {
    this.setState ({
      query: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault ();
    let query = this.state.query;
    if (query) {
      this.setState ({isSearch: true});
      axios
        .get (
          `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&key=`,
          {}
        )
        .then (res => {
          console.log (res);
          if (res.data) {
            this.setState ({books: res.data.items}, () => {
              this.setState ({isSearch: false});
            });
          }
          console.log (res);
        })
        .catch (err => {
          this.setState ({
            isSearch: false,
          });
          console.log (e);
        });
    }
  };

  render () {
    let {books, isLoading, isSearch} = this.state;
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
        <div className="row text-center">
          <div
            className="col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3"
            style={{margin: '0 auto'}}
          >
            <div className="row google-logo" style={{margin: '0 auto'}}>
              <img
                src="http://www.eatlogos.com/education_logos/png/m-letter-with-book-logo-design.png"
                alt="logo"
              />
            </div>

            <div className="row google-form " style={{margin: '0 auto'}}>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter book name..."
                    onChange={this.handleInput}
                  />
                  <div className="btn-group">
                    <button className="btn btn-default" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isSearch
          ? <div>
              <Loader
                type="ThreeDots"
                color="#acacac"
                height={100}
                width={100}
                visible={isLoading} //3 sec
              />
            </div>
          : <div className="row">
              <div className="card-group">
                {books.map ((item, key) => {
                  console.log (item);
                  return (
                    <div className="col-sm-3">
                      <div className="card" key={key}>
                        <img
                          className="card-img-top"
                          src={item.volumeInfo.imageLinks.thumbnail}
                        />
                        <div className="card-body">
                          <p className="card-title">{item.volumeInfo.title}</p>
                          <p className="card-text">
                            Author :
                            {' '}
                            {item.volumeInfo.authors
                              ? item.volumeInfo.authors[0]
                              : ''}
                          </p>
                          <p className="card-text">
                            Catagories :
                            {' '}
                            <small className="text-muted">
                              {' '}
                              {item.volumeInfo.catagories
                                ? item.volumeInfo.catagories[0]
                                : ''}
                            </small>
                          </p>
                        </div>
                        <div className="card-footer">
                          <a
                            href={`/book/${item.id}`}
                            className="btn btn-primary btn-block"
                          >
                            Buy
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>}
      </div>
    );
  }
}

export default HomePage;
