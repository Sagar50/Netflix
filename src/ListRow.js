import React from 'react'

function ListRow(listM) {
    console.log(listM);
  return (
    
    <div className="listRow">
        <div className="movieContainer">
            <div className="imgContainer">
                <img></img>
            </div>
            <div className="descContainer">
                <h1 className="titleH1"></h1>
                <div className="details"></div>
                <h3 className="descH3"></h3>
                <div className="bttnContainer">
                    <button className="moreInfo_bttn" onClick={() => {console.log("clicked")}}>More Info</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ListRow