/*import React from 'react';

class Books extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.bookList.items, '33333');
    let defaultBookList = this.props.bookList.items;
    return (
      <div>
          {(defaultBookList == undefined||"" ) ? <div><h1>Loading...</h1></div> :
              <div className="card">{defaultBookList.map(item => {
                return (
                        <div className="d-inline">
                          <div className="card col-sm-2" style={{width: "18 rem", display:""}}>
                            <img className="card-img-top" src={item.volumeInfo.imageLinks.smallThumbnail} alt="Card image cap"/>
                            <div className="card-body">
                              <h5 className="card-title">{item.volumeInfo.title}</h5>
                              <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                              <a href="#" className="btn btn-primary">Buy Online</a>
                            </div>
                          </div>
                        </div>
                )
                })}
              </div>
          }
      </div>
    )
  }

}

export default Books;
*/
