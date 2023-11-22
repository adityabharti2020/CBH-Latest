import { Container, Grid, Stack, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import { AssistWalkerOutlined } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import RequestAcceptModal from "./RequestAcceptModal";
import RequestHolderCard from "./RequestHolderCard";
import ResolveRequest from "./ResolveRequest";

const MaintenaceRequests = ({ getUrl, type, title }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState(null);

  const [allRequests, setAllRequests] = useState([]);

  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);

  const [openResolveModal, setOpenResolveModal] = useState(false);

  const [activeRequestData, setActiveRequestData] = useState(null);

  const [adminMsg, setAdminMsg] = useState("");

  const handleChangeFiles = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    const files = Array.from(e.target.files);
    const temp = [];
    files.forEach((element) => {
      temp.push(URL.createObjectURL(element));
    });
    setSelectedFilesUrl([...temp]);
  };

  const handleResolveRequest = async () => {
    dispatch(isLoading(true));

    const data = new FormData();
    selectedFiles.forEach((element) => {
      data.append("adminImages", element);
    });

    data.append("status", "resolved");
    data.append("adminComment", adminMsg);

    try {
      const res = await axios.post(
        `/api/v1/admin/update/MaintainanceRequest/on/resolving/${activeRequestData?._id}`,
        data
      );

      handleCloseResolveModal();
      setSelectedFilesUrl([]);
      dispatch(openSnackbar("resolved", "success"));
      getRequestdData();
      dispatch(isLoading(false));
      console.log("getData===>", res?.data);
    } catch (error) {
      console.log("error");
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };

  // modal toggler
  const toggleScheduleModal = () =>
    setOpenScheduleMeetModal(!openScheduleMeetModal);

  const toggleResolveModal = () => setOpenResolveModal(!openResolveModal);
  // handler to open modal
  const handleOpenModal = (data) => {
    setActiveRequestData(data);
    toggleScheduleModal();
  };

  const handleOpenResolveModal = (data) => {
    setActiveRequestData(data);
    toggleResolveModal();
  };
  // handler to close modal
  const handleCloseModal = () => {
    setActiveRequestData(null);
    toggleScheduleModal();
  };

  const handleCloseResolveModal = () => {
    setActiveRequestData(null);
    toggleResolveModal();
  };
  // function to get request data
  const getRequestdData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(getUrl);
      // console.log("res All maintence==>", res);
      setAllRequests(res?.data?.allRequests);
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(isLoading(false));
    }
  };
  //   ======================================
  useEffect(() => {
    if (getUrl) {
      getRequestdData();
    }
  }, []);

  // ========================================
  return (
    <>
      <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {/* {allRequests?.map((request, index) => {
          return ( */}
        <Grid item xs={12} sm={12} md={12}>
          <RequestHolderCard
            cardData={allRequests}
            // index={index}
            handleOpenModal={handleOpenModal}
            handleOpenResolveModal={handleOpenResolveModal}
          />
        </Grid>
        {/* // ); // })} */}
      </Grid>

      
      <RequestAcceptModal
        open={openScheduleMeetModal}
        handleClose={handleCloseModal}
        data={activeRequestData}
        reloadData={getRequestdData}
      />



      <ResolveRequest
        open={openResolveModal}
        handleClose={handleCloseResolveModal}
        data={activeRequestData}
        reloadData={getRequestdData}
        handleAction={handleResolveRequest}
        selectedFilesUrl={selectedFilesUrl}
        setSelectedFilesUrl={setSelectedFilesUrl}
        handleChange={handleChangeFiles}
        adminMsg={adminMsg}
        setAdminMsg={setAdminMsg}
      />
    </>
  );
};

export default MaintenaceRequests;
