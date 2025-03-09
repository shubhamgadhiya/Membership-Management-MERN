import * as Yup from 'yup';

export const validationSchema = Yup.object({
    memberName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
    .required('Member Name Required'),
  plotShedNo: Yup.string()
  .matches(/^\d+$/, 'Only numbers are allowed')
  .required('PlotShedNo Required'),
roadNo: Yup.string()
  .matches(/^\d+$/, 'Only numbers are allowed')
  .required('RoadNo Required'),
  companyType: Yup.string()
  .required('CompanyType Required'),
  email: Yup.string().email('Invalid email format')
  .required('Email Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits')
  .required('Phone Required'),
  mobile: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits')
  .required('Mobile Required'),
  
  repEmail1: Yup.string().email('Invalid email format'),
  repMobile1: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  repPhone1: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  repName1: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
  repDesignation1: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
  
  repEmail2: Yup.string().email('Invalid email format'),
  repMobile2: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  repPhone2: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  repName2: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
  repDesignation2: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed'),
  
});
