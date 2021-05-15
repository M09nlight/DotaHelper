/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../constants/Login.css";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    let history = useHistory();
    const handleSelect = (match_id) => {
        history.push(`/matches`);
      };
  return (
    <React.Fragment>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
          <div class="col-md-12 mb-3">
                              <p class="text-center">
                                 <a href="/matches" class="google btn mybtn"><i class="fa fa-google-plus">
                                 </i> Signup using Steam <div class="fadeIn first">
      <img src="G:\VSCodeProjects\dotaHelper\client\src\images\steam_icon.png" width="100" height="255" id="icon" alt="Steam Icon" />
    </div>
                                 </a>
                              </p>
                           </div>
                           
          </div>
          <div class="col-md-12 ">
                              <div class="login-or">
                                 <hr class="hr-or"/>
                                 <span class="span-or">or</span>
                              </div>
                           </div>
          <form>
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="login"
              placeholder="login"
            />
            <input
              type="text"
              id="password"
              class="fadeIn third"
              name="login"
              placeholder="password"
            />
            <input type="submit"  value="Log In" onClick={() => handleSelect()} />
          </form>

          <div id="formFooter">
            <a>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
