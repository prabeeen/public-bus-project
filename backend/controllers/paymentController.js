const express = require("express");

const axios = require('axios');

module.exports = {

    initiatePayment: async (request, response) => {
        const payload = request.body;

        console.log(payload);

        try {
            // add headers
            const options = {
                headers: { 'Authorization': 'Key live_secret_key_e153b1ae707149d7bcb5d447a268dd2c' }
            };

            //send request to https://a.khalti.com/api/v2/epayment/initiate/
            axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, options)
                .then((response2) => {
                    //receive response
                    //console.log(response);
                    console.log(JSON.stringify(response2.data));
                    console.log(JSON.stringify(response2.data.pidx));
                    console.log(JSON.stringify(response2.data.payment_url));

                    //response.status(200).json({ status: 'Success' });

                    // Redirecting to payment_url

                    response.redirect(response2.data.payment_url);
                    //response.status(200).send();
                })
                .catch((error) => {
                    console.log(error)
                });

        } catch (error) {
            response.status(500).send(error);
        }
    },

    lookupPayment: async (request, response) => {
        //const payload = request.query.pidx;

        // console.log(request.query);
        // console.log(request.query.pidx);

        const pidx = request.query.pidx;



        //const payload = JSON.stringify({ "pidx": new String(pidx) });

        const payload = {"pidx": pidx};
        
        // console.log(json, typeof(json))

        // const payload = JSON.parse(json);

        console.log("Payload: " + typeof(payload));

        console.log("Lookup payload: " + payload , JSON.stringify(payload));

        try {
            // add headers
            const options = {
                headers: { 'Authorization': 'Key live_secret_key_e153b1ae707149d7bcb5d447a268dd2c' }
            };

            //send request to https://a.khalti.com/api/v2/epayment/initiate/
            axios.post('https://a.khalti.com/api/v2/epayment/lookup/', payload, options)
                .then((response3) => {
                    //receive response
                    //console.log(response);
                    //console.log(JSON.stringify(response2.data));

                    console.log((response3.data));

                    //console.log(JSON.stringify(response2.data.pidx));
                    //console.log(JSON.stringify(response2.data.payment_url));

                    //response.status(200).json({ status: 'Success' });
                    console.log("Lookup successful")
                    response.status(200).send();
                })
                .catch((error) => {
                    console.log("Lookup unsuccessful" , request.data);
                    //console.log(error);
                });

        } catch (error) {
            response.status(500).send("error 1");
        }
    },


}