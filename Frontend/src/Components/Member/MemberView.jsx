import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validationSchema } from "./config";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DashboardUser, Member, MemberUser } from "../../Redux/Reducer/DashboardReducer";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { baseUrlImg } from "../../ApiCheck/Constant";
import Loader from "../../ApiCheck/Loader";

const MemberView = () => {
    const {loading, member } = useSelector((state) => state.Dashboard);
    console.log("loading", loading)
  const [formData, setFormData] = useState({
    memberName: "",
    plotShedNo: "",
    roadNo: "",
    companyType: "",
    email: "",
    phone: "",
    mobile: "",
    repName1: "",
    repDesignation1: "",
    repEmail1: "",
    repMobile1: "",
    repPhone1: "",
    repPhoto1: null,
    repName2: "",
    repDesignation2: "",
    repEmail2: "",
    repMobile2: "",
    repPhone2: "",
    repPhoto2: null,
    website: "",
    productName: "",
    coCategory: "",
    torrentServiceNo: "",
    gstnNo: "",
    amcTenementNo: "",
    udyogAadharNo: "",
    allotmentsLetter: null,
    possessionLetter: null,
    officeOrder: null,
    transferOrder: null,
  });

 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      memberName: "",
      plotShedNo: "",
      roadNo: "",
      companyType: "",
      email: "",
      phone: "",
      mobile: "",
      repName1: "",
      repDesignation1: "",
      repEmail1: "",
      repMobile1: "",
      repPhone1: "",
      repPhoto1: null,
      repName2: "",
      repDesignation2: "",
      repEmail2: "",
      repMobile2: "",
      repPhone2: "",
      repPhoto2: null,
      website: "",
      productName: "",
      coCategory: "",
      torrentServiceNo: "",
      gstnNo: "",
      amcTenementNo: "",
      udyogAadharNo: "",
      allotmentsLetter: null,
      possessionLetter: null,
      officeOrder: null,
      transferOrder: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data:", values);
      console.log("Form 1:", formData);
      const formData1 = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value !== "object") {
          formData1.append(key, value);
        }
      });

      // Append file fields
      const fileFields = [
        "repPhoto1",
        "repPhoto2",
        "allotmentsLetter",
        "possessionLetter",
        "officeOrder",
        "transferOrder",
        "document1",
        "document2",
        "document3",
      ];

      fileFields.forEach((field) => {
        if (values[field] && values[field] instanceof File) {
          formData1.append(field, values[field]);
        }
      });

      console.log("Final FormData Entries:");
      for (let pair of formData1.entries()) {
        console.log(pair[0], pair[1]);
      }
      dispatch(MemberUser(formData1, navigate));
    },
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log("name, value, type, files", name, value, type, files);
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };
    useEffect(() => {
          dispatch(Member());
    }, []);
    useEffect(() => {
      if(member) setFormData(member);
      if(member && member.length == 0) {
          navigate("/dashboard");
      }
  }, [member]);
  
console.log("form", formData)

  if(loading ) return <Loader/>

  return (
    <div className="member">
      <h2 className="text-center mb-4 member-heading">Registration Form</h2>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="border p-3 mb-4">
            <h3 className="fw-bold">Member Details</h3>

            <div className="row mt-4">
              <div className="col-md-4">
                <label className="pb-2">
                  <span className="text-danger">*</span> Member/Co Name
                </label>
                <input
                  type="text"
                  name="memberName"
                  value={formData?.memberName}
                  disabled
                  className="form-control "
                />
                {formik.touched.memberName && formik.errors.memberName && (
                  <div className="text-danger">{formik.errors.memberName}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="pb-2">
                  <span className="text-danger">*</span> Plot/Shed No.
                </label>
                <input
                  type="number"
                  value={formData?.plotShedNo}
                  disabled
                  name="plotShedNo"
                  className="form-control"
                />
                
              </div>

              <div className="col-md-4">
                <label className="pb-2">
                  <span className="text-danger">*</span> Road No.
                </label>
                <input
                  type="number"
                  name="roadNo"
                  className="form-control"
                  value={formData?.roadNo}
                  disabled
                />
               
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <div className="d-flex">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Company Type:{" "}
                  </label>
                  <div className="ms-2  d-flex gap-3">
                    {[
                      "Proprietor",
                      "Partnership",
                      "Pvt. Ltd.",
                      "Ltd.",
                      "Other",
                    ].map((type) => (
                      <div key={type}>
                        <input
                          type="radio"
                          name="companyType"
                          value={type}
                        disabled
                          checked={formData.companyType === type}
                        />{" "}
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
               
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData?.email}
                    disabled
                  />
                 
                </div>
                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    value={formData?.phone}
                  disabled
                  />
                 
                </div>

                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    value={formData?.mobile}
                  disabled
                  />
                 
                </div>
              </div>
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="fw-bold">Representative Details - 1</h3>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Name</label>
                <input
                  type="text"
                  name="repName1"
                  className="form-control"
                  value={formData?.repName1}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Designation</label>
                <input
                  type="text"
                  name="repDesignation1"
                  className="form-control"
                  value={formData?.repDesignation1}
                  disabled
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Email ID</label>
                <input
                  type="email"
                  name="repEmail1"
                  className="form-control"
                  value={formData?.repEmail1}
                  disabled
                />
               
              </div>
              <div className="col-md-3">
                <label className="pb-2">Mobile</label>
                <input
                  type="number"
                  name="repMobile1"
                  className="form-control"
                  value={formData?.repMobile1}
                  disabled
                />
               
              </div>
              <div className="col-md-3">
                <label className="pb-2">Phone</label>
                <input
                  type="number"
                  name="repPhone1"
                  className="form-control"
                  value={formData?.repPhone1}
                  disabled
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center">
                <label className="me-3">Representative Photo:</label>

                <label
                  className="btn btn-white member-btn"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  <FaUpload /> Click to Upload
                  <input
                    type="file"
                    disabled
                    accept="image/*"
                    name="repPhoto1"
                    className="d-none"
                  />
                </label>
              </div>

              {formData.repPhoto1 && (
                <div className="col-12 mt-2 d-flex align-items-center w-auto member-border">
                  <img
                    className="member-imagePreview"
                    src={`${baseUrlImg}/${formData.repPhoto1}`}
                    alt="repPhoto1"
                  />
                  <span className="text-primary">{formData.repPhoto1} </span>
                  <button
                    className="btn btn-link text-danger ms-2"
                   disabled
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="fw-bold">Representative Details - 2</h3>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Name</label>
                <input
                  type="text"
                  name="repName2"
                  className="form-control"
                  value={formData?.repName2}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Designation</label>
                <input
                  type="text"
                  name="repDesignation2"
                  className="form-control"
                 value={formData?.repDesignation2}
                  disabled
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Email ID</label>
                <input
                  type="email"
                  name="repEmail2"
                  className="form-control"
                 value={formData?.repEmail2}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <label className="pb-2">Mobile</label>
                <input
                  type="number"
                  name="repMobile2"
                  className="form-control"
                 value={formData?.repMobile2}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <label className="pb-2">Phone</label>
                <input
                  type="number"
                  name="repPhone2"
                  className="form-control"
                 value={formData?.repPhone2}
                  disabled
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center">
                <label className="me-3">Representative Photo:</label>

                <label
                  className="btn btn-white member-btn"
                  style={{ cursor: "not-allowed" }}
                >
                  <FaUpload /> Click to Upload
                  <input
                    type="file"
                    accept="image/*"
                    name="repPhoto2"
                    className="d-none"
                    disabled
                  />
                </label>
              </div>

              {formData.repPhoto2 && (
                <div className="col-12 mt-2 d-flex align-items-center w-auto member-border">
                  <img
                    className="member-imagePreview"
                    src={`${baseUrlImg}/${formData.repPhoto2}`}
                    alt="repPhoto2"
                  />
                  <span className="text-primary">{formData.repPhoto2} </span>
                  <button
                    className="btn btn-link text-danger ms-2"
                    disabled
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="fw-bold">Other Details</h3>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  value={formData?.website}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                  value={formData?.productName}
                  disabled
                />
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label className="pb-2">Co. Category</label>
                  <input
                    type="text"
                    name="coCategory"
                    className="form-control"
                    value={formData?.coCategory}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="pb-2">Torrent Service No.</label>
                  <input
                    type="number"
                    name="torrentServiceNo"
                    className="form-control"
                    value={formData?.coCategory}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <label className="pb-2">GSTN No</label>
                  <input
                    type="number"
                    name="gstnNo"
                    className="form-control"
                    value={formData?.gstnNo}
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label className="pb-2">AMC Tenement No</label>
                  <input
                    type="number"
                    name="amcTenementNo"
                    className="form-control"
                    value={formData?.amcTenementNo}
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label className="pb-2">Udyog Aadhar No</label>
                  <input
                    type="number"
                    name="udyogAadharNo"
                    className="form-control"
                    value={formData?.udyogAadharNo}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="fw-bold">Attachments</h3>
            <div className="row mt-4">
              {/* Allotments Letter */}
              <div className="col-md-6 d-flex align-items-center">
                <label className="me-3">Allotments Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    disabled
                       style={{ cursor: "not-allowed" }}
                  >
                    Click to Upload
                    <input
                      type="file"
                      name="allotmentsLetter"
                      accept="application/pdf"
                      disabled
                      className="d-none"
                    />
                  </label>
                  <div className="mt-2">
                    {formData.allotmentsLetter || "No file chosen"}
                  </div>
                </div>
              </div>

              {/* Possession Letter */}
              <div className="col-md-6 d-flex align-items-center">
                <label className="me-3">Possession Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    style={{ cursor: "not-allowed" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="possessionLetter"
                      accept="application/pdf"
                      className="d-none"
                      disabled
                    />
                  </label>
                  <div className="mt-2">
                    {formData.possessionLetter || "No file chosen"}
                  </div>
                </div>
              </div>

              {/* Office Order */}
              <div className="col-md-6 d-flex align-items-center mt-3">
                <label className="me-3">Office Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    disabled
                    style={{ cursor: "not-allowed" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="officeOrder"
                      accept="application/pdf"
                      className="d-none"
                     disabled
                    />
                  </label>
                  <div className="mt-2">
                  {formData.officeOrder || "No file chosen"}
                  </div>
                </div>
              </div>

              {/* Transfer Order */}
              <div className="col-md-6 d-flex align-items-center mt-3">
                <label className="me-3">Transfer Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    disabled
                    style={{ cursor: "not-allowed" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="transferOrder"
                      accept="application/pdf"
                      className="d-none"
                      disabled
                    />
                  </label>
                  <div className="mt-2">
                    {formData.transferOrder || "No file chosen"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="fw-bold">Other Details</h3>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">1. Document Name</label>
                <input
                  type="text"
                  name="documentName1"
                  className="form-control"
                  value={formData?.documentName1}
                  disabled
                />
              </div>
              <div className="col-md-6  align-items-center gap-2">
                <label className="pb-2">Upload Document:</label>
                <label
                  className="btn btn-white member-btn ms-2"
                  disabled
                       style={{ cursor: "not-allowed" }}
                >
                  Click to Upload
                  <input
                    type="file"
                    name="document1"
                    className="d-none"
                   disabled
                  />
                </label>
                <div className="mt-2">
                  {formData.document1 || "No file chosen"}
                </div>
              </div>
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">2. Document Name</label>
                <input
                  type="text"
                  name="documentName2"
                  className="form-control"
                  value={formData?.documentName2}
                  disabled
                />
              </div>
              <div className="col-md-6  align-items-center gap-2">
                <label className="pb-2">Upload Document:</label>
                <label
                  className="btn btn-white member-btn ms-2"
                  disabled
                       style={{ cursor: "not-allowed" }}
                >
                  Click to Upload
                  <input
                    type="file"
                    name="document2"
                    className="d-none"
                    disabled
                  />
                </label>
                <div className="mt-2">
                  {formData.document2 || "No file chosen"}
                </div>
              </div>
              </div>
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">3. Document Name</label>
                <input
                  type="text"
                  name="documentName3"
                  className="form-control"
                  value={formData?.documentName3}
                  disabled
                />
              </div>
              <div className="col-md-6  align-items-center gap-2">
                <label className="pb-2">Upload Document:</label>
                <label
                  className="btn btn-white member-btn ms-2"
                  disabled
                  style={{ cursor: "not-allowed" }}
                >
                  Click to Upload
                  <input
                    type="file"
                    name="document3"
                    className="d-none"
                   disabled
                  />
                </label>
                <div className="mt-2">
                  {formData.document3 || "No file chosen"}
                </div>
              </div>
              </div>
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Plot / Shed Size</label>
                <input
                  type="number"
                  name="plotShedSize"
                  className="form-control"
                  value={formData?.plotShedSize}
                  disabled
                />
              </div>
              </div>
              
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Water Connection No</label>
                <input
                  type="number"
                  name="waterConnection1"
                  className="form-control"
                  value={formData?.waterConnection1}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Con. Size (MM)</label>
                <input
                  type="number"
                  name="conSize1"
                  className="form-control"
                  value={formData?.conSize1}
                  disabled
                />
              </div>
              </div>
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Shed Nos</label>
                <input
                  type="number"
                  name="shedNos1"
                  className="form-control"
                  value={formData?.shedNos1}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="pb-2">Area Size (Sq. Mtrs.)</label>
                <input
                  type="number"
                  name="areaSize1"
                  className="form-control"
                  value={formData?.areaSize1}
                  disabled
                />
              </div>
              </div>
              <hr />
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Water Connection No</label>
                <input
                  type="number"
                  name="waterConnection2"
                  className="form-control"
                  value={formData?.waterConnection2}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Con. Size (MM)</label>
                <input
                  type="number"
                  name="conSize2"
                  className="form-control"
                  value={formData?.conSize2}
                  disabled
                />
              </div>
              </div>
              <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Shed Nos</label>
                <input
                  type="number"
                  name="shedNos2"
                  className="form-control"
                  value={formData?.shedNos2}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Area Size (Sq. Mtrs.)</label>
                <input
                  type="number"
                  name="areaSize2"
                  className="form-control"
                  value={formData?.areaSize2}
                  disabled
                />
              </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to={"/dashboard"}>
            <button className="btn member-button mb-4 member-borderradius">
              Home
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberView;
