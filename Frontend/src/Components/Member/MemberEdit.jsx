import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validationSchema } from "./config";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Member, MemberUser } from "../../Redux/Reducer/DashboardReducer";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { baseUrlImg } from "../../ApiCheck/Constant";
import Loader from "../../ApiCheck/Loader";

const MemberEdit = () => {
  const { member, loading } = useSelector((state) => state.Dashboard);
  console.log("member", member);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    documentName1: "",
    document1: null,
    documentName2: "",
    document2: null,
    documentName3: "",
    document3: null,
    plotShedSize: "",
    waterConnection1: "",
    conSize1: "",
    shedNos1: "",
    areaSize1: "",
    waterConnection2: "",
    conSize2: "",
    shedNos2: "",
    areaSize2: "",
    documentName1: "",
    documentName2: "",
    documentName3: "",
  });

  const [imagePreview, setImagePreview] = useState({
    preview1: null,
    name1: "",
    preview2: null,
    name2: "",
    allotmentsLetter: "",
    possessionLetter: "",
    officeOrder: "",
    transferOrder: "",
    document1: "",
    document2: "",
    document3: "",
 
  });
  useEffect(() => {
    dispatch(Member());
  }, []);
  useEffect(() => {
    if (member) {
      setFormData(member);
      formik.setValues(member);
    }
    if (member && member.length == 0) {
      navigate("/dashboard");
    }
  }, [member]);
  console.log("formdata", formData);

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
      documentName1: "",
      document1: null,
      documentName2: "",
      document2: null,
      documentName3: "",
      document3: null,
      plotShedSize: "",
      waterConnection1: "",
      conSize1: "",
      shedNos1: "",
      areaSize1: "",
      waterConnection2: "",
      conSize2: "",
      shedNos2: "",
      areaSize2: "",
    },

    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form data:", values);
      const formData1 = new FormData();
      Object.entries(formik.values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {         
            if (value instanceof File) {
              formData1.append(key, value);
            } else {             
              formData1.append(key, value);
            }
          }
      });

   
      dispatch(MemberUser(formData1, navigate));
    },
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      formik.setFieldValue(name, files[0]);
    } else {
      formik.handleChange(e);
      console.log( formik)
    }
  };

   if(loading) return <Loader/>

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
                  className="form-control"
                  onChange={handleChange}
                  value={formik.values.memberName || ""}
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
                  min={0}
                  name="plotShedNo"
                  className="form-control"
                  value={formik.values.plotShedNo || ""}
                   onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (["-", "e", "E", "+"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {formik.touched.plotShedNo && formik.errors.plotShedNo && (
                  <div className="text-danger">{formik.errors.plotShedNo}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="pb-2">
                  <span className="text-danger">*</span> Road No.
                </label>
                <input
                  type="number"
                  name="roadNo"
                  className="form-control"
                  value={formik.values.roadNo || ""}
                   onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={0}
                  onKeyDown={(e) => {
                    if (["-", "e", "E", "+"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {formik.touched.roadNo && formik.errors.roadNo && (
                  <div className="text-danger">{formik.errors.roadNo}</div>
                )}
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
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik?.values?.companyType === type}
                        />{" "}
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
                {formik.touched.companyType && formik.errors.companyType && (
                  <div className="text-danger">{formik.errors.companyType}</div>
                )}
              </div>

              <div className="row mt-4">
                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email || ""}
                    className="form-control"
                    onChange={handleChange}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formik.values.phone || ""}
                    className="form-control"
                    onChange={handleChange}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="pb-2">
                    <span className="text-danger">*</span> Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={formik.values.mobile || ""}
                    className="form-control"
                    onChange={handleChange}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="text-danger">{formik.errors.mobile}</div>
                  )}
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
                  onChange={handleChange}
                  value={formik.values.repName1 || ""}
                />
                 {formik.touched.repName1 && formik.errors.repName1 && (
                  <div className="text-danger">{formik.errors.repName1}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="pb-2">Designation</label>
                <input
                  type="text"
                  name="repDesignation1"
                  className="form-control"
                  onChange={handleChange}
                  value={formik.values.repDesignation1 || ""}
                />
                 {formik.touched.repDesignation1 && formik.errors.repDesignation1 && (
                  <div className="text-danger">{formik.errors.repDesignation1}</div>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Email ID</label>
                <input
                  type="email"
                  name="repEmail1"
                  className="form-control"
                  onChange={handleChange}
                  value={formik.values.repEmail1 || ""}
                />
                {formik.touched.repEmail1 && formik.errors.repEmail1 && (
                  <div className="text-danger">{formik.errors.repEmail1}</div>
                )}
              </div>
              <div className="col-md-3">
                <label className="pb-2">Mobile</label>
                <input
                  type="number"
                  name="repMobile1"
                  className="form-control"
                  onChange={handleChange}
                  value={formik.values.repMobile1 || ""}
                />
                {formik.touched.repMobile1 && formik.errors.repMobile1 && (
                  <div className="text-danger">{formik.errors.repMobile1}</div>
                )}
              </div>
              <div className="col-md-3">
                <label className="pb-2">Phone</label>
                <input
                  type="number"
                  name="repPhone1"
                  className="form-control"
                  value={formik.values.repPhone1 || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center">
                <label className="me-3">Representative Photo:</label>

                <label
                  className="btn btn-white member-btn"
                  style={{ cursor: "pointer" }}
                >
                  <FaUpload /> Click to Upload
                  <input
                    type="file"
                    accept="image/*"
                    name="repPhoto1"
                    className="d-none"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      formik.setFieldValue("repPhoto1", file);
                      if (file) {
                        setImagePreview((prev) => ({
                          ...prev,
                          preview1: URL.createObjectURL(file),
                          name1: file.name,
                        }));
                      }
                    }}
                  />
                </label>
              </div>
              {(imagePreview.preview1 || formData?.repPhoto1) && (
                <div className="col-12 mt-2 d-flex align-items-center w-auto member-border">
                  <img
                    className="member-imagePreview"
                    src={
                      imagePreview.preview1 ||
                      `${baseUrlImg}/${formData.repPhoto1}`
                    }
                    alt="repPhoto1"
                  />
                  <span className="text-primary">
                    {imagePreview.name1 || formData.repPhoto1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview((prev) => ({
                        ...prev,
                        preview1: null,
                        name1: "",
                      }));
                      setFormData((prev) => ({
                        ...prev,
                        repPhoto1: null,
                      }));
                      formik.setFieldValue("repPhoto1","delete");
                    }}
                    className="btn btn-link text-danger ms-2"
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
                  value={formik.values.repName2 || ""}
                  className="form-control"
                  onChange={handleChange}
                />
                 {formik.touched.repName2 && formik.errors.repName2 && (
                  <div className="text-danger">{formik.errors.repName2}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="pb-2">Designation</label>
                <input
                  type="text"
                  name="repDesignation2"
                  value={formik.values.repDesignation2 || ""}
                  className="form-control"
                  onChange={handleChange}
                />
                 {formik.touched.repDesignation2 && formik.errors.repDesignation2 && (
                  <div className="text-danger">{formik.errors.repDesignation2}</div>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="pb-2">Email ID</label>
                <input
                  type="email"
                  name="repEmail2"
                  value={formik.values.repEmail2 || ""}
                  className="form-control"
                  onChange={handleChange}
                />
                 { formik.errors.repEmail2 && (
                  <div className="text-danger">{formik.errors.repEmail2}</div>
                )}
              </div>
              <div className="col-md-3">
                <label className="pb-2">Mobile</label>
                <input
                  type="number"
                  name="repMobile2"
                  value={formik.values.repMobile2 || ""}
                  className="form-control"
                  onChange={handleChange}
                />
                 {formik.touched.repMobile2 && formik.errors.repMobile2 && (
                  <div className="text-danger">{formik.errors.repMobile2}</div>
                )}
              </div>
              <div className="col-md-3">
                <label className="pb-2">Phone</label>
                <input
                  type="number"
                  name="repPhone2"
                  value={formik.values.repPhone2 || ""}
                  className="form-control"
                  onChange={handleChange}
                />
                 {formik.errors.repPhone2 && (
                  <div className="text-danger">{formik.errors.repPhone2}</div>
                )}
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center">
                <label className="me-3">Representative Photo:</label>

                <label
                  className="btn btn-white member-btn"
                  style={{ cursor: "pointer" }}
                >
                  <FaUpload /> Click to Upload
                  <input
                    type="file"
                    accept="image/*"
                    name="repPhoto2"
                    className="d-none"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      formik.setFieldValue("repPhoto2", file);
                      if (file) {
                        setImagePreview((prev) => ({
                          ...prev,
                          preview2: URL.createObjectURL(file),
                          name2: file.name,
                        }));
                        formik.setFieldValue("repPhoto2", file);
                      }
                    }}
                  />
                </label>
              </div>

              {(imagePreview.preview2 || formData?.repPhoto2) && (
                <div className="col-12 mt-2 d-flex align-items-center w-auto member-border">
                  <img
                    className="member-imagePreview"
                    src={
                      imagePreview.preview2 ||
                      `${baseUrlImg}/${formData.repPhoto2}`
                    }
                    alt="repPhoto1"
                  />
                  <span className="text-primary">
                    {imagePreview.name2 || formData.repPhoto2}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview((prev) => ({
                        ...prev,
                        preview2: null,
                        name2: "",
                      }));
                      setFormData((prev) => ({
                        ...prev,
                        repPhoto2: null,
                      }));
                      formik.setFieldValue("repPhoto2", "delete");
                    }}
                    className="btn btn-link text-danger ms-2"
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
                  onChange={handleChange}
                  value={formik.values.website || ""}
                />
              </div>
              <div className="col-md-6">
                <label className="pb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                  onChange={handleChange}
                  value={formik.values.productName || ""}
                />
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label className="pb-2">Co. Category</label>
                  <input
                    type="text"
                    name="coCategory"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.coCategory || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="pb-2">Torrent Service No.</label>
                  <input
                    type="number"
                    name="torrentServiceNo"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.torrentServiceNo || ""}
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
                    onChange={handleChange}
                    value={formik.values.gstnNo || ""}
                  />
                </div>
                <div className="col-md-4">
                  <label className="pb-2">AMC Tenement No</label>
                  <input
                    type="number"
                    name="amcTenementNo"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.amcTenementNo || ""}
                  />
                </div>
                <div className="col-md-4">
                  <label className="pb-2">Udyog Aadhar No</label>
                  <input
                    type="number"
                    name="udyogAadharNo"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.udyogAadharNo || ""}
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
                    style={{ cursor: "pointer" }}
                  >
                    Click to Upload
                    <input
                      type="file"
                      name="allotmentsLetter"
                      accept="application/pdf"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("allotmentsLetter", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            allotmentsLetter: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    {formData.allotmentsLetter ||
                      imagePreview.allotmentsLetter ||
                      "No file chosen"}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          allotmentsLetter: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          allotmentsLetter: null,
                        }));
                        formik.setFieldValue("allotmentsLetter", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>

              {/* Possession Letter */}
              <div className="col-md-6 d-flex align-items-center">
                <label className="me-3">Possession Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="possessionLetter"
                      accept="application/pdf"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("possessionLetter", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            possessionLetter: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    {formData.possessionLetter ||
                      imagePreview.possessionLetter ||
                      "No file chosen"}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          possessionLetter: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          possessionLetter: null,
                        }));
                        formik.setFieldValue("possessionLetter", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>

              {/* Office Order */}
              <div className="col-md-6 d-flex align-items-center mt-3">
                <label className="me-3">Office Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="officeOrder"
                      accept="application/pdf"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("officeOrder", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            officeOrder: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    {formData.officeOrder ||
                      imagePreview.officeOrder ||
                      "No file chosen"}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          officeOrder: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          officeOrder: null,
                        }));
                        formik.setFieldValue("officeOrder", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>

              {/* Transfer Order */}
              <div className="col-md-6 d-flex align-items-center mt-3">
                <label className="me-3">Transfer Letter</label>
                <div>
                  <label
                    className="btn btn-white member-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="transferOrder"
                      accept="application/pdf"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("transferOrder", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            transferOrder: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    {formData.transferOrder ||
                      imagePreview.transferOrder ||
                      "No file chosen"}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          transferOrder: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          transferOrder: null,
                        }));
                        formik.setFieldValue("transferOrder", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
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
                  onChange={handleChange}
                  value={formik.values.documentName1 || ""}
                />
              </div>
              <div className="col-md-6  align-items-center gap-2">
                <label className="pb-2">Upload Document:</label>
                <label
                  className="btn btn-white member-btn ms-2"
                  style={{ cursor: "pointer" }}
                >
                  Click to Upload
                  <input
                    type="file"
                    name="document1"
                    className="d-none"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      formik.setFieldValue("document1", file);
                      if (file) {
                        setImagePreview((prev) => ({
                          ...prev,
                          document1: file.name,
                        }));
                      }
                    }}
                  />
                </label>
                <div className="mt-2">
                  {imagePreview.document1 ||
                    formData.document1 ||
                    "No file chosen"}
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview((prev) => ({
                        ...prev,
                        document1: null,
                      }));
                      setFormData((prev) => ({
                        ...prev,
                        document1: null,
                      }));
                      formik.setFieldValue("document1", "delete");
                    }}
                    className="btn btn-link text-danger ms-2"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label className="pb-2">2. Document Name</label>
                  <input
                    type="text"
                    name="documentName2"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.documentName2 || ""}
                  />
                </div>
                <div className="col-md-6  align-items-center gap-2">
                  <label className="pb-2">Upload Document:</label>
                  <label
                    className="btn btn-white member-btn ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    Click to Upload
                    <input
                      type="file"
                      name="document2"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("document2", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            document2: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    
                    {imagePreview.document2 ||
                      formData.document2 ||
                      "No file chosen"}
                      <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          document2: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          document2: null,
                        }));
                        formik.setFieldValue("document2", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
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
                    onChange={handleChange}
                    value={formik.values.documentName3 || ""}
                  />
                </div>
                <div className="col-md-6  align-items-center gap-2">
                  <label className="pb-2">Upload Document:</label>
                  <label
                    className="btn btn-white member-btn ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    Click to Upload
                    <input
                      type="file"
                      name="document3"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        formik.setFieldValue("document3", file);
                        if (file) {
                          setImagePreview((prev) => ({
                            ...prev,
                            document3: file.name,
                          }));
                        }
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    {imagePreview.document3 ||
                      formData.document3 ||
                      "No file chosen"}
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview((prev) => ({
                          ...prev,
                          document3: null,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          document3: null,
                        }));
                        formik.setFieldValue("document3", "delete");
                      }}
                      className="btn btn-link text-danger ms-2"
                    >
                      <MdDelete />
                    </button>
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
                    onChange={handleChange}
                    value={formik.values.plotShedSize || ""}
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
                    onChange={handleChange}
                    value={formik.values.waterConnection1 || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="pb-2">Con. Size (MM)</label>
                  <input
                    type="number"
                    name="conSize1"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.conSize1 || ""}
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
                    onChange={handleChange}
                    value={formik.values.shedNos1 || ""}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="pb-2">Area Size (Sq. Mtrs.)</label>
                  <input
                    type="number"
                    name="areaSize1"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.areaSize1 || ""}
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
                    onChange={handleChange}
                    value={formik.values.waterConnection2 || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="pb-2">Con. Size (MM)</label>
                  <input
                    type="number"
                    name="conSize2"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.conSize2 || ""}
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
                    onChange={handleChange}
                    value={formik.values.shedNos2 || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="pb-2">Area Size (Sq. Mtrs.)</label>
                  <input
                    type="number"
                    name="areaSize2"
                    className="form-control"
                    onChange={handleChange}
                    value={formik.values.areaSize2 || ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn member-button mb-4 member-borderradius"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberEdit;
