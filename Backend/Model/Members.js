const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberName: { type: String, required: true },
  plotShedNo: { type: Number, required: true },
  roadNo: { type: Number, required: true },
  companyType: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  mobile: { type: Number },

  repName1: { type: String },
  repDesignation1: { type: String },
  repEmail1: { type: String },
  repMobile1: { type: Number },
  repPhone1: { type: Number },
  repPhoto1: { type: String },

  repName2: { type: String },
  repDesignation2: { type: String },
  repEmail2: { type: String },
  repMobile2: { type: Number },
  repPhone2: { type: Number },
  repPhoto2: { type: String },

  website: { type: String },
  productName: { type: String },
  coCategory: { type: String },
  torrentServiceNo: { type: Number },
  gstnNo: { type: Number },
  amcTenementNo: { type: Number },
  udyogAadharNo: { type: Number },

    allotmentsLetter: { type: String },
    possessionLetter: { type: String },
    officeOrder: { type: String },
    transferOrder: { type: String },

    document1: { type: String },
    document2: { type: String },
    document3: { type: String }, 
    documentName1: { type: String }, 
    documentName2: { type: String }, 
    documentName3: { type: String }, 
    plotShedSize: { type: Number },
    waterConnection1: { type: Number },
    conSize1: { type: Number },
    shedNos1: { type: Number },
    areaSize1: { type: Number },
    waterConnection2: { type: Number },
    conSize2: { type: Number },
    shedNos2: { type: Number },
    areaSize2: { type: Number },
   
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
}, { timestamps: true });

module.exports = mongoose.model('member', memberSchema);
