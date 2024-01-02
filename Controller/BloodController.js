const Blood = require("../Model/BloodRequestModel");
const CatchAsync = require("../Utils/CatchAsync");
const StockModel = require("../Model/StockModel");

exports.createRequest = CatchAsync(async function(request , response) {
    request.body.userId = request._user._id;
    const bloodRequest = await Blood.create(request.body);
    response.status(200).json({
        message : "Your Operation was successful" ,
        data : bloodRequest
    })
});

exports.acceptDonation = CatchAsync(async(request , response , next) => {
    const {requestID} =   request.params;
    const requestDOC = await Blood.findById(requestID);
    if(!requestDOC) return next(new AppError("No request found" , 404));

    const existingStock = await StockModel.findOne();
    const userBloodGroup = request_user.bloodGroup;
    const requiredPint = requestDOC.requiredPint;

    if(!existingStock) {
         await StockModel.create({ [request._user.bloodGroup]: requiredPint });
    } else {
        existingStock[userBloodGroup] = (existingStock[bloodType] || 0) + requiredPint;
        await existingStock.save();
    }

    response.status(200).json({
        message : "Operation was successful"
    })
})

exports.acceptBloodNeedRequest = CatchAsync(async (request, response, next) => {
    const { requestID } = request.params;
    const requestDoc = await Blood.findById(requestID);
  
    if (!requestDoc) {
      return next(new AppError('No request found', 404));
    }
  
    const existingStock = await StockModel.findOne();
    const userBloodGroup = request.user.bloodGroup; 
  
    if (!existingStock) {
      return next(new AppError('Stock not available', 500));
    }
  
    if (existingStock[userBloodGroup] < requestDoc.requiredPint) {
      return next(new AppError('Not enough stock for the request', 400));
    }
  
    existingStock[userBloodGroup] -= requestDoc.requiredPint;
    await existingStock.save();
  
    response.status(200).json({
      message: 'Operation was successful',
    });
});

