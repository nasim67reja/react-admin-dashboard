import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../App";

const Single = () => {
  const [user, setUser] = useState();
  const params = useParams();

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/${params.userId}`);
      setUser(data.data.data);
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [params.userId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  console.log(user);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {user && (
              <div className="item">
                <img
                  crossOrigin="anonymous"
                  src={`${URL}/img/users/${user.photo}`}
                  alt="userphoto"
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{user.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Role:</span>
                    <span className="itemValue">{user.role}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">
                      {`${user.active ? "Active" : "Deactive"}`}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">USA</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;