import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import GlobalContext from "./GlobalContext";
import initialState from "./initialState";

// while developing, api is run at localhost so you can get
// ip address from expo web debugger which runs at localhost:19002
// you can see the ip right above the barcode on the left
const API_BASE_URL =
  "https://7139-2400-1a00-b030-688-3def-567c-6a04-ef3b.in.ngrok.io";

export default class GlobalStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.storeDataLocally = this.storeDataLocally.bind(this);
    this.retrieveLocalData = this.retrieveLocalData.bind(this);
    this.getCircle = this.getCircle.bind(this);
    this.requestCircle = this.requestCircle.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.notifyCircle = this.notifyCircle.bind(this);
    this.createLocation = this.createLocation.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.retrieveLocalData();
  }

  async storeDataLocally(data) {
    try {
      await AsyncStorage.setItem("loginInfo", JSON.stringify(data));
    } catch (error) {
      console.log("store error", error);
      // Error saving data
    }
  }

  async retrieveLocalData() {
    try {
      const data = await AsyncStorage.getItem("loginInfo");
      if (data !== null) {
        // We have data!!
        const dataObj = JSON.parse(data);
        console.log("retrievelocal data", dataObj);

        if (dataObj !== null) {
          this.setState({
            user: dataObj.user,
            token: dataObj.token,
          });
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log("retrive error", error);
    }
  }

  async login(data) {
    return await axios.post(`${API_BASE_URL}/api/login`, data).then((res) => {
      console.log("res", res.data);
      this.setState({
        user: res.data.user,
        token: res.data.token,
      });

      this.storeDataLocally(res.data);
    });
  }

  async register(data) {
    const preparedData = {
      name: data.fullName,
      email: data.email,
      date_of_birth: new Date(data.dob)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    return await axios
      .post(`${API_BASE_URL}/api/register`, preparedData)
      .then((res) => {
        console.log("res", res.data);
        this.setState({
          user: res.data.user,
          token: res.data.token,
        });

        this.storeDataLocally(res.data);
      });
  }

  async requestCircle(data) {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .post(`${API_BASE_URL}/api/circle/request`, data, config)
      .then((res) => {
        console.log("res", res.data);
      });
  }

  async getCircle() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios.get(`${API_BASE_URL}/api/circle`, config).then((res) => {
      console.log("res", res.data);
      this.setState({
        circle: res.data.data,
      });
    });
  }

  async getNotifications() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .get(`${API_BASE_URL}/api/notifications`, config)
      .then((res) => {
        this.setState({
          notifications: res.data.data,
        });
      });
  }

  async getUser(id) {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .get(`${API_BASE_URL}/api/app-users/${id}`, config)
      .then((res) => {
        let data = {
          user: res.data,
          token: this.state.token,
        };
        this.setState(data);
        this.storeDataLocally(data);
      });
  }

  async updateUser(id, data) {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .put(`${API_BASE_URL}/api/app-users/${id}`, data, config)
      .then((res) => {
        let data = {
          user: res.data,
          token: this.state.token,
        };
        this.setState(data);
        this.storeDataLocally(data);
      });
  }

  async notifyCircle() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .post(`${API_BASE_URL}/api/circle/notify`, {}, config)
      .then((res) => {});
  }

  async getLocations() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .get(`${API_BASE_URL}/api/locations`, config)
      .then((res) => {
        this.setState({
          locations: res.data.data,
        });
      });
  }

  async createLocation(data) {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    };

    return await axios
      .post(`${API_BASE_URL}/api/locations`, data, config)
      .then((res) => {})
      .catch((err) => {});
  }

  resetState = () => {
    this.setState(initialState);
    this.storeDataLocally(null);
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          // properties
          user: this.state.user,
          token: this.state.token,
          circle: this.state.circle,
          notifications: this.state.notifications,
          locations: this.state.locations,
          // functions
          reset: this.resetState,
          register: this.register,
          login: this.login,
          getCircle: this.getCircle,
          requestCircle: this.requestCircle,
          getNotifications: this.getNotifications,
          updateUser: this.updateUser,
          getUser: this.getUser,
          notifyCircle: this.notifyCircle,
          getLocations: this.getLocations,
          createLocation: this.createLocation,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
