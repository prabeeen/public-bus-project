const axios = require('axios');
const Payment = require('../model/payment');
const authorization_key = 'Key live_secret_key_e153b1ae707149d7bcb5d447a268dd2c';

exports.initiatePayment = (request, response) => {
        const payload = request.body;

        // console.log(payload);
            const options = {
                headers: { Authorization: authorization_key }
            };

            axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, options)
                .then((response2) => {

                    response.status(200).json({
                      payment_url: response2.data.payment_url
                    });
                })
                .catch((error) => {
                  console.log(error)
                  response.status(500).json({
                    message: "Provide proper valid data!"
                    });
                });
    }


exports.lookupPayment = (request, response) => {
        const pidx_val = request.body.pidx;
        const payment = Payment.exists({pidx: pidx_val})
        payment.then(res=>{
          if(res){
            return response.status(500).json({
              message: "Duplicate transaction Occured!"
            })
          }

          const payload = {pidx: pidx_val};

              const options = {
                  headers: { 'Authorization': authorization_key }
              };

              axios.post('https://a.khalti.com/api/v2/epayment/lookup/', payload, options)
                  .then((response3) => {
                      if(response3.data.total_amount > 0 && response3.data.status === 'Completed' ){
                        const paymentData = new Payment({
                          amount: response3.data.total_amount/100,
                          mobile: request.body.mobile,
                          pidx: response3.data.pidx,
                          txnId: response3.data.transaction_id,
                          status: response3.data.status,
                          name: request.body.name,
                          email: request.body.email,
                          phone: request.body.phone,
                          userId: request.body.userId
                        })

                        paymentData.save().then(savedPayment=>{
                          return response.status(200).json({
                            message: "payment verification success!",
                            data: savedPayment
                          })
                        }).catch(err=>{
                          response.status(200).json({
                            message: "Failed!"
                          })
                          console.log(err)
                        })
                      }
                      else{
                        return response.status(500).json({
                          message: "Error in transaction"
                        })
                      }
                  })
                  .catch((error) => {
                    response.status(500).json({
                      message: "Verification Failed"
                    })
                      console.log("Lookup unsuccessful" );
                  });
        })


        }

exports.getPayment = (req, res, next)=>{
  Payment.find({userId: req.appUserData.userId}, {amount: true, mobile: true, txnId: true})
  .then(paymentData =>{
    res.status(200).json({
      message: "Successfully retrieved data",
      paymentData: paymentData
    })
  }).catch(er=>{
    res.status(500).json({
      message: "Failed to retrieve data",
      error: err
    })

  })
  }


exports.paymentInfoAdmin = (req, res, next)=>{
  Payment.find({},{amount: true, mobile: true, txnId: true, userId: true}).then(paymentData =>{
    res.status(200).json({
      message: "Successfully retrieved data",
      paymentData: paymentData
    })
  }).catch(er=>{
    res.status(500).json({
      message: "Failed to retrieve data",
      error: err
    })

  })
}

exports.paymentVerifyDriver = (request, response, next) =>{
  console.log("inside paymentVerifyDriver")
  Payment.find({txnId: request.body.txnId}, {amount: true, mobile: true, name: true, phone: true}).then(data=>{
    if(data.length > 0){
      return response.status(200).json({
        message: "successful",
        verification: true,
        data: data
      })

    }
    return response.status(200).json({
      message: "successful",
      verification: false,

    })

  }).catch(err=>{
    console.log(err)
    response.status(500).json({
      message: err
    })
  })

}
