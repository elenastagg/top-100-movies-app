import React, { Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const token = TokenManager.getToken();
    axios
      .get(`${process.env.API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { firstName, lastName } = response.data;
        this.setState({
          firstName,
          lastName,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  render() {
    const { firstName, lastName, errorMessage } = this.state;
    return (
      <Fragment>
        <div className="profile">
          <div className="profile-info-container">
            <div className="info-container">
              <div>{`${firstName} ${lastName} `}</div>
              {errorMessage && <div>{errorMessage}</div>}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Profile;
