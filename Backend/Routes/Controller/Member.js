const Users = require("../../Model/Users");
const Members = require("../../Model/Members");
const { mongoose } = require("mongoose");
const fs = require("fs");
const path = require("path");

const dashboard = async (req, res) => {
  try {
    const dashboard = await Users.findOne({
      _id: new mongoose.Types.ObjectId(req.userId),
    });
    return res
      .status(200)
      .json({
        data: dashboard || [],
        message: "Dashboard details fetched.",
        success: true,
        error: false,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        data: error.message,
        message: "Failed to Dashboard details.",
        success: false,
        error: true,
      });
  }
};
const deleteOldImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "..", "..", "uploads", imagePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting image (${imagePath}):`, unlinkErr);
        } else {
          console.log(`Deleted: ${imagePath}`);
        }
      });
    } else {
      console.log(`File does not exist: ${imagePath}`);
    }
  });
};

const create = async (req, res) => {
  try {
    const {
      memberName,
      plotShedNo,
      roadNo,
      companyType,
      email,
      phone,
      mobile,
      repName1,
      repDesignation1,
      repEmail1,
      repMobile1,
      repPhone1,
      repName2,
      repDesignation2,
      repEmail2,
      repMobile2,
      repPhone2,
      website,
      productName,
      coCategory,
      torrentServiceNo,
      gstnNo,
      amcTenementNo,
      udyogAadharNo,
      documentName1,
      documentName2,
      documentName3,
      plotShedSize,
      waterConnection1,
      conSize1,
      shedNos1,
      areaSize1,
      waterConnection2,
      conSize2,
      shedNos2,
      areaSize2,
    } = req.body;

    const user = await Users.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.userId) },
      { $set: { isMember: true } },
      { new: true }
    );

    const existingMember = await Members.findOne({ userID: user?._id });

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
      if (req.body[field] === "delete") {
        const filePath = existingMember?.[field]; 

        if (filePath) {
          deleteOldImage(filePath); 
          existingMember[field] = null; 
        }
      }
    });

    const memberData = {
      memberName,
      plotShedNo,
      roadNo,
      companyType,
      email,
      phone,
      mobile,
      repName1,
      repDesignation1,
      repEmail1,
      repMobile1,
      repPhone1,
      repPhoto1: req.files["repPhoto1"]
        ? req.files["repPhoto1"][0].path.replace(/^uploads\\/, "")
        : existingMember?.repPhoto1 || null,
      repName2,
      repDesignation2,
      repEmail2,
      repMobile2,
      repPhone2,
      repPhoto2: req.files["repPhoto2"]
        ? req.files["repPhoto2"][0].path.replace(/^uploads\\/, "")
        : existingMember?.repPhoto2 || null,

      website,
      productName,
      coCategory,
      torrentServiceNo,
      gstnNo,
      amcTenementNo,
      udyogAadharNo,

      allotmentsLetter: req.files["allotmentsLetter"]
        ? req.files["allotmentsLetter"][0].path.replace(/^uploads\\/, "")
        : existingMember?.allotmentsLetter || null,

      possessionLetter: req.files["possessionLetter"]
        ? req.files["possessionLetter"][0].path.replace(/^uploads\\/, "")
        : existingMember?.possessionLetter || null,

      officeOrder: req.files["officeOrder"]
        ? req.files["officeOrder"][0].path.replace(/^uploads\\/, "")
        : existingMember?.officeOrder || null,

      transferOrder: req.files["transferOrder"]
        ? req.files["transferOrder"][0].path.replace(/^uploads\\/, "")
        : existingMember?.transferOrder || null,

      document1: req.files["document1"]
        ? req.files["document1"][0].path.replace(/^uploads\\/, "")
        : existingMember?.document1 || null,

      document2: req.files["document2"]
        ? req.files["document2"][0].path.replace(/^uploads\\/, "")
        : existingMember?.document2 || null,

      document3: req.files["document3"]
        ? req.files["document3"][0].path.replace(/^uploads\\/, "")
        : existingMember?.document3 || null,

      plotShedSize,
      waterConnection1,
      conSize1,
      shedNos1,
      areaSize1,
      waterConnection2,
      conSize2,
      shedNos2,
      areaSize2,
      documentName1,
      documentName2,
      documentName3,
      userID: user?._id,
    };

    if (existingMember) {
      await Members.findOneAndUpdate(
        { userID: user?._id },
        { $set: memberData },
        { new: true }
      );
      res.status(200).json({
        message: "Member details updated successfully",
        data: memberData,
        user: user,
        success: true,
        error: false,
      });
    } else {
      const newMember = new Members(memberData);
      await newMember.save();

      res.status(201).json({
        message: "Member created successfully",
        data: newMember,
        user: user || [],
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({
      data: error.message,
      message: "Failed to save member details.",
      success: false,
      error: true,
    });
  }
};

const memberView = async (req, res) => {
  try {
    const member = await Members.findOne({
      userID: new mongoose.Types.ObjectId(req.userId),
    }).populate("userID");
    console.log("member", member);
    res
      .status(201)
      .json({
        message: "Member find successfully",
        data: member || [],
        success: true,
        error: false,
      });
  } catch (error) {
    console.error("Error saving member:", error);

    return res
      .status(500)
      .json({
        data: error.message,
        message: "Failed to Dashboard details.",
        success: false,
        error: true,
      });
  }
};
module.exports = { dashboard, create, memberView };
