import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    
    return (
          <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-md-9 col-lg-7 col-xl-5">
                    <div className="card">
                      <div className="card-body p-4">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <img src={currentUser.imageSrc}
                              alt="" className="img-fluid"
                              style={{width: '180px', borderRadius: '10px'}}/>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-1">{currentUser.username}</h5>
                            <p className="mb-2 pb-1">{currentUser.email}</p>
                          <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <div>
                            <p className="small text-muted mb-1">Recipes</p>
                            <p className="mb-0">41</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">976</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Rating</p>
                            <p className="mb-0">8.5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>   
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Profile);